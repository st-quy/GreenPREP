import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

/**
 * ButtonNextComponent
 * --------------------
 * Đây là một component nút "Next" được sử dụng để điều hướng người dùng
 * đến câu hỏi tiếp theo hoặc nộp bài kiểm tra nếu đang ở câu hỏi cuối cùng.
 * 
 * Props:
 * - url: Đường dẫn để điều hướng khi người dùng nhấn nút. Nếu không được truyền vào,
 *   giá trị mặc định là '/' (trang chủ).
 * - isLastQuestion: Cờ boolean xác định xem câu hỏi hiện tại có phải là câu hỏi cuối cùng hay không.
 *   Nếu là câu hỏi cuối cùng (isLastQuestion = true), nút sẽ hiển thị "Submit" thay vì "Next".
 * - onSubmitTest: Hàm callback được gọi khi người dùng xác nhận nộp bài kiểm tra.
 *   Nếu không được truyền vào, sẽ sử dụng hàm xử lý mặc định.
 * 
 * Hành vi:
 * - Nếu không phải câu hỏi cuối cùng, nút sẽ điều hướng đến đường dẫn được chỉ định.
 * - Nếu là câu hỏi cuối cùng, nút sẽ hiển thị modal xác nhận nộp bài kiểm tra.
 * - Người dùng có thể hủy hoặc xác nhận nộp bài thông qua modal.
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
      
      <button
        onClick={handleClick}
        className="w-[114px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out hover:bg-[#3758F9] hover:text-white"
      >
        
        <span className="w-[36px] h-[24px] flex items-center justify-center font-medium">
          {isLastQuestion ? 'Submit' : 'Next'}
        </span>

        
        {!isLastQuestion && <FaArrowRight className="w-[20px] h-[20px]" />}
      </button>

      {/* Nếu có component modal riêng, thay thế phần Modal này. */}

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
  url: '/', 
  isLastQuestion: true, 
  onSubmitTest: null
};

export default ButtonNextComponent;
