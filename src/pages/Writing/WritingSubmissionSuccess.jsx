import { useFullScreenContext } from "@app/providers/FullScreenProvider";
import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const WritingSubmissionSuccess = () => {
  const { endTest } = useFullScreenContext();

  const navigate = useNavigate();
  const handleNextTest = () => {
    endTest();
    navigate("/");
  };
  return (
    <SubmissionSuccess
      testType="Writing"
      onNextTest={handleNextTest}
      isLastTest={true}
    />
  );
};

export default WritingSubmissionSuccess;
