import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";


const WritingPage = () => {
  return (
    <div>
        <SubmissionSuccess onNextTest={null} testType = "writing" isLastTest={true} />
    </div>
  );
};

export default WritingPage; 