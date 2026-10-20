import React, { useState } from "react";
import { 
  Modal, 
  Button, 
  Typography, 
  Divider, 
  message, 
  ConfigProvider, 
  Tabs, 
  Form, 
  Input 
} from "antd";
import { 
  GoogleOutlined, 
  MailOutlined, 
  LockOutlined, 
  UserOutlined 
} from "@ant-design/icons";
import { 
  loginWithGoogle, 
  loginWithEmail, 
  registerWithEmail 
} from "../../services/firebase";

const { Title, Text } = Typography;

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleClose = () => {
    loginForm.resetFields();
    registerForm.resetFields();
    onClose();
  };

  // 1. Đăng nhập bằng Email / Mật khẩu
  const handleEmailLogin = async (values) => {
    setLoading(true);
    try {
      const user = await loginWithEmail(values.email, values.password);
      message.success("Đăng nhập thành công!");
      handleClose();
      onLoginSuccess?.(user);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message.error("Email hoặc mật khẩu không chính xác!");
      } else if (error.code === "auth/too-many-requests") {
        message.error("Quá nhiều lần thử thất bại. Vui lòng thử lại sau!");
      } else {
        message.error(error.message || "Đăng nhập thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Đăng ký tài khoản mới bằng Email
  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const user = await registerWithEmail({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      message.success("Tạo tài khoản thành công!");
      handleClose();
      onLoginSuccess?.(user);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        message.error("Email này đã được sử dụng. Vui lòng chọn Đăng nhập!");
      } else if (error.code === "auth/weak-password") {
        message.error("Mật khẩu quá yếu (tối thiểu 6 ký tự)!");
      } else {
        message.error(error.message || "Đăng ký thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Đăng nhập Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      message.success("Đăng nhập bằng Google thành công!");
      handleClose();
      onLoginSuccess?.(user);
    } catch (error) {
      console.error("FIREBASE ERROR:", error);
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
        onCancel={handleClose}
        footer={null}
        centered
        width={420}
        styles={{ body: { padding: "28px 24px 20px" } }}
        destroyOnClose
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Title level={3} style={{ marginBottom: 4, color: "#111827", fontWeight: 700 }}>
            {activeTab === "login" ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            {activeTab === "login" 
              ? "Đăng nhập để vào lớp học và quản lý bài tập" 
              : "Bắt đầu trải nghiệm học tập cùng EduCheck"}
          </Text>
        </div>

        {/* Nút Đăng nhập nhanh bằng Google */}
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
            marginBottom: 8,
          }}
        >
          Tiếp tục với Google
        </Button>

        <Divider style={{ margin: "16px 0", color: "#9ca3af", fontSize: 12 }}>
          HOẶC DÙNG EMAIL
        </Divider>

        {/* Tabs: Đăng nhập / Đăng ký */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: "login",
              label: "Đăng nhập",
              children: (
                <Form
                  form={loginForm}
                  layout="vertical"
                  onFinish={handleEmailLogin}
                  disabled={loading}
                  style={{ marginTop: 8 }}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập Email!" },
                      { type: "email", message: "Email không đúng định dạng!" },
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined className="text-gray-400" />} 
                      placeholder="Email" 
                      size="large" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined className="text-gray-400" />} 
                      placeholder="Mật khẩu" 
                      size="large" 
                    />
                  </Form.Item>

                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={loading}
                    style={{ height: 44, fontWeight: 600, marginTop: 4 }}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              ),
            },
            {
              key: "register",
              label: "Đăng ký",
              children: (
                <Form
                  form={registerForm}
                  layout="vertical"
                  onFinish={handleRegister}
                  disabled={loading}
                  style={{ marginTop: 8 }}
                >
                  <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
                  >
                    <Input 
                      prefix={<UserOutlined className="text-gray-400" />} 
                      placeholder="Họ và tên của bạn" 
                      size="large" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập Email!" },
                      { type: "email", message: "Email không đúng định dạng!" },
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined className="text-gray-400" />} 
                      placeholder="Email" 
                      size="large" 
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng đặt mật khẩu!" },
                      { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                    ]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined className="text-gray-400" />} 
                      placeholder="Mật khẩu (tối thiểu 6 ký tự)" 
                      size="large" 
                    />
                  </Form.Item>

                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={loading}
                    style={{ height: 44, fontWeight: 600, marginTop: 4 }}
                  >
                    Tạo tài khoản
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
    </ConfigProvider>
  );
}

export default AuthModal;