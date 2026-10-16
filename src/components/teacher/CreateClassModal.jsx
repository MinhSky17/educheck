import React, { useState } from "react";
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Alert, 
  Card, 
  Typography, 
  Divider, 
  ColorPicker, 
  Tooltip, 
  message 
} from "antd";
import { 
  BookOutlined, 
  UserOutlined, 
  CheckCircleFilled, 
  AppstoreOutlined,
  CopyOutlined
} from "@ant-design/icons";
import { createClass } from "../../services/firebase";

const { Text, Title } = Typography;

// 10 gam màu đại diện chuẩn Ant Design
export const PRESET_THEMES = [
  { key: "blue", name: "Xanh dương", color: "#1677ff" },
  { key: "cyan", name: "Xanh ngọc", color: "#13c2c2" },
  { key: "green", name: "Lục bảo", color: "#52c41a" },
  { key: "lime", name: "Chanh non", color: "#7cb305" },
  { key: "gold", name: "Vàng ánh kim", color: "#faad14" },
  { key: "orange", name: "Cam hổ phách", color: "#fa8c16" },
  { key: "volcano", name: "Cam lửa", color: "#fa541c" },
  { key: "red", name: "Đỏ hồng ngọc", color: "#f5222d" },
  { key: "purple", name: "Tím thạch anh", color: "#722ed1" },
  { key: "geekblue", name: "Chàm đậm", color: "#2f54eb" },
];

