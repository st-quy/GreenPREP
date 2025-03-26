import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const ListeningSubmissionSuccess = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/session/grammar");
  };
  return <SubmissionSuccess testType="Listening" onNextTest={handleNextTest} />;
};

export default ListeningSubmissionSuccess;
