import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Spin, Typography, message, Button, Card, Table, Tag, Empty, Modal, Divider } from "antd";
import { 
  ArrowLeftOutlined, ReadOutlined, UserOutlined, PlusOutlined, 
  FileTextOutlined, EditOutlined, ClockCircleOutlined, DownloadOutlined, 
  FileWordOutlined, FilePdfOutlined, CheckCircleOutlined 
} from "@ant-design/icons";
import dayjs from "dayjs";
import Header from "../../components/public/Header";
import CreateAssignmentModal from "../../components/teacher/CreateAssignmentModal";
import SubmitAssignmentModal from "../../components/student/SubmitAssignmentModal";
import { 
  getClassDetails, getClassMembers, getClassAssignments, 
  createAssignment, getStudentSubmission 
} from "../../services/firebase";

const { Title, Text } = Typography;

const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const memberColumns = [
  { 
    title: 'Học sinh', 
    render: (_, r) => (
      <div>
        <div className="font-medium text-gray-800">{r.studentName}</div>
        <div className="text-xs text-gray-500">{r.studentEmail}</div>
      </div>
    ) 
  },
  { 
    title: 'Trạng thái', 
    dataIndex: 'status', 
    render: s => (
      <Tag color={s === "active" ? "green" : s === "left" ? "orange" : "red"}>
        {s === "active" ? "Đang học" : s === "left" ? "Đã rời" : "Bị xóa"}
      </Tag>
    ) 
  }
];

