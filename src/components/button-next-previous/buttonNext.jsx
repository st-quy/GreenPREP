import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

// Nếu có file modal riêng thì import như sau:
// import SubmitTestModal from '@components/modals/SubmitTestModal';

/**
 * Component ButtonNext - Nút điều hướng đến câu hỏi tiếp theo hoặc nộp bài
 * @param {string} url - Đường dẫn để điều hướng khi click nút (trong trường hợp không phải câu hỏi cuối)
 * @param {boolean} isLastQuestion - Trạng thái kiểm tra có phải câu hỏi cuối không
 * @param {Function} onSubmitTest - Callback function được gọi khi người dùng xác nhận nộp bài
 */
const ButtonNextComponent = ({ url, isLastQuestion, onSubmitTest }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Xử lý sự kiện click vào nút
   * - Nếu là câu hỏi cuối (isLastQuestion = true): Hiển thị modal xác nhận nộp bài
   * - Nếu không phải câu hỏi cuối: Điều hướng đến url được truyền vào
   */
  const handleClick = () => {
    if (isLastQuestion) {
      setIsModalOpen(true);
    } else if (url) {
      navigate(url);
    }
  };

  // Nếu có modal riêng, các hàm xử lý có thể chuyển sang modal component
  // Modal component sẽ nhận các props:
  // - isOpen: trạng thái hiển thị modal
  // - onSubmit: function xử lý khi nhấn nút Submit
  // - onCancel: function xử lý khi đóng modal
  const handleSubmit = () => {
    setIsModalOpen(false);
    if (onSubmitTest) {
      onSubmitTest();
    } else {
      defaultSubmit();
    }
  };

  /**
   * Xử lý khi người dùng đóng modal (click Cancel hoặc nút X)
   */
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Button Next/Submit */}
      <button
        onClick={handleClick}
        className="w-[114px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out hover:bg-[#3758F9] hover:text-white"
      >
        {/* Container cho text - kích thước cố định 36x24 */}
        <span className="w-[36px] h-[24px] flex items-center justify-center font-medium">
          {isLastQuestion ? 'Submit' : 'Next'}
        </span>

        {/* Icon mũi tên phải - chỉ hiển thị khi không phải câu hỏi cuối */}
        {!isLastQuestion && <FaArrowRight className="w-[20px] h-[20px]" />}
      </button>

      {/* Nếu có component modal riêng, thay thế phần Modal này bằng: */}
      {/* <SubmitTestModal
        isOpen={isModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      /> */}

      <Modal
        title="Submit Test"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        okButtonProps={{
          className: 'bg-[#3758F9] hover:bg-[#2848E9]'
        }}
      >
        <p>Are you sure you want to submit your test?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
};

// Giá trị mặc định cho props
ButtonNextComponent.defaultProps = {
  url: '/', // Mặc định điều hướng về trang chủ
  isLastQuestion: false, // Mặc định không phải câu hỏi cuối
  onSubmitTest: null // Mặc định không có callback xử lý nộp bài
};

export default ButtonNextComponent;
