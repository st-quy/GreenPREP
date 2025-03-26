import React from "react";
import { useNavigate } from "react-router-dom";
import SubmissionSuccess from "@shared/SubmissionSuccess/SubmissionSuccess";

const ReadingSuccess = () => {
  const navigate = useNavigate();
  const handleNextTest = () => {
    navigate("/");
  };
  return (
    <div className="py-6 sm:py-8 md:py-12">
      <SubmissionSuccess testType="Reading" onNextTest={handleNextTest} />
    </div>
  );
};

export default ReadingSuccess;
