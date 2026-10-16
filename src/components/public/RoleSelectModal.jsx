import React, { useState } from "react";
import { Modal, Typography, Card, Space, message, ConfigProvider } from "antd";
import { ReadOutlined, UserOutlined } from "@ant-design/icons";
import { saveUserRole } from "../../services/firebase";

const { Title, Text } = Typography;

function RoleSelectModal({ isOpen, user, onRoleSelected }) {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = async (role) => {
    if (!user) return;
    setSelectedRole(role);
    setLoading(true);

    try {
      const updatedProfile = await saveUserRole(user, role);
      message.success(`Chào mừng bạn tham gia với vai trò ${role === "teacher" ? "Giáo viên" : "Học sinh"}!`);
      onRoleSelected?.(updatedProfile);
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra khi lưu vai trò. Vui lòng thử lại!");
    } finally {
      setLoading(false);
      setSelectedRole(null);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 12,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <Modal
        open={isOpen}
        footer={null}
        closable={false} // Không cho tắt modal khi chưa chọn vai trò
        maskClosable={false}
        centered
        width={500}
        styles={{
          body: { padding: "28px 20px" },
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 6, color: "#111827" }}>
            Chọn vai trò của bạn
          </Title>
          <Text type="secondary" style={{ fontSize: 14 }}>
            Vui lòng chọn vai trò để hệ thống thiết lập không gian phù hợp. Lưu ý: Lựa chọn này chỉ được thiết lập một lần duy nhất.
          </Text>
        </div>

        <Space orientation="vertical" size={16} style={{ width: "100%" }}>
          {/* Lựa chọn Giáo viên */}
          <Card
            hoverable
            loading={loading && selectedRole === "teacher"}
            onClick={() => !loading && handleSelectRole("teacher")}
            style={{
              cursor: "pointer",
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              transition: "all 0.2s ease",
            }}
            styles={{ body: { padding: "16px 20px" } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                <ReadOutlined />
              </div>
              <div style={{ flex: 1 }}>
                <Title level={5} style={{ margin: 0, color: "#1f2937" }}>
                  Tôi là Giáo viên
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Tạo lớp học, quản lý danh sách và giao bài tập cho học sinh
                </Text>
              </div>
            </div>
          </Card>

          {/* Lựa chọn Học sinh */}
          <Card
            hoverable
            loading={loading && selectedRole === "student"}
            onClick={() => !loading && handleSelectRole("student")}
            style={{
              cursor: "pointer",
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              transition: "all 0.2s ease",
            }}
            styles={{ body: { padding: "16px 20px" } }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: "#f0fdf4",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                <UserOutlined />
              </div>
              <div style={{ flex: 1 }}>
                <Title level={5} style={{ margin: 0, color: "#1f2937" }}>
                  Tôi là Học sinh
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Tham gia vào lớp học, theo dõi hạn nộp và nộp bài tập
                </Text>
              </div>
            </div>
          </Card>
        </Space>
      </Modal>
    </ConfigProvider>
  );
}

export default RoleSelectModal;