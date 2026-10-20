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



// Cấu hình Firebase cho dự án educheck của riêng bạn từ ảnh image_0ce876.png
const firebaseConfig = {
  apiKey: "AIzaSyBTFZr2BUU0NqluRzbpp1d7BRQx8CKKYAc",
  authDomain: "educheck-a4e90.firebaseapp.com",
  projectId: "educheck-a4e90",
  storageBucket: "educheck-a4e90.firebasestorage.app",
  messagingSenderId: "164881411516",
  appId: "1:164881411516:web:aae750749911f85be14fb9"
};


console.log("Check Env:", {
  hasKey: !!firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});




const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};

// Đăng ký bằng Email & Mật khẩu
export const registerWithEmail = async ({ fullName, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const user = userCredential.user;
  
  // Cập nhật tên hiển thị lên Firebase Auth
  if (fullName) {
    await updateProfile(user, { displayName: fullName.trim() });
  }
  return user;
};

// Đăng nhập bằng Email & Mật khẩu
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
};

// Lấy thông tin user từ Firestore

// Lấy thông tin user từ Firestore
export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return null;
};

// Lưu vai trò lần đầu cho user (chỉ lưu 1 lần)
export const saveUserRole = async (user, role) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists() && userSnap.data().role) {
    throw new Error("Tài khoản này đã được thiết lập vai trò trước đó.");
  }

  const profileData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    role: role, // 'teacher' hoặc 'student'
    createdAt: serverTimestamp(),
  };

  await setDoc(userRef, profileData, { merge: true });
  return profileData;
};


// Bảng 31 ký tự loại bỏ O, 0, I, 1, L (BR-CL-08)
const SAFE_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export const generateUniqueClassCode = async () => {
  let isUnique = false;
  let code = "";
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    attempts++;
    code = "";
    for (let i = 0; i < 6; i++) {
      code += SAFE_CHARS.charAt(Math.floor(Math.random() * SAFE_CHARS.length));
    }

    // Kiểm tra xem mã đã tồn tại ở bất kỳ lớp nào chưa (kể cả đã đóng/xóa) (BR-CL-09)
    const q = query(collection(db, "classes"), where("code", "==", code), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) {
      isUnique = true;
    }
  }

  if (!isUnique) {
    throw new Error("Không thể sinh mã lớp duy nhất. Vui lòng thử lại!");
  }

  return code;
};

// Tạo lớp học mới (BR-CL-01 -> BR-CL-15)
export const createClass = async ({ name, subject, description, themeColor, teacherId, teacherName, teacherEmail }) => {
  // Kiểm tra giới hạn 30 lớp đang hoạt động (BR-CL-02)
  const activeClassesQuery = query(
    collection(db, "classes"),
    where("teacherId", "==", teacherId),
    where("status", "==", "active")
  );
  const activeSnap = await getDocs(activeClassesQuery);
  if (activeSnap.size >= 30) {
    throw new Error("Bạn đã đạt giới hạn tối đa 30 lớp học đang hoạt động!");
  }

  const code = await generateUniqueClassCode();

  const newClassData = {
    name: name.trim(),
    subject: subject ? subject.trim() : "",
    description: description ? description.trim() : "",
    themeColor: themeColor || "blue",
    code: code,
    teacherId: teacherId,
    teacherName: teacherName || "Giáo viên",
    teacherEmail: teacherEmail || "",
    studentCount: 0,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "classes"), newClassData);
  return { id: docRef.id, ...newClassData };
};

// Lấy danh sách lớp của giáo viên
export const getTeacherClasses = async (teacherId) => {
  const q = query(collection(db, "classes"), where("teacherId", "==", teacherId));
  const snap = await getDocs(q);
  const list = [];
  snap.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() });
  });
  return list;
};

// Đổi mã lớp mới (BR-CL-11)
export const resetClassCode = async (classId) => {
  const newCode = await generateUniqueClassCode();
  const classRef = doc(db, "classes", classId);
  await updateDoc(classRef, {
    code: newCode,
    updatedAt: serverTimestamp(),
  });
  return newCode;
};

// Sửa tên và mô tả lớp (BR-CL-16)
export const updateClassInfo = async (classId, { name, subject, description }) => {
  const classRef = doc(db, "classes", classId);
  await updateDoc(classRef, {
    name: name.trim(),
    subject: subject ? subject.trim() : "",
    description: description ? description.trim() : "",
    updatedAt: serverTimestamp(),
  });
};

// Rate limit kiểm tra mã lớp: 5 lần sai trong 10 phút thì khóa 15 phút (BR-JN-09)
const RATE_LIMIT_KEY = "educheck_join_attempts";
const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 10 * 60 * 1000; // 10 phút
const LOCK_TIME = 15 * 60 * 1000;   // 15 phút

export const checkRateLimit = () => {
  const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{"attempts": 0, "firstAttemptTime": 0, "lockedUntil": 0}');
  const now = Date.now();

  if (data.lockedUntil && now < data.lockedUntil) {
    const remainingMins = Math.ceil((data.lockedUntil - now) / 60000);
    throw new Error(`Bạn đã thử sai quá 5 lần. Vui lòng thử lại sau ${remainingMins} phút!`);
  }

  return true;
};

