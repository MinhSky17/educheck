import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "./services/firebase";
import Home from "./pages/public/Home.jsx";
import RoleSelectModal from "./components/public/RoleSelectModal";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import ClassDetails from "./pages/shared/ClassDetails.jsx";

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
            setUserProfile(null);
            setIsRoleModalOpen(true);
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra hồ sơ:", error);
          setIsRoleModalOpen(false);
        }
      } else {
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

  // Khóa bảo vệ trang nội bộ
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/" />;
    if (!userProfile?.role) return <Navigate to="/" />;
    return children;
  };

  return (
    <BrowserRouter>
      {currentUser && !userProfile?.role && (
        <RoleSelectModal
          isOpen={isRoleModalOpen}
          user={currentUser}
          onRoleSelected={handleRoleSelected}
        />
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            !currentUser ? (
              <Home currentUser={currentUser} userProfile={userProfile} />
            ) : userProfile?.role === "teacher" ? (
              <TeacherDashboard user={currentUser} userProfile={userProfile} />
            ) : userProfile?.role === "student" ? (
              <StudentDashboard user={currentUser} userProfile={userProfile} />
            ) : (
              <Home currentUser={currentUser} userProfile={userProfile} />
            )
          } 
        />

        {/* Tuyến đường vào trang chi tiết lớp học */}
        <Route 
          path="/class/:classId" 
          element={
            <ProtectedRoute>
              <ClassDetails user={currentUser} userProfile={userProfile} />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;