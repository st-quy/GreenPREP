import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";
import { useNavigate } from "react-router-dom";

const WritingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
        <SubmissionSuccess 
        onNextTest={() => navigate('/')}
        testType="writing" 
        isLastTest={true} 
        />
    </div>
  );
};

export default WritingPage; 