export const recordFailedAttempt = () => {
  const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{"attempts": 0, "firstAttemptTime": 0, "lockedUntil": 0}');
  const now = Date.now();

  if (!data.firstAttemptTime || now - data.firstAttemptTime > WINDOW_TIME) {
    data.attempts = 1;
    data.firstAttemptTime = now;
    data.lockedUntil = 0;
  } else {
    data.attempts += 1;
    if (data.attempts >= MAX_ATTEMPTS) {
      data.lockedUntil = now + LOCK_TIME;
    }
  }

  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
};

export const clearFailedAttempts = () => {
  localStorage.removeItem(RATE_LIMIT_KEY);
};

// Bước 1: Tra cứu thông tin lớp bằng mã lớp (BR-JN-05, BR-JN-06, BR-JN-07, BR-JN-08)
export const findClassByCode = async (rawCode) => {
  checkRateLimit();

  const code = (rawCode || "").trim().toUpperCase();
  if (code.length !== 6) {
    throw new Error("Mã lớp không hợp lệ");
  }

  const q = query(
    collection(db, "classes"),
    where("code", "==", code),
    where("status", "==", "active"),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) {
    recordFailedAttempt();
    throw new Error("Mã lớp không hợp lệ");
  }

  clearFailedAttempts();
  const classDoc = snap.docs[0];
  return { id: classDoc.id, ...classDoc.data() };
};

// Bước 2: Xác nhận tham gia lớp bằng Firestore Transaction (BR-JN-01 -> BR-JN-21)
export const joinClassWithCode = async ({ classData, studentUser }) => {
  const studentId = studentUser.uid;
  const classId = classData.id;

  // Kiểm tra giới hạn 30 lớp đang tham gia (BR-JN-03)
  const myClassesQuery = query(
    collection(db, "class_members"),
    where("studentId", "==", studentId),
    where("status", "==", "active")
  );
  const myClassesSnap = await getDocs(myClassesQuery);
  if (myClassesSnap.size >= 30) {
    throw new Error("Bạn đã đạt giới hạn tối đa 30 lớp học đang tham gia!");
  }

  // Khóa bản ghi duy nhất: classId_studentId (BR-JN-12)
  const memberDocId = `${classId}_${studentId}`;
  const memberRef = doc(db, "class_members", memberDocId);
  const classRef = doc(db, "classes", classId);

  return await runTransaction(db, async (transaction) => {
    const classDoc = await transaction.get(classRef);
    if (!classDoc.exists() || classDoc.data().status !== "active") {
      throw new Error("Mã lớp không hợp lệ hoặc lớp đã đóng!");
    }

    const currentClassData = classDoc.data();
    const memberDoc = await transaction.get(memberRef);

    if (memberDoc.exists()) {
      const existingMember = memberDoc.data();

      // Đã là thành viên đang học -> Đưa thẳng vào lớp (BR-JN-11)
      if (existingMember.status === "active") {
        return { isExisting: true, memberData: existingMember };
      }

      // Học sinh bị xóa khỏi lớp -> Không cho phép tự vào lại (BR-JN-21)
      if (existingMember.status === "removed") {
        throw new Error("Bạn đã bị xóa khỏi lớp này. Vui lòng liên hệ giáo viên phụ trách để được hỗ trợ!");
      }

      // Học sinh từng tự rời lớp -> Cho vào lại và khôi phục bản ghi (BR-JN-20)
      if (existingMember.status === "left") {
        if ((currentClassData.studentCount || 0) >= 100) {
          throw new Error("Lớp đã đủ số lượng (tối đa 100 học sinh)!");
        }

        transaction.update(memberRef, {
          status: "active",
          updatedAt: serverTimestamp(),
        });
        transaction.update(classRef, {
          studentCount: increment(1),
        });

        return { isRejoined: true, memberData: { ...existingMember, status: "active" } };
      }
    }

    // Kiểm tra sức chứa tối đa 100 học sinh (BR-JN-16)
    if ((currentClassData.studentCount || 0) >= 100) {
      throw new Error("Lớp đã đủ số lượng (tối đa 100 học sinh)!");
    }

    // Tạo bản ghi thành viên mới
    const newMemberData = {
      classId: classId,
      studentId: studentId,
      studentName: studentUser.displayName || "Học sinh",
      studentEmail: studentUser.email || "",
      className: currentClassData.name,
      subject: currentClassData.subject || "",
      teacherName: currentClassData.teacherName || "Giáo viên",
      themeColor: currentClassData.themeColor || "#1677ff",
      status: "active",
      joinedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    transaction.set(memberRef, newMemberData);
    transaction.update(classRef, {
      studentCount: increment(1),
    });

    return { isNew: true, memberData: newMemberData };
  });
};

// Lấy danh sách các lớp học sinh đã tham gia
export const getStudentClasses = async (studentId) => {
  const q = query(
    collection(db, "class_members"),
    where("studentId", "==", studentId),
    where("status", "==", "active")
  );
  const snap = await getDocs(q);
  const list = [];
  snap.forEach((docSnap) => {
    list.push({ id: docSnap.id, ...docSnap.data() });
  });
  return list;
};