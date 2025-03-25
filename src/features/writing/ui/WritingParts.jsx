import React from "react";
import { useWritingPart } from "@features/writing/hooks/useWriting";
import WritingPart1 from "@features/writing/ui/WritingPart/WritingPart1";
import WritingPart2 from "@features/writing/ui/WritingPart/WritingPart2";
import WritingPart3 from "@features/writing/ui/WritingPart/WritingPart3";
import WritingPart4 from "@features/writing/ui/WritingPart/WritingPart4";
import { useParams } from "react-router-dom";

const WritingParts = () => {
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

  switch (currentPath) {
    case "1":
      return <WritingPart1 
        content={exams.content}
        subContent={exams.subContent}
        questions={exams.questions}
        partId={currentPath}
      />;
    case "2":
      return <WritingPart2 
        content={exams.content}
        subContent={exams.subContent}
        questions={exams.questions}
        partId={currentPath}
      />;
    case "3":
      return <WritingPart3 
        content={exams.content}
        subContent={exams.subContent}
        questions={exams.questions}
        partId={currentPath}
      />;
    case "4":
      return <WritingPart4 
        content={exams.content}
        subContent={exams.subContent}
        questions={exams.questions}
        partId={currentPath}
      />;
    default:
      return <div>Invalid part</div>;
  }
};

export default WritingParts;