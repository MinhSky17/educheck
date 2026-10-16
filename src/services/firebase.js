import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
  limit 
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