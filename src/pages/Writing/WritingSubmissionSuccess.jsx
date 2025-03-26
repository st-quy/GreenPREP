import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const WritingSubmissionSuccess = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/");
  };
  return <SubmissionSuccess testType="Writing" onNextTest={handleNextTest} />;
};

export default WritingSubmissionSuccess;
