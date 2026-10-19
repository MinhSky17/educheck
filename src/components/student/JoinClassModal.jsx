import React, { useState } from "react";
import { 
  Modal, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message 
} from "antd";
import { 
  LoginOutlined, 
  ArrowLeftOutlined, 
  UserOutlined, 
  CheckCircleOutlined 
} from "@ant-design/icons";
import { findClassByCode, joinClassWithCode } from "../../services/firebase";

const { Title, Text, Paragraph } = Typography;

function JoinClassModal({ isOpen, onClose, user, onClassJoined }) {
  const [step, setStep] = useState(1);
  const [classCode, setClassCode] = useState("");
  const [foundClass, setFoundClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetModal = () => {
    setStep(1);
    setClassCode("");
    setFoundClass(null);
    setLoading(false);
  };

  const handleClose = () => {
    if (!loading) {
      resetModal();
      onClose();
    }
  };

  const handleVerifyCode = async () => {
    const trimmed = classCode.trim();
    if (!trimmed) {
      message.warning("Vui lòng nhập mã lớp học!");
      return;
    }
    if (trimmed.length !== 6) {
      message.error("Mã lớp phải gồm đúng 6 ký tự!");
      return;
    }

    setLoading(true);
    try {
      const cls = await findClassByCode(trimmed);
      setFoundClass(cls);
      setStep(2);
    } catch (err) {
      message.error(err.message || "Mã lớp không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmJoin = async () => {
    if (!foundClass) return;
    setLoading(true);

    try {
      const result = await joinClassWithCode({
        classData: foundClass,
        studentUser: user,
      });

      if (result.isExisting) {
        message.info(`Bạn đã là thành viên của lớp "${foundClass.name}"!`);
      } else {
        message.success(`Tham gia thành công lớp "${foundClass.name}"!`);
      }

      onClassJoined(result.memberData);
      handleClose();
    } catch (err) {
      message.error(err.message || "Không thể tham gia lớp học lúc này!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={480}
      destroyOnClose
      styles={{ body: { padding: "28px" } }}
    >
      {step === 1 ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div 
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#e6f4ff",
                color: "#1677ff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 12
              }}
            >
              <LoginOutlined />
            </div>
            <Title level={4} style={{ margin: 0 }}>Tham gia lớp học</Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Nhập mã gồm 6 ký tự do giáo viên cung cấp để vào lớp
            </Text>
          </div>

          <div style={{ marginBottom: 20 }}>
            <Text strong style={{ display: "block", marginBottom: 8 }}>Mã lớp học</Text>
            <Input
              size="large"
              placeholder="VD: 8H7KM2"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              onPressEnter={handleVerifyCode}
              maxLength={6}
              style={{
                fontFamily: "monospace",
                letterSpacing: 4,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "uppercase"
              }}
              autoFocus
            />
            <Text type="secondary" style={{ fontSize: 12, display: "block", marginTop: 6, textAlign: "center" }}>
              Mã không phân biệt chữ hoa, chữ thường và khoảng trắng
            </Text>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
            <Button onClick={handleClose} disabled={loading}>
              Hủy
            </Button>
            <Button type="primary" onClick={handleVerifyCode} loading={loading}>
              Kiểm tra mã lớp
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => setStep(1)} 
            disabled={loading}
            style={{ padding: 0, marginBottom: 12 }}
          >
            Nhập mã khác
          </Button>

          <Title level={4} style={{ margin: "0 0 4px" }}>Xác nhận tham gia lớp</Title>
          <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 16 }}>
            Vui lòng kiểm tra lại thông tin trước khi tham gia:
          </Text>

          <Card
            styles={{ body: { padding: 0 } }}
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #f0f0f0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              marginBottom: 20
            }}
          >
            <div
              style={{
                background: foundClass?.themeColor?.startsWith("#")
                  ? `linear-gradient(135deg, ${foundClass.themeColor} 0%, ${foundClass.themeColor}dd 100%)`
                  : "linear-gradient(135deg, #1677ff 0%, #3b82f6 100%)",
                padding: "16px 20px",
                color: "#fff"
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  background: "rgba(255,255,255,0.22)",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontWeight: 500,
                  display: "inline-block",
                  marginBottom: 6
                }}
              >
                {foundClass?.subject || "Lớp học chung"}
              </span>
              <h3 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700 }}>
                {foundClass?.name}
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                <UserOutlined style={{ marginRight: 4 }} />
                Giáo viên: {foundClass?.teacherName}
              </p>
            </div>

            <div style={{ padding: "14px 20px", background: "#fff" }}>
              <Paragraph 
                type="secondary" 
                style={{ fontSize: 13, margin: 0 }}
                ellipsis={{ rows: 2 }}
              >
                {foundClass?.description || "Không có mô tả chi tiết."}
              </Paragraph>
            </div>
          </Card>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button onClick={() => setStep(1)} disabled={loading}>
              Quay lại
            </Button>
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />} 
              onClick={handleConfirmJoin} 
              loading={loading}
            >
              Vào lớp học ngay
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default JoinClassModal;