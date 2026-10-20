import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  limit, 
  runTransaction, 
  increment 
} from "firebase/firestore";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTFZr2BUU0NqluRzbpp1d7BRQx8CKKYAc",
  authDomain: "educheck-a4e90.firebaseapp.com",
  projectId: "educheck-a4e90",
  storageBucket: "educheck-a4e90.firebasestorage.app",
  messagingSenderId: "164881411516",
  appId: "1:164881411516:web:aae750749911f85be14fb9"
};

// Khởi tạo Firebase App trước tiên
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ===================== AUTH & PROFILE =====================
export const loginWithGoogle = async () => (await signInWithPopup(auth, googleProvider)).user;
export const logout = () => signOut(auth);

export const registerWithEmail = async ({ fullName, email, password }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (fullName) await updateProfile(user, { displayName: fullName.trim() });
  return user;
};

export const loginWithEmail = async (email, password) => 
  (await signInWithEmailAndPassword(auth, email.trim(), password)).user;

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

export const saveUserRole = async (user, role) => {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists() && snap.data().role) throw new Error("Tài khoản này đã được thiết lập vai trò!");
  const profileData = { 
    uid: user.uid, 
    email: user.email, 
    displayName: user.displayName || "", 
    photoURL: user.photoURL || "", 
    role, 
    createdAt: serverTimestamp() 
  };
  await setDoc(ref, profileData, { merge: true });
  return profileData;
};

// ===================== QUẢN LÝ LỚP HỌC =====================
const SAFE_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export const generateUniqueClassCode = async () => {
  for (let i = 0; i < 10; i++) {
    const code = Array.from({ length: 6 }, () => SAFE_CHARS[Math.floor(Math.random() * SAFE_CHARS.length)]).join('');
    if ((await getDocs(query(collection(db, "classes"), where("code", "==", code), limit(1)))).empty) return code;
  }
  throw new Error("Không thể sinh mã lớp duy nhất!");
};

export const createClass = async ({ name, subject, description, themeColor, teacherId, teacherName, teacherEmail }) => {
  if ((await getDocs(query(collection(db, "classes"), where("teacherId", "==", teacherId), where("status", "==", "active")))).size >= 30) 
    throw new Error("Đạt giới hạn 30 lớp đang hoạt động!");

  const newClass = { 
    name: name.trim(), 
    subject: subject?.trim() || "", 
    description: description?.trim() || "", 
    themeColor: themeColor || "blue", 
    code: await generateUniqueClassCode(), 
    teacherId, 
    teacherName: teacherName || "Giáo viên", 
    teacherEmail: teacherEmail || "", 
    studentCount: 0, 
    status: "active", 
    createdAt: serverTimestamp(), 
    updatedAt: serverTimestamp() 
  };
  const docRef = await addDoc(collection(db, "classes"), newClass);
  return { id: docRef.id, ...newClass };
};

export const getTeacherClasses = async (teacherId) => 
  (await getDocs(query(collection(db, "classes"), where("teacherId", "==", teacherId)))).docs.map(d => ({ id: d.id, ...d.data() }));

export const resetClassCode = async (classId) => {
  const code = await generateUniqueClassCode();
  await updateDoc(doc(db, "classes", classId), { code, updatedAt: serverTimestamp() });
  return code;
};

export const updateClassInfo = async (classId, { name, subject, description }) => 
  updateDoc(doc(db, "classes", classId), { 
    name: name.trim(), 
    subject: subject?.trim() || "", 
    description: description?.trim() || "", 
    updatedAt: serverTimestamp() 
  });

// ===================== THAM GIA LỚP =====================
const RATE_LIMIT_KEY = "educheck_join_attempts";

export const checkRateLimit = () => {
  const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{"attempts": 0, "lockedUntil": 0}');
  if (data.lockedUntil && Date.now() < data.lockedUntil) 
    throw new Error(`Thử sai quá nhiều. Thử lại sau ${Math.ceil((data.lockedUntil - Date.now()) / 60000)} phút!`);
};

const recordFail = () => {
  const d = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{"attempts": 0, "first": 0, "lockedUntil": 0}');
  const now = Date.now();
  if (!d.first || now - d.first > 600000) { d.attempts = 1; d.first = now; d.lockedUntil = 0; } 
  else if (++d.attempts >= 5) d.lockedUntil = now + 900000;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(d));
};

export const findClassByCode = async (rawCode) => {
  checkRateLimit();
  const code = (rawCode || "").trim().toUpperCase();
  if (code.length !== 6) throw new Error("Mã lớp không hợp lệ");
  
  const snap = await getDocs(query(collection(db, "classes"), where("code", "==", code), where("status", "==", "active"), limit(1)));
  if (snap.empty) { recordFail(); throw new Error("Mã lớp không hợp lệ"); }
  localStorage.removeItem(RATE_LIMIT_KEY);
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};

