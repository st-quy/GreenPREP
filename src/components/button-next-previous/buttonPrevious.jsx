import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * Component ButtonPrevious - Nút điều hướng về câu hỏi trước
 * @param {string} url - Đường dẫn để điều hướng khi click nút
 * @param {boolean} isFirstQuestion - Trạng thái kiểm tra có phải câu hỏi đầu tiên không
 */
const ButtonPreviousComponent = ({ url, isFirstQuestion }) => {
  const navigate = useNavigate();

  /**
   * Xử lý sự kiện click vào nút
   * Chỉ điều hướng khi:
   * - Không phải câu hỏi đầu tiên (isFirstQuestion = false)
   * - Có đường dẫn url được truyền vào
   */
  const handleClick = () => {
    if (!isFirstQuestion && url) {
      navigate(url);
    }
  };

  // Nếu là câu hỏi đầu tiên, không hiển thị nút
  if (isFirstQuestion) {
    return null;
  }

  // UI của nút Previous
  return (
    <button
      onClick={handleClick}
      className="w-[142px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out hover:bg-[#3758F9] hover:text-white"
    >
      {/* Icon mũi tên trái - kích thước 20x20 */}
      <FaArrowLeft className="w-[20px] h-[20px]" />

      {/* Container cho text - kích thước cố định 66x24 */}
      <span className="w-[66px] h-[24px] flex items-center justify-center font-medium">
        Previous
      </span>
    </button>
  );
};

// Giá trị mặc định cho props
ButtonPreviousComponent.defaultProps = {
  url: '/',
  isFirstQuestion: false
};

export default ButtonPreviousComponent;
