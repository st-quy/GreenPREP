import React, { useState, useEffect } from "react";
import WritingParts from "./WritingParts";
import WritingSidebar from '@features/writing/ui/sidebar-writing/WritingSidebar';
import ConfirmTestSubmissionModal from '@shared/ui/Modal/ConfirmTestSubmissionModal';
import { useDispatch } from 'react-redux';
import { setTime } from '@app/providers/reducer/timeSlice';
import { useNavigate } from "react-router-dom";

const WritingTestTaking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial time to 50 minutes (3000 seconds)
    dispatch(setTime(3000));
  }, [dispatch]);

  const handleTimeUp = (timeUp) => {
    if (timeUp) {
      setIsTimeUp(true);
      setIsModalVisible(true);
    }
  };

  const handleSubmitTest = () => {
    // TODO: Add any additional submit logic here if needed
    setIsModalVisible(false);
    navigate("/session/writing/success");
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row lg:flex-row lg:mt-4">
      <div className="lg:w-2/3">
        <WritingParts onSubmit={handleOpenModal} />
      </div>
      <div className="lg:w-1/3">
        <WritingSidebar onTimeUp={handleTimeUp} />
      </div>

      {/* Confirm Submit Modal */}
      <ConfirmTestSubmissionModal
        visible={isModalVisible}
        onSubmit={handleSubmitTest}
        onCancel={() => setIsModalVisible(false)}
        showCancel={!isTimeUp}
        title={isTimeUp ? "Time's up!" : "Are you sure you want to submit test?"}
        description={isTimeUp 
          ? "Your time has expired. Your test will be submitted automatically."
          : "After you submit your test, you will no longer have access to the questions, nor will you be able to review or make any changes to your answers."
        }
      />
    </div>
  );
};

export default WritingTestTaking;
