import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTime } from "../../app/providers/reducer/timeSlice";

const CountdownTimer = ({ onTimeUp }) => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state) => state.countdown.timeLeft);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft, dispatch, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex justify-center items-center bg-white w-20 h-10 shadow-md font-medium text-md md:text-lg" style={{ color: "#3758F9" }}>
      {formattedTime}
    </div>
  );
};

export default CountdownTimer;


// You can setup <CountdownTimer> as below!

// import CountdownTimer from "../../shared/ui/CountdownTimer";

// const Introduct = () => {
//   const handleTimeUp = () => {
//     alert("Time out!");
//   };

//   return (
//     <div>
//       <CountdownTimer onTimeUp={handleTimeUp} />
//     </div>
//   );
// };