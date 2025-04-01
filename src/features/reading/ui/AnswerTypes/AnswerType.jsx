import { QuestionType } from "@shared/lib/constants/questionType";
import React from "react";
import ReadingDropdownList from "./DropdownList/ReadingDropDownList";
import ReadingOrderingList from "./ReadingOrderingList/ReadingOrderingList.jsx";
import ReadingMatchingList from "./MatchingList/ReadingMatchingList";

const AnswerType = ({ question }) => {
  switch (question.Type) {
    case QuestionType.DropdownList:
      return <ReadingDropdownList dataSource={question} />;
    case QuestionType.Ordering:
      return <ReadingOrderingList dataSource={question} />;

    case QuestionType.Matching:
      return <ReadingMatchingList dataSource={question} />;

    default:
      return null;
  }
};

export default AnswerType;
