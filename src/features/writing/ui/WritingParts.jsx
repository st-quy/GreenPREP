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
  const currentPath = String(partId); // Đảm bảo partId là string
  
  const { 
    exams,
    isLoading, 
    error,
  } = useWritingPart();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!exams) return <div>No data available</div>;

  // Lấy data cho part hiện tại
  const currentPartData = exams[currentPath];
  if (!currentPartData) return <div>Part not found</div>;

  const renderCurrentPart = () => {
    const commonProps = {
      content: currentPartData.content,
      subContent: currentPartData.subContent,
      questions: currentPartData.questions,
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