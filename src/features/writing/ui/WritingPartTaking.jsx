import { setTime } from "@app/providers/reducer/timeSlice";
import WritingSidebar from "@features/writing/ui/sidebar-writing/WritingSidebar";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import WritingParts from "./WritingParts";

const WritingPartTaking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTime(5));
  }, [dispatch]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setIsModalVisible(true);
  };

  const handleSubmitTest = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      navigate("/session/writing/success");
    }, 300);
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

      <ConfirmTestSubmissionModal
        visible={isModalVisible}
        onSubmit={handleSubmitTest}
        onCancel={() => {
          if (!isTimeUp) {
            setIsModalVisible(false);
          }
        }}
        showCancel={!isTimeUp}
        title={"Are you sure you want to submit test?"}
        description={
          "After you submit your test, you will no longer have access to the questions, nor will you be able to review or make any changes to your answers."
        }
      />
    </div>
  );
};

export default WritingPartTaking;
