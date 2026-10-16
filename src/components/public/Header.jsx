import React, { useState } from "react";
import { Button, Drawer, ConfigProvider, Avatar, Dropdown } from "antd";
import { MenuOutlined, ReadOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import AuthModal from "./AuthModal";
import { logout } from "../../services/firebase";

function Header({ currentUser, userProfile }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const userMenuItems = [
    {
      key: "role",
      label: (
        <span className="text-xs text-gray-500 font-medium">
          Vai trò: {userProfile?.role === "teacher" ? "Giáo viên" : userProfile?.role === "student" ? "Học sinh" : "Chưa chọn"}
        </span>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="no-underline">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-primary text-xl">
                  <ReadOutlined />
                </div>
                <span className="font-bold text-2xl tracking-tight text-gray-900">
                  EduCheck
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            {!currentUser && (
            <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-primary font-medium transition no-underline">
                Tính năng
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-primary font-medium transition no-underline">
                Cách hoạt động
                </a>
                <a href="#teachers" className="text-gray-600 hover:text-primary font-medium transition no-underline">
                Dành cho giáo viên
                </a>
                <a href="#students" className="text-gray-600 hover:text-primary font-medium transition no-underline">
                Dành cho học sinh
                </a>
            </nav>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {currentUser ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <div className="flex items-center gap-2 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition">
                    <Avatar src={currentUser.photoURL} icon={!currentUser.photoURL && <UserOutlined />} />
                    <span className="font-medium text-sm text-gray-800">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <>
                  <Button type="text" onClick={() => setIsAuthModalOpen(true)} className="font-medium text-gray-700">
                    Đăng nhập
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="font-medium shadow-md shadow-primary/20"
                  >
                    Đăng ký miễn phí
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: "20px" }} />}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          </div>
        </div>

        <Drawer
          title={<div className="flex items-center gap-2 text-primary font-bold text-xl"><ReadOutlined /> EduCheck</div>}
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={280}
        >
          {currentUser ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Avatar src={currentUser.photoURL} icon={!currentUser.photoURL && <UserOutlined />} />
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-800">{currentUser.displayName}</span>
                  <span className="text-xs text-gray-500">
                    {userProfile?.role === "teacher" ? "Giáo viên" : userProfile?.role === "student" ? "Học sinh" : "Chưa chọn"}
                  </span>
                </div>
              </div>
              <Button danger block onClick={handleLogout}>Đăng xuất</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button block size="large" onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}>
                Đăng nhập
              </Button>
              <Button block type="primary" size="large" onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}>
                Đăng ký miễn phí
              </Button>
            </div>
          )}
        </Drawer>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </ConfigProvider>
  );
}

export default Header;