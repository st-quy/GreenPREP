import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const SpeakingSubmissionSucces = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/session/listening");
  };
  return <SubmissionSuccess testType="speaking" onNextTest={handleNextTest} />;
};

export default SpeakingSubmissionSucces;
