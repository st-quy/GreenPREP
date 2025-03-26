import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Modal } from 'antd';

const ButtonNext = ({ onClick, isLastQuestion = false, onSubmitTest = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (isLastQuestion) {
      setIsModalOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    if (onSubmitTest) {
      onSubmitTest();
    } else {
      Modal.error({
        title: 'Submission Error',
        content: 'An error occurred while submitting your test. Please try again later.',
      });
    }
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

      <Modal
        title="Submit Test"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
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

export default ButtonNext;