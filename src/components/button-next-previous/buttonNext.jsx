import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

/**
 * ButtonNextComponent
 * --------------------
 * This is a "Next" button component used to navigate users
 * to the next question or submit the test if on the last question.
 * 
 * Props:
 * - url: The path to navigate to when the button is clicked. If not provided,
 *   the default value is '/' (homepage).
 * - isLastQuestion: A boolean flag indicating whether the current question is the last one.
 *   If it is the last question (isLastQuestion = true), the button will display "Submit" instead of "Next".
 * - onSubmitTest: A callback function triggered when the user confirms test submission.
 *   If not provided, a default handler will be used.
 * 
 * Behavior:
 * - If not the last question, the button navigates to the specified path.
 * - If it is the last question, the button displays a confirmation modal for test submission.
 * - Users can cancel or confirm the submission through the modal.
 */
const ButtonNextComponent = ({ url, isLastQuestion, onSubmitTest }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      {/* if have component modal,change this default Modal. */}

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

// Default values of props
ButtonNextComponent.defaultProps = {
  url: '/', 
  isLastQuestion: true, 
  onSubmitTest: null
};

export default ButtonNextComponent;
