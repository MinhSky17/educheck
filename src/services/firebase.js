// Import các hàm cần thiết từ thư viện Firebase bạn đã cài bằng npm
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase cho dự án educheck của riêng bạn từ ảnh image_0ce876.png
const firebaseConfig = {
  apiKey: "AIzaSyBTFZr2BUU0NqluRzbpp1d7BRQx8CKKYAc",
  authDomain: "educheck-a4e90.firebaseapp.com",
  projectId: "educheck-a4e90",
  storageBucket: "educheck-a4e90.firebasestorage.app",
  messagingSenderId: "164881411516",
  appId: "1:164881411516:web:aae750749911f85be14fb9"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Xuất bản (export) các dịch vụ để sẵn sàng gọi dùng ở các file giao diện khác
export const auth = getAuth(app);
export const db = getFirestore(app);