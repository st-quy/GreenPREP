import React from "react";
import { useWritingPart } from "@features/writing/hooks/useWriting";
import WritingPart1 from "@features/writing/ui/WritingPart/WritingPart1";
import WritingPart2 from "@features/writing/ui/WritingPart/WritingPart2";
import WritingPart3 from "@features/writing/ui/WritingPart/WritingPart3";
import WritingPart4 from "@features/writing/ui/WritingPart/WritingPart4";
import { useParams, useNavigate } from "react-router-dom";
import ButtonNextComponent from '@shared/ui/button-next-previous/buttonNext';
import ButtonPreviousComponent from '@shared/ui/button-next-previous/buttonPrevious';

const WritingParts = ({ onSubmit }) => {
  const { partId } = useParams();
  const navigate = useNavigate();
  const { 
    exams,
    isLoading, 
    error,
    currentPath 
  } = useWritingPart(partId);

  const handleNavigation = (direction) => {
    const currentPartNum = parseInt(currentPath);
    const nextPart = direction === 'next' ? currentPartNum + 1 : currentPartNum - 1;
    
    if (nextPart >= 1 && nextPart <= 4) {
      navigate(`/session/writing/part/${nextPart}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!exams) return <div>No data available</div>;

  const renderCurrentPart = () => {
    const commonProps = {
      content: exams.content,
      subContent: exams.subContent,
      questions: exams.questions,
      partId: currentPath
    };

    switch (currentPath) {
      case "1":
        return <WritingPart1 {...commonProps} />;
      case "2":
        return <WritingPart2 {...commonProps} />;
      case "3":
        return <WritingPart3 {...commonProps} />;
      case "4":
        return <WritingPart4 {...commonProps} />;
      default:
        return <div>Invalid part</div>;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        {renderCurrentPart()}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mb-4 ml-auto">
        <ButtonPreviousComponent 
          url={`/session/writing/part/${parseInt(currentPath) - 1}`}
          isFirstQuestion={currentPath === "1"}
          onClick={() => handleNavigation('prev')}
        />
        <ButtonNextComponent 
          url={currentPath === "4" ? "#" : `/session/writing/part/${parseInt(currentPath) + 1}`}
          isLastQuestion={currentPath === "4"}
          onClick={currentPath === "4" ? onSubmit : () => handleNavigation('next')}
        />
      </div>
    </div>
  );
};

export default WritingParts;