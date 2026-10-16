import React, { useState } from "react";
import { Modal, Button, Typography, Divider, message, ConfigProvider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { loginWithGoogle } from "../../services/firebase";

const { Title, Text } = Typography;

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      message.success("Đăng nhập thành công!");
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (error) {
      console.error("FIREBASE ERROR:", error);
      // Hiển thị trực tiếp mã lỗi và thông báo lỗi thực tế từ Firebase
      message.error(`Lỗi: ${error.code || error.message}`);
    } finally {
      setLoading(false);
    }
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
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={400}
        styles={{ body: { padding: "24px 16px" } }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 8, color: "#111827" }}>
            Chào mừng bạn
          </Title>
          <Text type="secondary" style={{ fontSize: 14 }}>
            Đăng nhập hoặc đăng ký tài khoản EduCheck
          </Text>
        </div>

        <Button
          type="default"
          size="large"
          block
          icon={<GoogleOutlined style={{ color: "#ea4335", fontSize: 18 }} />}
          onClick={handleGoogleLogin}
          loading={loading}
          style={{
            height: 44,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#d1d5db",
          }}
        >
          Tiếp tục với Google
        </Button>

        <Divider style={{ margin: "20px 0", color: "#9ca3af", fontSize: 12 }}>
          HOẶC
        </Divider>

        <div style={{ textAlign: "center" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của EduCheck.
          </Text>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default AuthModal;