export default function ClassDetails({ user, userProfile }) {
  const { classId } = useParams();
  const navigate = useNavigate();
  const isTeacher = userProfile?.role === "teacher";
  
  const [state, setState] = useState({ data: null, members: [], assignments: [], loading: true });
  const [submissionsMap, setSubmissionsMap] = useState({}); // Lưu trạng thái bài nộp theo assignmentId
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitModalAsg, setSubmitModalAsg] = useState(null);

  useEffect(() => {
    Promise.all([
      getClassDetails(classId), 
      getClassAssignments(classId), 
      isTeacher ? getClassMembers(classId) : []
    ])
      .then(async ([data, assignments, members]) => {
        setState({ data, assignments, members, loading: false });

        // Nếu là học sinh: tải danh sách các bài đã nộp tương ứng
        if (!isTeacher && user?.uid) {
          const map = {};
          await Promise.all(
            assignments.map(async (asg) => {
              const sub = await getStudentSubmission(asg.id, user.uid);
              if (sub) map[asg.id] = sub;
            })
          );
          setSubmissionsMap(map);
        }
      })
      .catch((err) => { 
        console.error(err);
        message.error("Lỗi khi tải thông tin lớp học!"); 
        navigate("/"); 
      });
  }, [classId, isTeacher, user, navigate]);

  const handleCreateAssignment = async (values) => {
    const newAsg = await createAssignment(values);
    setState(prev => ({ 
      ...prev, 
      assignments: [{ ...newAsg, createdAt: { toMillis: () => Date.now() } }, ...prev.assignments] 
    }));
  };

  const handleSubmittedSuccess = (submission) => {
    setSubmissionsMap(prev => ({
      ...prev,
      [submission.assignmentId]: submission,
    }));
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Đang vào lớp học..." />
      </div>
    );
  }

  if (!state.data) return null;
  const { data, assignments, members } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={user} userProfile={userProfile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate("/")} 
          className="mb-4 px-0 text-gray-500 hover:text-gray-800"
        >
          Quay lại {isTeacher ? "Lớp học của bạn" : "Không gian học sinh"}
        </Button>

        {/* Banner lớp học */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-8 text-white shadow-sm relative overflow-hidden" 
          style={{ background: `linear-gradient(135deg, ${data.themeColor || '#1677ff'} 0%, ${data.themeColor || '#1677ff'}dd 100%)` }}
        >
          <div className="relative z-10">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium mb-3 inline-block">
              {data.subject || "Lớp học chung"}
            </span>
            <Title level={2} className="!text-white !m-0 !mb-2 drop-shadow-sm">{data.name}</Title>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span><UserOutlined className="mr-1" /> GV: {data.teacherName}</span>
              {isTeacher && (
                <span className="bg-black/20 px-2.5 py-0.5 rounded font-mono text-sm border border-white/10">
                  Mã lớp: {data.code}
                </span>
              )}
            </div>
          </div>
          <ReadOutlined className="absolute -right-8 -bottom-12 text-9xl opacity-10 rotate-12" />
        </div>

        {/* Tabs Điều hướng */}
        <Tabs 
          size="large" 
          items={[
            {
              key: "assignments", 
              label: "Bài tập",
              children: (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 m-0">Bảng tin bài tập</h3>
                    {isTeacher && (
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        onClick={() => setIsCreateModalOpen(true)}
                        size="middle"
                      >
                        Giao bài mới
                      </Button>
                    )}
                  </div>

                  {assignments.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {assignments.map((asg) => {
                        const isTest = asg.type === "test";
                        const plainText = stripHtml(asg.description);
                        const deadlineFormatted = asg.deadline 
                          ? dayjs(asg.deadline.toDate?.() || asg.deadline).format("HH:mm - DD/MM/YYYY")
                          : "Không có hạn";

                        const mySub = submissionsMap[asg.id];
                        const isOverdue = asg.deadline && dayjs().isAfter(dayjs(asg.deadline.toDate?.() || asg.deadline));

                        return (
                          <div 
                            key={asg.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200"
                          >
                            {/* Cụm Icon & Nội dung */}
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xl">
                                {isTest ? <FileTextOutlined /> : <EditOutlined />}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span 
                                    className="font-bold text-base text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                                    onClick={() => setSelectedAssignment(asg)}
                                  >
                                    {asg.title}
                                  </span>
                                  {isTest ? (
                                    <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded font-medium border border-red-100">
                                      Bài kiểm tra
                                    </span>
                                  ) : (
                                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-medium border border-blue-100">
                                      Bài tập
                                    </span>
                                  )}
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                    {asg.period || "Học kỳ 1"}
                                  </span>
                                </div>

                                <div className="text-xs text-gray-500 mb-1.5 font-normal">
                                  Đến hạn: {deadlineFormatted}
                                </div>

                                {plainText && (
                                  <p className="text-sm text-gray-600 line-clamp-1 m-0">
                                    {plainText}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Cụm Trạng thái & Nút thao tác bên phải */}
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between shrink-0 gap-2">
                              {isTeacher ? (
                                <span className="text-xs text-gray-500 font-medium">Đang mở</span>
                              ) : (
                                <span className={`text-sm font-medium ${mySub?.status === "submitted" ? "text-green-600" : mySub?.status === "late" ? "text-red-500" : isOverdue ? "text-red-500" : "text-amber-500"}`}>
                                  {mySub?.status === "submitted" ? "Đã nộp" : mySub?.status === "late" ? "Nộp trễ" : isOverdue ? "Nộp trễ" : "Chưa nộp"}
                                </span>
                              )}

                              <div className="flex gap-2">
                                <Button 
                                  type="default" 
                                  size="middle"
                                  className="border-gray-300 text-blue-600 hover:text-blue-700 font-medium px-4"
                                  onClick={() => setSelectedAssignment(asg)}
                                >
                                  Xem chi tiết
                                </Button>
                                {!isTeacher && (
                                  <Button 
                                    type={mySub ? "default" : "primary"}
                                    size="middle"
                                    onClick={() => setSubmitModalAsg(asg)}
                                  >
                                    {mySub ? "Sửa bài" : "Nộp bài"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Empty 
                      description="Chưa có bài tập nào được giao." 
                      className="py-12" 
                      image={<FileTextOutlined className="text-5xl text-gray-300" />} 
                    />
                  )}
                </div>
              )
            },
            {
              key: "people", 
              label: `Mọi người (${isTeacher ? members.length : data.studentCount})`,
              children: (
                <Card className="rounded-2xl shadow-sm border-gray-200">
                  {isTeacher ? (
                    <Table 
                      dataSource={members} 
                      columns={memberColumns} 
                      rowKey="id" 
                      pagination={false} 
                    />
                  ) : (
                    <div className="py-4">
                      <Title level={5} className="text-gray-700">Giáo viên phụ trách</Title>
                      <div className="p-4 bg-blue-50 rounded-xl text-blue-700 font-medium inline-flex items-center gap-2">
                        <UserOutlined /> GV: {data.teacherName}
                      </div>
                    </div>
                  )}
                </Card>
              )
            }
          ]} 
        />
      </main>

      {/* Modal Tạo bài tập */}
      <CreateAssignmentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        classId={classId} 
        onSubmit={handleCreateAssignment} 
      />

      {/* Modal Nộp bài tập */}
      {submitModalAsg && (
        <SubmitAssignmentModal
          isOpen={Boolean(submitModalAsg)}
          onClose={() => setSubmitModalAsg(null)}
          assignment={submitModalAsg}
          studentUser={user}
          currentSubmission={submissionsMap[submitModalAsg.id]}
          onSubmitted={handleSubmittedSuccess}
        />
      )}

      {/* Modal Xem chi tiết bài tập */}
      <Modal
        open={Boolean(selectedAssignment)}
        onCancel={() => setSelectedAssignment(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedAssignment(null)}>
            Đóng
          </Button>,
          !isTeacher && (
            <Button 
              key="submit" 
              type="primary" 
              onClick={() => {
                const asg = selectedAssignment;
                setSelectedAssignment(null);
                setSubmitModalAsg(asg);
              }}
            >
              {submissionsMap[selectedAssignment?.id] ? "Sửa bài làm" : "Nộp bài làm ngay"}
            </Button>
          )
        ]}
        width={750}
        centered
        destroyOnClose
      >
        {selectedAssignment && (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-2">
              <Tag color={selectedAssignment.type === "test" ? "red" : "blue"} className="m-0 font-medium">
                {selectedAssignment.type === "test" ? "Bài kiểm tra" : "Bài tập"}
              </Tag>
              <Tag className="m-0">{selectedAssignment.period}</Tag>
            </div>

            <Title level={4} style={{ margin: "4px 0 8px 0" }}>
              {selectedAssignment.title}
            </Title>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <ClockCircleOutlined />
              <span>Hạn nộp: {selectedAssignment.deadline ? dayjs(selectedAssignment.deadline.toDate?.() || selectedAssignment.deadline).format("HH:mm - DD/MM/YYYY") : "Không có hạn"}</span>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            {selectedAssignment.description && (
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-800 mb-2">Yêu cầu bài tập:</div>
                <div 
                  className="prose max-w-none text-gray-700 bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedAssignment.description }}
                />
              </div>
            )}

            {/* Danh sách file đề bài */}
            {selectedAssignment.files && selectedAssignment.files.length > 0 && (
              <div>
                <div className="text-sm font-semibold text-gray-800 mb-3">Tài liệu đính kèm:</div>
                <div className="flex flex-col gap-3">
                  {selectedAssignment.files.map((file, idx) => {
                    const isImg = file.type?.startsWith("image/") || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
                    const isWord = file.type?.includes("word") || /\.(doc|docx)$/i.test(file.name);
                    const isPdf = file.type?.includes("pdf") || /\.pdf$/i.test(file.name);

                    if (isImg) {
                      return (
                        <div key={idx} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                          <div className="text-xs text-gray-500 mb-2 font-medium flex justify-between items-center">
                            <span>🖼️ {file.name}</span>
                            <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Mở ảnh gốc</a>
                          </div>
                          <img src={file.url} alt={file.name} className="max-h-[350px] w-auto rounded-lg mx-auto object-contain border border-gray-200 shadow-sm" />
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          {isWord ? <FileWordOutlined className="text-2xl text-blue-600" /> : isPdf ? <FilePdfOutlined className="text-2xl text-red-500" /> : <FileTextOutlined className="text-2xl text-gray-500" />}
                          <div>
                            <div className="font-medium text-sm text-gray-800 line-clamp-1">{file.name}</div>
                            <div className="text-xs text-gray-400">{file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Tài liệu"}</div>
                          </div>
                        </div>
                        <Button type="primary" ghost size="small" icon={<DownloadOutlined />} href={file.url} download={file.name}>
                          Tải về
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}