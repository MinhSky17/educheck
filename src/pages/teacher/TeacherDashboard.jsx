import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, Typography, Empty, Row, Col, Tooltip, 
  message, Spin, Dropdown, Modal 
} from "antd";
import { 
  PlusOutlined, TeamOutlined, CopyOutlined, 
  MoreOutlined, ReloadOutlined, CheckCircleOutlined 
} from "@ant-design/icons";
import Header from "../../components/public/Header";
import CreateClassModal from "../../components/teacher/CreateClassModal";
import { getTeacherClasses, resetClassCode } from "../../services/firebase";

const { Title, Paragraph } = Typography;

export default function TeacherDashboard({ user, userProfile }) {
  // HOOK PHẢI ĐẶT BÊN TRONG COMPONENT
  const navigate = useNavigate(); 
  
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const fetchClasses = async () => {
    if (!user?.uid) return;
    try {
      const data = await getTeacherClasses(user.uid);
      setClasses(data);
    } catch (err) {
      message.error("Lỗi khi tải danh sách lớp học!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [user]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    message.success(`Đã sao chép mã lớp: ${code}`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleResetCode = (classItem) => {
    Modal.confirm({
      title: `Đặt lại mã lớp "${classItem.name}"?`,
      content: "Mã lớp cũ sẽ bị vô hiệu hóa ngay lập tức. Học sinh đã tham gia lớp vẫn giữ nguyên.",
      okText: "Đổi mã mới",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const newCode = await resetClassCode(classItem.id);
          message.success(`Mã mới của lớp: ${newCode}`);
          setClasses((prev) =>
            prev.map((c) => (c.id === classItem.id ? { ...c, code: newCode } : c))
          );
        } catch (err) {
          message.error("Không thể đổi mã lớp lúc này!");
        }
      },
    });
  };

  const activeCount = classes.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={user} userProfile={userProfile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Title level={2} style={{ margin: 0 }}>Lớp học của bạn 👨‍🏫</Title>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">
                {activeCount}/30 lớp
              </span>
            </div>
            <Paragraph type="secondary" style={{ margin: "4px 0 0" }}>
              Tạo lớp học, chia sẻ mã tham gia và bắt đầu quản lý bài tập dễ dàng.
            </Paragraph>
          </div>

          <Button
            type="primary" size="large" icon={<PlusOutlined />} shape="round"
            className="shadow-md shadow-blue-500/20"
            disabled={activeCount >= 30}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Tạo lớp học mới
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spin tip="Đang tải dữ liệu lớp học..." size="large" /></div>
        ) : classes.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <Empty
              image={<TeamOutlined style={{ fontSize: 56, color: "#9ca3af" }} />}
              description={
                <div className="mt-2">
                  <p className="font-semibold text-gray-700 text-base mb-1">Bạn chưa có lớp học nào</p>
                  <p className="text-gray-400 text-sm">Hãy bấm nút "Tạo lớp học mới" phía trên để lấy mã mời học sinh nhé!</p>
                </div>
              }
            />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {classes.map((c) => {
              const bgGradient = c.themeColor?.startsWith("#")
                ? `linear-gradient(135deg, ${c.themeColor} 0%, ${c.themeColor}dd 100%)`
                : "linear-gradient(135deg, #1677ff 0%, #3b82f6 100%)";
              const isCopied = copiedCode === c.code;

              return (
                <Col xs={24} sm={12} lg={8} key={c.id}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                    <div className="p-5 text-white relative" style={{ background: bgGradient }}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                          {c.subject || "Lớp học chung"}
                        </span>
                        <Dropdown
                          menu={{ items: [{ key: "reset-code", label: "Đặt lại mã lớp mới", icon: <ReloadOutlined />, onClick: () => handleResetCode(c) }] }}
                          trigger={["click"]} placement="bottomRight"
                        >
                          <Button type="text" shape="circle" size="small" className="text-white hover:bg-white/20" icon={<MoreOutlined style={{ fontSize: 18 }} />} />
                        </Dropdown>
                      </div>
                      <h3 className="font-bold text-xl text-white truncate m-0 drop-shadow-sm">{c.name}</h3>
                      <p className="text-xs text-white/80 mt-1 m-0">{c.teacherName}</p>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-4">
                        {c.description || "Chưa có mô tả cho lớp học này."}
                      </p>
                      <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">MÃ THAM GIA LỚP</span>
                          <span className="font-mono font-bold text-xl text-gray-800 tracking-widest">{c.code}</span>
                        </div>
                        <Tooltip title={isCopied ? "Đã chép!" : "Sao chép mã lớp"}>
                          <Button
                            type={isCopied ? "primary" : "default"} shape="circle"
                            icon={isCopied ? <CheckCircleOutlined /> : <CopyOutlined />}
                            onClick={() => handleCopyCode(c.code)}
                            className={isCopied ? "bg-green-600 border-green-600" : ""}
                          />
                        </Tooltip>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center gap-1 font-medium"><TeamOutlined /> {c.studentCount || 0} học sinh</span>
                        {/* GỌI NAVIGATE TẠI ĐÂY */}
                        <Button type="link" size="small" className="font-medium p-0" onClick={() => navigate(`/class/${c.id}`)}>
                          Vào lớp học &rarr;
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </main>

      <CreateClassModal
        isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}
        user={user} existingClasses={classes} onClassCreated={(newClass) => setClasses((prev) => [newClass, ...prev])}
      />
    </div>
  );
}