function CreateClassModal({ isOpen, onClose, user, existingClasses = [], onClassCreated }) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#1677ff");
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  const [previewValues, setPreviewValues] = useState({
    name: "",
    subject: "",
  });

  const handleValuesChange = (changed, all) => {
    setPreviewValues({
      name: all.name || "",
      subject: all.subject || "",
    });

    if (changed.name !== undefined) {
      const trimmed = (changed.name || "").trim().toLowerCase();
      const hasDup = existingClasses.some(
        (c) => c.status === "active" && c.name?.trim().toLowerCase() === trimmed
      );
      setIsDuplicateName(hasDup && trimmed.length > 0);
    }
  };

  const handleFinish = async (values) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const newClass = await createClass({
        name: values.name,
        subject: values.subject,
        description: values.description,
        themeColor: selectedColor,
        teacherId: user.uid,
        teacherName: user.displayName || user.email,
        teacherEmail: user.email,
      });

      message.success(`Đã khởi tạo thành công lớp học "${newClass.name}"!`);
      form.resetFields();
      setIsDuplicateName(false);
      setSelectedColor("#1677ff");
      onClose();
      onClassCreated(newClass);
    } catch (err) {
      console.error(err);
      message.error(err.message || "Không thể tạo lớp học. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => !submitting && onClose()}
      footer={null}
      centered
      width={840}
      destroyOnClose
      styles={{ body: { padding: "28px 32px" } }}
    >
      <div style={{ marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0, fontWeight: 600, color: "#1f1f1f" }}>
          Tạo lớp học mới
        </Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          Điền các thông tin để cấp mã phòng học và bảng bài tập cho học sinh
        </Text>
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "stretch" }}>
        {/* CỘT TRÁI: Form nhập liệu Ant Design (60%) */}
        <div style={{ flex: "1 1 480px" }}>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            onValuesChange={handleValuesChange}
            onFinish={handleFinish}
            disabled={submitting}
          >
            {/* Tên lớp học */}
            <Form.Item
              name="name"
              label={<Text strong>Tên lớp học</Text>}
              rules={[
                { required: true, message: "Vui lòng nhập tên lớp học!" },
                {
                  validator: (_, val) => {
                    if (!val) return Promise.resolve();
                    const trimmed = val.trim();
                    if (trimmed.length < 1 || trimmed.length > 100) {
                      return Promise.reject(new Error("Độ dài tên từ 1 đến 100 ký tự"));
                    }
                    const regex = /^[a-zA-Z0-9À-ỹ\s\-_.,()/]+$/;
                    if (!regex.test(trimmed)) {
                      return Promise.reject(new Error("Tên chứa ký tự đặc biệt không hợp lệ"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input 
                size="large" 
                placeholder="Ví dụ: 12A1 - Toán nâng cao" 
                maxLength={100} 
              />
            </Form.Item>

            {/* Cảnh báo trùng tên lớp */}
            {isDuplicateName && (
              <Alert
                message="Bạn đang có lớp hoạt động trùng tên này."
                type="warning"
                showIcon
                style={{ marginBottom: 16, fontSize: 13 }}
              />
            )}

            {/* Môn học */}
            <Form.Item 
              name="subject" 
              label={<Text strong>Môn học / Khối</Text>}
            >
              <Input 
                size="large" 
                placeholder="Ví dụ: Toán học, Tiếng Anh, Vật lý..." 
                maxLength={50} 
              />
            </Form.Item>

            {/* Bảng chọn màu đại diện: 10 màu preset + 1 ô ColorPicker tùy chỉnh */}
            <Form.Item label={<Text strong>Màu đại diện lớp</Text>}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                {PRESET_THEMES.map((theme) => {
                  const isSelected = selectedColor.toLowerCase() === theme.color.toLowerCase();
                  return (
                    <Tooltip title={theme.name} key={theme.key}>
                      <div
                        onClick={() => setSelectedColor(theme.color)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: theme.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: isSelected ? `0 0 0 2px #fff, 0 0 0 4px ${theme.color}` : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isSelected && <CheckCircleFilled style={{ color: "#fff", fontSize: 14 }} />}
                      </div>
                    </Tooltip>
                  );
                })}

                <Tooltip title="Tự chọn màu tùy chỉnh">
                  <div style={{ marginLeft: 4 }}>
                    <ColorPicker
                      value={selectedColor}
                      onChange={(color) => setSelectedColor(color.toHexString())}
                      size="middle"
                    />
                  </div>
                </Tooltip>
              </div>
            </Form.Item>

            {/* Mô tả */}
            <Form.Item 
              name="description" 
              label={<Text strong>Mô tả lớp</Text>}
            >
              <Input.TextArea
                rows={3}
                maxLength={500}
                showCount
                placeholder="Mục tiêu hoặc nội quy khóa học..."
              />
            </Form.Item>

            <Divider style={{ margin: "20px 0 16px" }} />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Button onClick={onClose} disabled={submitting}>
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Tạo lớp ngay
              </Button>
            </div>
          </Form>
        </div>

        {/* CỘT PHẢI: Thẻ lớp mẫu hiển thị trực tiếp (40%) */}
        <div 
          style={{ 
            flex: "0 0 280px", 
            backgroundColor: "#fcfcfd", 
            border: "1px dashed #e5e7eb", 
            borderRadius: 16, 
            padding: 20, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text 
            type="secondary" 
            style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              letterSpacing: 0.8, 
              textTransform: "uppercase", 
              marginBottom: 16 
            }}
          >
            Thẻ hiển thị mẫu
          </Text>

          <Card
            hoverable={false}
            styles={{ body: { padding: 0 } }}
            style={{
              width: "100%",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #f0f0f0",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* Banner hiển thị màu đã chọn */}
            <div
              style={{
                background: `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)`,
                padding: "16px 18px",
                color: "#fff",
                minHeight: 105,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 11,
                    backgroundColor: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(4px)",
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontWeight: 500,
                  }}
                >
                  {previewValues.subject || "Chưa có môn"}
                </span>
                <AppstoreOutlined style={{ fontSize: 16, opacity: 0.8 }} />
              </div>

              <div>
                <div 
                  style={{ 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: "#fff", 
                    whiteSpace: "nowrap", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis" 
                  }}
                >
                  {previewValues.name || "Tên lớp học..."}
                </div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
                  <UserOutlined style={{ marginRight: 4 }} />
                  {user?.displayName || "Giáo viên"}
                </div>
              </div>
            </div>

            {/* Thân thẻ lớp */}
            <div style={{ padding: 14, backgroundColor: "#fff" }}>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px dashed #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>MÃ THAM GIA</div>
                  <div 
                    style={{ 
                      fontFamily: "monospace", 
                      fontSize: 15, 
                      fontWeight: 700, 
                      letterSpacing: 2, 
                      color: "#1f2937" 
                    }}
                  >
                    ••••••
                  </div>
                </div>
                <CopyOutlined style={{ color: "#9ca3af" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#6b7280" }}>
                <BookOutlined style={{ marginRight: 6 }} />
                <span>0 học sinh</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  );
}

export default CreateClassModal;