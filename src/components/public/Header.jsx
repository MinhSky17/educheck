import React, { useState } from "react";
import { Button, Drawer, ConfigProvider } from "antd";
import { MenuOutlined, ReadOutlined } from "@ant-design/icons";
import AuthModal from "./AuthModal";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsMobileMenuOpen(false);
    setIsAuthModalOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
            {/* Logo */}
            <a href="#" className="no-underline">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-primary text-xl">
                  <ReadOutlined />
                </div>
                <span className="font-bold text-2xl tracking-tight text-gray-900">
                  EduCheck
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button type="text" onClick={openAuthModal} className="font-medium text-gray-700">
                Đăng nhập
              </Button>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={openAuthModal}
                className="font-medium shadow-md shadow-primary/20"
              >
                Đăng ký miễn phí
              </Button>
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

        {/* Mobile Navigation Drawer */}
        <Drawer
          title={
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <ReadOutlined /> EduCheck
            </div>
          }
          placement="right"
          onClose={closeMobileMenu}
          open={isMobileMenuOpen}
          width={280}
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              onClick={closeMobileMenu}
              className="text-gray-700 text-base font-medium py-2 border-b border-gray-100 no-underline hover:text-primary"
            >
              Tính năng
            </a>
            <a
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="text-gray-700 text-base font-medium py-2 border-b border-gray-100 no-underline hover:text-primary"
            >
              Cách hoạt động
            </a>
            <a
              href="#teachers"
              onClick={closeMobileMenu}
              className="text-gray-700 text-base font-medium py-2 border-b border-gray-100 no-underline hover:text-primary"
            >
              Dành cho giáo viên
            </a>
            <a
              href="#students"
              onClick={closeMobileMenu}
              className="text-gray-700 text-base font-medium py-2 border-b border-gray-100 no-underline hover:text-primary"
            >
              Dành cho học sinh
            </a>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <Button block size="large" onClick={openAuthModal}>
                Đăng nhập
              </Button>
              <Button block type="primary" size="large" onClick={openAuthModal}>
                Đăng ký miễn phí
              </Button>
            </div>
          </div>
        </Drawer>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </ConfigProvider>
  );
}

export default Header;