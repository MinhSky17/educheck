import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "./services/firebase";
import Home from "./pages/public/Home.jsx";
import RoleSelectModal from "./components/public/RoleSelectModal";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const profile = await getUserProfile(user.uid);
          if (profile && profile.role) {
            setUserProfile(profile);
            setIsRoleModalOpen(false);
          } else {
            // Đã đăng nhập nhưng chưa có vai trò -> Mới mở modal chọn vai trò
            setUserProfile(null);
            setIsRoleModalOpen(true);
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra hồ sơ:", error);
          // Không tự bật modal nếu bị lỗi mạng/permissions
          setIsRoleModalOpen(false);
        }
      } else {
        // Chưa đăng nhập: Reset toàn bộ, TUYỆT ĐỐI không mở modal
        setCurrentUser(null);
        setUserProfile(null);
        setIsRoleModalOpen(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleSelected = (newProfile) => {
    setUserProfile(newProfile);
    setIsRoleModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        Đang khởi động EduCheck...
      </div>
    );
  }

  // 1. Nếu đã đăng nhập VÀ đã có vai trò Giáo viên -> Vào Dashboard Giáo viên
  if (currentUser && userProfile?.role === "teacher") {
    return <TeacherDashboard user={currentUser} userProfile={userProfile} />;
  }

  // 2. Nếu đã đăng nhập VÀ đã có vai trò Học sinh -> Vào Dashboard Học sinh
  if (currentUser && userProfile?.role === "student") {
    return <StudentDashboard user={currentUser} userProfile={userProfile} />;
  }

  // 3. Khách chưa đăng nhập HOẶC vừa đăng nhập xong đang đợi chọn vai trò:
  // Render Landing Page (Home), chỉ mở Modal chọn vai trò khi currentUser đã tồn tại!
  return (
    <>
      <Home currentUser={currentUser} userProfile={userProfile} />

      {/* Chỉ hiển thị modal chọn vai trò khi ĐÃ đăng nhập và CHƯA có vai trò */}
      {currentUser && !userProfile?.role && (
        <RoleSelectModal
          isOpen={isRoleModalOpen}
          user={currentUser}
          onRoleSelected={handleRoleSelected}
        />
      )}
    </>
  );
}

export default App;