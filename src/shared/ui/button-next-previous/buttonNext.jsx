import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';


const ButtonNextComponent = ({ url, isLastQuestion = false, onSubmitTest = null, onClick }) => {
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
      const defaultSubmit = () => {
        Modal.error({
          title: 'Submission Error',
          content: 'An error occurred while submitting your test. Please try again later.',
        });
      };
      defaultSubmit();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      
      <button
        onClick={isLastQuestion ? onSubmitTest : onClick}
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



export default ButtonNextComponent;