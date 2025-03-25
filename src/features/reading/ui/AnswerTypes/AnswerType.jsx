import { QuestionType } from "@shared/lib/constants/questionType";
import React from "react";
import RDropDownList from "./DropDownList/RDropDownList";
import ROrderingList from "./OrderingList/ROrderingList";
import RMatchingList from "./MatchingList/RMatchingList";

const AnswerType = ({ question }) => {
  switch (question.Type) {
    case QuestionType.DropdownList:
      return <RDropDownList dataSource={question} />;
    case QuestionType.Ordering:
      return <ROrderingList dataSource={question} />;

    case QuestionType.Matching:
      return <RMatchingList dataSource={question} />;

    default:
      return null;
  }
};

export default AnswerType;
