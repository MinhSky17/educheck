import React, { useState, useEffect } from "react";
import { 
  Button, 
  Typography, 
  Empty, 
  Row, 
  Col, 
  message, 
  Spin 
} from "antd";
import { 
  LoginOutlined, 
  BookOutlined, 
  UserOutlined 
} from "@ant-design/icons";
import Header from "../../components/public/Header";
import JoinClassModal from "../../components/student/JoinClassModal";
import { getStudentClasses } from "../../services/firebase";

const { Title, Paragraph } = Typography;

function StudentDashboard({ user, userProfile }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const fetchJoinedClasses = async () => {
    if (!user?.uid) return;
    try {
      const data = await getStudentClasses(user.uid);
      setClasses(data);
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tải danh sách lớp học!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedClasses();
  }, [user]);

  const handleClassJoined = (newMemberRecord) => {
    setClasses((prev) => {
      const exists = prev.some((c) => c.classId === newMemberRecord.classId);
      if (exists) return prev;
      return [newMemberRecord, ...prev];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={user} userProfile={userProfile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Banner tiêu đề */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <Title level={2} style={{ margin: 0 }}>Không gian Học sinh 🎒</Title>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 rounded-full">
                {classes.length}/30 lớp
              </span>
            </div>
            <Paragraph type="secondary" style={{ margin: "4px 0 0" }}>
              Xin chào {user?.displayName || user?.email}, theo dõi các lớp học và làm bài tập đúng hạn.
            </Paragraph>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            shape="round"
            className="shadow-md shadow-blue-500/20"
            disabled={classes.length >= 30}
            onClick={() => setIsJoinModalOpen(true)}
          >
            Tham gia lớp học
          </Button>
        </div>

        {/* Danh sách lớp đã tham gia */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin tip="Đang tải danh sách lớp học..." size="large" />
          </div>
        ) : classes.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <Empty
              image={<BookOutlined style={{ fontSize: 56, color: "#9ca3af" }} />}
              description={
                <div className="mt-2">
                  <p className="font-semibold text-gray-700 text-base mb-1">
                    Bạn chưa tham gia lớp học nào
                  </p>
                  <p className="text-gray-400 text-sm">
                    Hãy bấm nút "Tham gia lớp học" phía trên và nhập mã 6 ký tự từ giáo viên nhé!
                  </p>
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

              return (
                <Col xs={24} sm={12} lg={8} key={c.id}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                    {/* Header Thẻ lớp */}
                    <div 
                      className="p-5 text-white relative"
                      style={{ background: bgGradient }}
                    >
                      <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium inline-block mb-2">
                        {c.subject || "Lớp học chung"}
                      </span>
                      <h3 className="font-bold text-xl text-white truncate m-0 drop-shadow-sm">
                        {c.className}
                      </h3>
                      <p className="text-xs text-white/80 mt-1 m-0">
                        <UserOutlined style={{ marginRight: 4 }} />
                        GV: {c.teacherName}
                      </p>
                    </div>

                    {/* Thân thẻ */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
                        <span className="text-green-600 font-medium">
                          ● Đang theo học
                        </span>
                        <Button type="link" size="small" className="font-medium p-0">
                          Vào phòng học &rarr;
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

      {/* Modal tham gia lớp */}
      <JoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        user={user}
        onClassJoined={handleClassJoined}
      />
    </div>
  );
}

export default StudentDashboard;