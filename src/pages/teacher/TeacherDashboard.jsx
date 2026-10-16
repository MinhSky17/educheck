import React from "react";
import { Card, Button, Typography, Empty } from "antd";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import Header from "../../components/public/Header";

const { Title, Paragraph } = Typography;

function TeacherDashboard({ user, userProfile }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={user} userProfile={userProfile} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Title level={2} style={{ margin: 0 }}>Không gian Giáo viên 👨‍🏫</Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              Chào mừng {user?.displayName || user?.email}, bắt đầu tạo lớp học và giao bài tập cho học sinh.
            </Paragraph>
          </div>
          <Button type="primary" size="large" icon={<PlusOutlined />} shape="round">
            Tạo lớp học mới
          </Button>
        </div>

        <Card className="shadow-sm border-dashed">
          <Empty
            image={<TeamOutlined style={{ fontSize: 48, color: "#9ca3af" }} />}
            description="Bạn chưa tạo lớp học nào. Hãy bấm 'Tạo lớp học mới' để bắt đầu!"
          />
        </Card>
      </main>
    </div>
  );
}

export default TeacherDashboard;