export const joinClassWithCode = async ({ classData, studentUser }) => {
  const studentId = studentUser.uid;
  if ((await getDocs(query(collection(db, "class_members"), where("studentId", "==", studentId), where("status", "==", "active")))).size >= 30) 
    throw new Error("Bạn đã đạt tối đa 30 lớp!");

  const memRef = doc(db, "class_members", `${classData.id}_${studentId}`);
  const clsRef = doc(db, "classes", classData.id);

  return await runTransaction(db, async (t) => {
    const clsDoc = await t.get(clsRef);
    if (!clsDoc.exists() || clsDoc.data().status !== "active") throw new Error("Lớp đã đóng!");
    
    const memDoc = await t.get(memRef);
    if (memDoc.exists()) {
      const mem = memDoc.data();
      if (mem.status === "active") return { isExisting: true, memberData: mem };
      if (mem.status === "removed") throw new Error("Bạn đã bị xóa khỏi lớp này!");
      if (mem.status === "left") {
        if ((clsDoc.data().studentCount || 0) >= 100) throw new Error("Lớp đã đầy!");
        t.update(memRef, { status: "active", updatedAt: serverTimestamp() });
        t.update(clsRef, { studentCount: increment(1) });
        return { isRejoined: true, memberData: { ...mem, status: "active" } };
      }
    }

    if ((clsDoc.data().studentCount || 0) >= 100) throw new Error("Lớp đã đầy!");
    const newMem = { 
      classId: classData.id, 
      studentId, 
      studentName: studentUser.displayName || "Học sinh", 
      studentEmail: studentUser.email || "", 
      className: clsDoc.data().name, 
      subject: clsDoc.data().subject || "", 
      teacherName: clsDoc.data().teacherName, 
      themeColor: clsDoc.data().themeColor, 
      status: "active", 
      joinedAt: serverTimestamp(), 
      updatedAt: serverTimestamp() 
    };
    
    t.set(memRef, newMem);
    t.update(clsRef, { studentCount: increment(1) });
    return { isNew: true, memberData: newMem };
  });
};

export const getStudentClasses = async (studentId) => 
  (await getDocs(query(collection(db, "class_members"), where("studentId", "==", studentId), where("status", "==", "active")))).docs.map(d => ({ id: d.id, ...d.data() }));

// ===================== CHI TIẾT LỚP & BÀI TẬP =====================
export const getClassDetails = async (classId) => {
  const snap = await getDoc(doc(db, "classes", classId));
  if (!snap.exists()) throw new Error("Lớp học không tồn tại.");
  return { id: snap.id, ...snap.data() };
};

export const getClassMembers = async (classId) => 
  (await getDocs(query(collection(db, "class_members"), where("classId", "==", classId)))).docs.map(d => ({ id: d.id, ...d.data() }));

export const getClassAssignments = async (classId) => {
  const snap = await getDocs(query(collection(db, "assignments"), where("classId", "==", classId)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
};

// Chuyển file sang Base64 để lưu miễn phí trong Firestore
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const createAssignment = async ({ files = [], ...rest }) => {
  const processedFiles = [];

  for (const fileObj of files) {
    const rawFile = fileObj.originFileObj || fileObj;
    // Kiểm tra dung lượng < 750KB để không vượt giới hạn 1MB của Firestore document
    if (rawFile.size > 750 * 1024) {
      throw new Error(`File "${rawFile.name}" vượt quá 750KB. Vui lòng chọn file nhẹ hơn để dùng miễn phí!`);
    }

    const base64Url = await fileToBase64(rawFile);
    processedFiles.push({
      uid: fileObj.uid || `${Date.now()}_${rawFile.name}`,
      name: rawFile.name,
      size: rawFile.size,
      type: rawFile.type,
      url: base64Url,
    });
  }

  const newAsg = {
    ...rest,
    files: processedFiles,
    hasFiles: processedFiles.length > 0,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "assignments"), newAsg);
  return { id: docRef.id, ...newAsg };
};


// ===================== NỘP BÀI TẬP (SUBMISSIONS) =====================
export const submitAssignment = async ({ assignmentId, classId, studentUser, textContent, files = [], isLate = false }) => {
  const studentId = studentUser.uid;
  const submissionId = `${assignmentId}_${studentId}`;
  const submissionRef = doc(db, "submissions", submissionId);

  // Xử lý chuyển file sang Base64
  const processedFiles = [];
  for (const fileObj of files) {
    const rawFile = fileObj.originFileObj || fileObj;
    if (rawFile.size > 750 * 1024) {
      throw new Error(`File "${rawFile.name}" vượt quá 750KB. Vui lòng chọn file nhẹ hơn!`);
    }
    const base64Url = await fileToBase64(rawFile);
    processedFiles.push({
      uid: fileObj.uid || `${Date.now()}_${rawFile.name}`,
      name: rawFile.name,
      size: rawFile.size,
      type: rawFile.type,
      url: base64Url,
    });
  }

  const submissionData = {
    assignmentId,
    classId,
    studentId,
    studentName: studentUser.displayName || "Học sinh",
    studentEmail: studentUser.email || "",
    textContent: textContent || "",
    files: processedFiles,
    status: isLate ? "late" : "submitted",
    submittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(submissionRef, submissionData, { merge: true });
  return { id: submissionId, ...submissionData };
};

export const getStudentSubmission = async (assignmentId, studentId) => {
  const submissionRef = doc(db, "submissions", `${assignmentId}_${studentId}`);
  const snap = await getDoc(submissionRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};