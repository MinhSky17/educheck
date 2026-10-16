import React from "react";
import { Card, Button, Typography, Empty } from "antd";
import { LoginOutlined, BookOutlined } from "@ant-design/icons";
import Header from "../../components/public/Header";

const { Title, Paragraph } = Typography;

function StudentDashboard({ user, userProfile }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={user} userProfile={userProfile} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Title level={2} style={{ margin: 0 }}>Không gian Học sinh 🎒</Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              Xin chào {user?.displayName || user?.email}, theo dõi lớp học và nộp bài tập đúng hạn.
            </Paragraph>
          </div>
          <Button type="primary" size="large" icon={<LoginOutlined />} shape="round">
            Tham gia lớp học
          </Button>
        </div>

        <Card className="shadow-sm border-dashed">
          <Empty
            image={<BookOutlined style={{ fontSize: 48, color: "#9ca3af" }} />}
            description="Bạn chưa tham gia lớp học nào. Hãy nhập mã lớp do giáo viên cung cấp!"
          />
        </Card>
      </main>
    </div>
  );
}

export default StudentDashboard;