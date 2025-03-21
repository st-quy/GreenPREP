import { useLocation } from "react-router-dom";
import CountdownTimer from "../../shared/ui/CountdownTimer";

const Introduct = () => {
  const location = useLocation();
  const testDuration = location.state?.testDuration || 900;

  return (
    <div className="flex justify-between content-center">
      Reading page
      <CountdownTimer duration={testDuration} onTimeUp={() => alert("Time out!")} />
    </div>
  );
};

export default Introduct;
