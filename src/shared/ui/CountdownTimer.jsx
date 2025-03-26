import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTime, decrementTime } from "../../app/providers/reducer/timeSlice";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal"; // Import modal

/**
 * @typedef {Object} RootState
 * @property {Object} countdown
 * @property {number} countdown.timeLeft
 */


/*
  ------Import CountdownTimer--------

    const navigator = useNavigate();
  
    const handleSubmitTest = () => {
      navigator("/session/reading");  //----Setup route submit button for next skill----
      localStorage.removeItem("countdownTime"); 
    };


    <div>
      <CountdownTimer initialTime={900} onSubmit={handleSubmitTest} />  //--------Setup time(900= 900s:60=15m | 1800s = 30m.)
    </div>
*/

const CountdownTimer = ({ initialTime = 600, onSubmit }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  /** @type {number} */
  const timeLeft = useSelector((/** @type {RootState} */ state) => state.countdown.timeLeft);

  useEffect(() => {
    if (!localStorage.getItem("countdownTime")) {
      dispatch(setTime(initialTime));
    }
  }, [dispatch, initialTime]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsModalVisible(true);
    }
  }, [timeLeft, dispatch]);

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
        {formattedTime}
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
