import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * ButtonPreviousComponent
 * ------------------------
 * Đây là một component nút "Previous" được sử dụng để điều hướng người dùng
 * quay lại câu hỏi trước đó trong một ứng dụng.
 * 
 * Props:
 * - url: Đường dẫn để điều hướng khi người dùng nhấn nút. Nếu không được truyền vào,
 *   giá trị mặc định là '/' (trang chủ).
 * - isFirstQuestion: Cờ boolean xác định xem câu hỏi hiện tại có phải là câu hỏi đầu tiên hay không.
 *   Nếu là câu hỏi đầu tiên (isFirstQuestion = true), nút sẽ không hiển thị.
 * 
 * Hành vi:
 * - Nút chỉ hoạt động khi không phải câu hỏi đầu tiên và có đường dẫn hợp lệ.
 * - Khi nhấn nút, người dùng sẽ được điều hướng đến đường dẫn được chỉ định.
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

  if (isFirstQuestion) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="w-[142px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out hover:bg-[#3758F9] hover:text-white"
    >
      <FaArrowLeft className="w-[20px] h-[20px]" />

      <span className="w-[66px] h-[24px] flex items-center justify-center font-medium">
        Previous
      </span>
    </button>
  );
};

// Giá trị mặc định cho props

ButtonPreviousComponent.defaultProps = {
  url: '/',
  isFirstQuestion: true
};

export default ButtonPreviousComponent;
