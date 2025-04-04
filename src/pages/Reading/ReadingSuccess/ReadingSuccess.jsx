import React from "react";
import { useNavigate } from "react-router-dom";
import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";

const ReadingSuccess = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/session/writing");
  };
  return (
    <div className="py-6">
      <SubmissionSuccess testType="Reading" onNextTest={handleNextTest} />
    </div>
  );
};

export default ReadingSuccess;
