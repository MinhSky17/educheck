import React, { useState } from 'react';
import { Modal, Button, Typography, Space, ConfigProvider, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { loginWithGoogle } from '../../services/firebase';

const { Title, Text, Paragraph } = Typography;

// Icon Google chuẩn SVG
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
);

const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/popup-closed-by-user':
      return 'Bạn đã đóng cửa sổ đăng nhập trước khi hoàn tất.';
    case 'auth/cancelled-popup-request':
      return 'Yêu cầu đăng nhập trước đó đã bị hủy.';
    case 'auth/network-request-failed':
      return 'Lỗi kết nối mạng, vui lòng kiểm tra lại kết nối internet.';
    case 'auth/unauthorized-domain':
      return 'Domain hiện tại chưa được cấp quyền trong Firebase Console.';
    default:
      return 'Đăng nhập thất bại. Vui lòng thử lại sau.';
  }
};

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      message.success(`Xin chào, ${user.displayName || 'bạn'}!`);
      onLoginSuccess?.(user);
      onClose();
    } catch (err) {
      message.error(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // Đồng bộ màu chủ đạo của EduCheck
          borderRadius: 12,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={420}
        styles={{
          body: { padding: '24px 8px 12px 8px' },
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center' }}>
          {/* Header Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              borderRadius: 14,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              margin: '0 auto',
            }}
          >
            <LockOutlined />
          </div>

          {/* Title & Description */}
          <div>
            <Title level={4} style={{ marginBottom: 4, color: '#111827' }}>
              Chào mừng đến với EduCheck
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Đăng nhập hoặc tạo tài khoản để bắt đầu
            </Text>
          </div>

          {/* Google Login Button */}
          <div style={{ marginTop: 8 }}>
            <Button
              size="large"
              block
              loading={loading}
              onClick={handleGoogleLogin}
              style={{
                height: 48,
                fontSize: 15,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              }}
            >
              {!loading && <GoogleIcon />}
              <span>{loading ? 'Đang xác thực...' : 'Tiếp tục với Google'}</span>
            </Button>
          </div>

          {/* Policy Text */}
          <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 0, marginTop: 12 }}>
            Bằng việc tiếp tục, bạn đồng ý với{' '}
            <Typography.Link href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>
              Điều khoản dịch vụ
            </Typography.Link>{' '}
            và{' '}
            <Typography.Link href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>
              Chính sách bảo mật
            </Typography.Link>{' '}
            của EduCheck.
          </Paragraph>
        </Space>
      </Modal>
    </ConfigProvider>
  );
}

export default AuthModal;