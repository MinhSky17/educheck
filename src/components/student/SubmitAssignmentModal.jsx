import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Button, Upload, message, Typography, Alert, Tooltip } from "antd";
import { 
  UploadOutlined, 
  SendOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import { submitAssignment } from "../../services/firebase";

const { Text } = Typography;

export default function SubmitAssignmentModal({ isOpen, onClose, assignment, studentUser, currentSubmission, onSubmitted }) {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  // Khi mở modal hoặc có bài nộp cũ: load lại nội dung văn bản Word đã nộp
  useEffect(() => {
    if (isOpen) {
      if (currentSubmission) {
        if (editorRef.current) {
          editorRef.current.innerHTML = currentSubmission.textContent || "";
        }
        setFiles(currentSubmission.files || []);
      } else {
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
        setFiles([]);
      }
    }
  }, [currentSubmission, isOpen]);

  // Các thao tác định dạng văn bản Word
  const formatDoc = (cmd) => {
    document.execCommand(cmd, false, null);
    if (editorRef.current) editorRef.current.focus();
  };

  const deadlineTime = assignment?.deadline?.toDate ? assignment.deadline.toDate() : assignment?.deadline;
  const isOverdue = deadlineTime ? dayjs().isAfter(dayjs(deadlineTime)) : false;

  const handleFinish = async () => {
    const htmlContent = editorRef.current ? editorRef.current.innerHTML : "";
    const plainText = editorRef.current ? editorRef.current.innerText.trim() : "";

    if (!plainText && files.length === 0) {
      return message.error("Vui lòng nhập nội dung bài làm hoặc đính kèm file!");
    }

    setLoading(true);
    try {
      const result = await submitAssignment({
        assignmentId: assignment.id,
        classId: assignment.classId,
        studentUser,
        textContent: plainText ? htmlContent : "", // Lưu nguyên định dạng HTML của Word
        files,
        isLate: isOverdue,
      });

      message.success(currentSubmission ? "Cập nhật bài nộp thành công!" : "Nộp bài tập thành công!");
      onSubmitted?.(result);
      onClose();
    } catch (err) {
      message.error(err.message || "Lỗi khi nộp bài!");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (f) => setFiles((prev) => prev.filter((i) => i.uid !== f.uid)),
    beforeUpload: (f) => {
      if (f.size > 750 * 1024) {
        message.error(`File "${f.name}" lớn hơn 750KB!`);
        return Upload.LIST_IGNORE;
      }
      if (files.length >= 3) {
        message.error("Tối đa 3 file đính kèm!");
        return Upload.LIST_IGNORE;
      }
      setFiles((prev) => [...prev, f]);
      return false;
    },
    fileList: files,
  };

  return (
    <Modal
      title={<div className="font-semibold text-base">Nộp bài: {assignment?.title || ""}</div>}
      open={isOpen}
      onCancel={!loading ? onClose : null}
      footer={null}
      width={680}
      centered
      destroyOnClose
    >
      {isOverdue && (
        <Alert
          message="Bài tập đã quá hạn nộp. Lần nộp này sẽ được đánh dấu là 'Nộp trễ'."
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      <Form form={form} layout="vertical" onFinish={handleFinish} disabled={loading} className="mt-3">
        {/* Khung Soạn thảo bài làm dạng Word */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <Text strong>Nội dung bài làm / Câu trả lời</Text>
            <Text type="secondary" className="text-xs">Hỗ trợ định dạng văn bản trực tiếp</Text>
          </div>
          
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors bg-white">
            {/* Toolbar công cụ */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 flex-wrap">
              <Tooltip title="In đậm (Ctrl+B)">
                <Button size="small" type="text" icon={<BoldOutlined />} onClick={() => formatDoc('bold')} />
              </Tooltip>
              <Tooltip title="In nghiêng (Ctrl+I)">
                <Button size="small" type="text" icon={<ItalicOutlined />} onClick={() => formatDoc('italic')} />
              </Tooltip>
              <Tooltip title="Gạch chân (Ctrl+U)">
                <Button size="small" type="text" icon={<UnderlineOutlined />} onClick={() => formatDoc('underline')} />
              </Tooltip>
              <div className="w-[1px] h-5 bg-gray-300 mx-1 self-center" />
              <Tooltip title="Danh sách chấm">
                <Button size="small" type="text" icon={<UnorderedListOutlined />} onClick={() => formatDoc('insertUnorderedList')} />
              </Tooltip>
              <Tooltip title="Danh sách số">
                <Button size="small" type="text" icon={<OrderedListOutlined />} onClick={() => formatDoc('insertOrderedList')} />
              </Tooltip>
            </div>

            {/* Vùng gõ nội dung làm bài */}
            <div
              ref={editorRef}
              contentEditable
              className="p-3.5 min-h-[160px] max-h-[300px] overflow-y-auto outline-none text-gray-800 text-sm leading-relaxed"
              style={{ minHeight: "160px" }}
              data-placeholder="Gõ trực tiếp câu trả lời của bạn vào đây..."
            />
          </div>
        </div>

        <Form.Item label={<Text strong>File bài làm đính kèm (&lt; 750KB/file, tối đa 3 file)</Text>}>
          <Upload {...uploadProps} multiple>
            <Button icon={<UploadOutlined />}>Chọn file đính kèm</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button onClick={onClose} disabled={loading}>Hủy</Button>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={loading}>
            {currentSubmission ? "Cập nhật bài nộp" : "Xác nhận nộp bài"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}