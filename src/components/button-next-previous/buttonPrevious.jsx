import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * ButtonPreviousComponent
 * ------------------------
 * This is a "Previous" button component used to navigate users
 * back to the previous question in an application.
 * 
 * Props:
 * - url: The path to navigate to when the button is clicked. If not provided,
 *   the default value is '/' (homepage).
 * - isFirstQuestion: A boolean flag indicating whether the current question is the first one.
 *   If it is the first question (isFirstQuestion = true), the button will not be displayed.
 * 
 * Behavior:
 * - The button only works if it is not the first question and a valid URL is provided.
 * - When clicked, the user is navigated to the specified path.
 * - If it is the first question, the button will not be displayed to prevent invalid navigation.
 */

const ButtonPreviousComponent = ({ url, isFirstQuestion = fasle }) => {
  const navigate = useNavigate();

  
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

// Default values of props

ButtonPreviousComponent.defaultProps = {
  url: '/',
  isFirstQuestion: true
};

export default ButtonPreviousComponent;
