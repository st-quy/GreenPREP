import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime, decrementTime } from "../../app/providers/reducer/timeSlice";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";

/**
 * @typedef {Object} RootState
 * @property {Object} countdown
 * @property {number} countdown.timeLeft
 */

const CountdownTimer = ({ initialTime = 600, onSubmit }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  /** @type {number | null} */
  const timeLeft = useSelector((/** @type {RootState} */ state) => state.countdown.timeLeft);

  useEffect(() => {
    const storedTime = localStorage.getItem("countdownTime");

    if (!storedTime || isNaN(parseInt(storedTime, 10))) {
      dispatch(setTime(initialTime));
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [dispatch, initialTime]);

  useEffect(() => {
    if (isInitialized && timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);

      return () => clearInterval(timer);
    } else if (isInitialized && timeLeft === 0) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
    }
  }, [timeLeft, dispatch, isInitialized]);

  const handleSubmit = () => {
    setIsModalVisible(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center bg-white w-20 h-10 shadow-md font-medium text-md md:text-lg"
        style={{ color: "#3758F9" }}
      >
        {isInitialized ? formattedTime : "Loading..."}
      </div>

      <ConfirmTestSubmissionModal
        visible={isModalVisible}
        onSubmit={handleSubmit}
        onCancel={handleSubmit}
        title="Time is up!"
        description="Your time has run out. You need to submit your test now."
        showCancel={false}
      />
    </div>
  );
};

export default CountdownTimer;
