import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const GVSubmissionSuccess = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/session/reading");
  };
  return (
    <SubmissionSuccess
      testType="Grammar And Vocabulary"
      onNextTest={handleNextTest}
    />
  );
};

export default GVSubmissionSuccess;
