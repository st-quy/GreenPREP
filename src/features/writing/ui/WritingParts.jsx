import React from "react";
import { useWritingPart } from "@features/writing/hooks/useWriting";
import WritingPart1 from "@features/writing/ui/WritingPart/WritingPart1";
import WritingPart2 from "@features/writing/ui/WritingPart/WritingPart2";
import WritingPart3 from "@features/writing/ui/WritingPart/WritingPart3";
import WritingPart4 from "@features/writing/ui/WritingPart/WritingPart4";
import { useParams } from "react-router-dom";
import ButtonNextComponent from '@shared/ui/button-next-previous/buttonNext';
import ButtonPreviousComponent from '@shared/ui/button-next-previous/buttonPrevious';

const WritingParts = ({ onSubmit }) => {
  const { partId } = useParams();
  const { 
    exams,
    isLoading, 
    error,
    currentPath 
  } = useWritingPart(partId);

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
      
      <div className="flex justify-end gap-4 mb-4 ml-auto">
        <ButtonPreviousComponent 
          url={`/session/writing/part/${parseInt(currentPath) - 1}`}
          isFirstQuestion={currentPath === "1"}
        />
        <ButtonNextComponent 
          url={currentPath === "4" ? "#" : `/session/writing/part/${parseInt(currentPath) + 1}`}
          isLastQuestion={currentPath === "4"}
          onSubmitTest={currentPath === "4" ? onSubmit : null}
        />
      </div>
    </div>
  );
};

export default WritingParts;