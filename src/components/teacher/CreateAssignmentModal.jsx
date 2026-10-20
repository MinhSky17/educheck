import React, { useState, useRef } from "react";
import { Modal, Form, Input, Button, Radio, DatePicker, Select, Upload, message, Typography, Tooltip } from "antd";
import { 
  UploadOutlined, 
  FileTextOutlined, 
  ClockCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

export default function CreateAssignmentModal({ isOpen, onClose, classId, periods = ["Học kỳ 1"], onSubmit }) {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const handleClose = () => {
    form.resetFields();
    setFiles([]);
    if (editorRef.current) editorRef.current.innerHTML = "";
    onClose();
  };

  // Thao tác định dạng văn bản giống Word
  const formatDoc = (cmd) => {
    document.execCommand(cmd, false, null);
    if (editorRef.current) editorRef.current.focus();
  };

const handleFinish = async (v) => {
    const htmlContent = editorRef.current ? editorRef.current.innerHTML : "";
    const plainText = editorRef.current ? editorRef.current.innerText.trim() : "";
    
    if (!plainText && !files.length) {
      return message.error("Vui lòng nhập nội dung yêu cầu hoặc đính kèm file!");
    }
    
    setLoading(true);
    try {
      await onSubmit({ 
        classId, 
        ...v, 
        description: plainText ? htmlContent : "", 
        deadline: v.deadline ? v.deadline.toDate() : null, 
        files: files.map(f => f.originFileObj || f) // Lấy file nhị phân gốc
      });
      message.success("Giao bài thành công!");
      handleClose();
    } catch (e) { 
      message.error(e.message || "Lỗi khi giao bài tập!"); 
    } finally { 
      setLoading(false); 
    }
  };

  const uploadProps = {
    onRemove: f => setFiles(prev => prev.filter(i => i.uid !== f.uid)),
    beforeUpload: f => {
      const allowed = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'image/jpeg', 
        'image/png'
      ];
      if (!allowed.includes(f.type)) {
        message.error("Chỉ hỗ trợ file PDF, Word, JPG, PNG!"); 
        return Upload.LIST_IGNORE;
      }
      if (f.size > 750 * 1024) { 
        message.error("Gói miễn phí chỉ hỗ trợ file dưới 750KB!"); 
        return Upload.LIST_IGNORE; 
      }
      if (files.length >= 5) { 
        message.error("Đính kèm tối đa 5 file!"); 
        return Upload.LIST_IGNORE; 
      }
      setFiles(p => [...p, f]); 
      return false;
    },
    fileList: files,
  };

  return (
    <Modal 
      title={<div className="flex items-center gap-2"><FileTextOutlined className="text-blue-600"/> <span>Tạo bài tập / Bài kiểm tra mới</span></div>} 
      open={isOpen} 
      onCancel={!loading ? handleClose : null} 
      footer={null} 
      width={750} 
      centered 
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish} 
        initialValues={{ type: "assignment", period: periods[0] }} 
        disabled={loading} 
        className="mt-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="type" label={<Text strong>Phân loại</Text>} className="col-span-2 md:col-span-1">
            <Radio.Group optionType="button" buttonStyle="solid" className="flex">
              <Radio.Button value="assignment" className="flex-1 text-center">Bài tập</Radio.Button>
              <Radio.Button value="test" className="flex-1 text-center">Bài kiểm tra</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="period" label={<Text strong>Thuộc kỳ học</Text>} className="col-span-2 md:col-span-1">
            <Select>
              {periods.map(p => <Select.Option key={p} value={p}>{p}</Select.Option>)}
            </Select>
          </Form.Item>
        </div>
        
        <Form.Item name="title" label={<Text strong>Tiêu đề bài tập</Text>} rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }, { max: 150, message: "Tối đa 150 ký tự!" }]}>
          <Input size="large" placeholder="Ví dụ: Bài tập về nhà môn Toán chương 1" />
        </Form.Item>
        
        <Form.Item name="deadline" label={<Text strong>Hạn nộp bài</Text>} rules={[{ required: true, message: "Vui lòng chọn hạn nộp!" }]}>
          <DatePicker 
            showTime={{ format: 'HH:mm' }} 
            format="DD/MM/YYYY HH:mm" 
            disabledDate={c => c && c < dayjs().startOf('day')} 
            size="large" 
            className="w-full" 
            placeholder="Chọn ngày và giờ"
            suffixIcon={<ClockCircleOutlined />} 
          />
        </Form.Item>

        {/* Khung Soạn thảo văn bản dạng Word */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <Text strong>Nội dung yêu cầu</Text>
            <Text type="secondary" className="text-xs">Định dạng văn bản trực tiếp</Text>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 transition-colors">
            {/* Toolbar công cụ */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1">
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
            {/* Vùng gõ văn bản */}
            <div
              ref={editorRef}
              contentEditable
              className="p-3 min-h-[140px] max-h-[260px] overflow-y-auto outline-none text-gray-800 text-sm leading-relaxed"
              style={{ minHeight: "140px" }}
              data-placeholder="Nhập nội dung đề bài, hướng dẫn học sinh..."
            />
          </div>
        </div>

        <Form.Item label={<div className="flex flex-col"><Text strong>File đính kèm</Text><Text type="secondary" className="text-xs">Tối đa 5 file (PDF, Word, Ảnh), mỗi file &lt; 20MB</Text></div>}>
          <Upload {...uploadProps} multiple>
            <Button icon={<UploadOutlined />}>Tải tài liệu lên</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button onClick={handleClose} disabled={loading}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Giao bài ngay</Button>
        </div>
      </Form>
    </Modal>
  );
}