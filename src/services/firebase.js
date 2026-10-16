import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";




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