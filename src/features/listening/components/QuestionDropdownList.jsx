import { Space, Select, Row, Col } from "antd";
import React, { useEffect, useState } from "react";

const QuestionDropdownList = ({
  question,
  questionIndex,
  selectedAnswers,
  handleAnswerSelect,
}) => {
  if (!question) return null;
  const [listAnswer, setListAnswer] = useState([]);

  const handleSelectSingle = (value, option) => {
    const existingIndex = listAnswer.findIndex((item) => item.left === option);
    if (existingIndex !== -1) {
      const newList = [...listAnswer];
      newList[existingIndex] = { left: option, right: value };
      setListAnswer(newList);
    } else {
      setListAnswer([
        ...listAnswer,
        {
          left: option,
          right: value,
        },
      ]);
    }
  };

  useEffect(() => {
    handleAnswerSelect(question.ID, listAnswer);
  }, [listAnswer]);

  return (
    <div key={question?.ID} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-black font-bold">
          {questionIndex + 1}. {question.Content}
        </span>
      </div>
      <div className="mt-2 flex w-full">
        <Space direction="vertical" className="w-full" size={16}>
          {question.AnswerContent.leftItems.map((option, i) => (
            <Row key={i}>
              <Col md={option.length < 12 ? 6 : 16}>{option}</Col>
              <Col md={option.length < 12 ? 18 : 8}>
                <Select
                  options={question.AnswerContent.rightItems.map((item) => {
                    return {
                      value: item,
                      label: item,
                    };
                  })}
                  size="middle"
                  className="w-40"
                  placeholder="Select Answer"
                  onChange={(value) => handleSelectSingle(value, option)}
                />
              </Col>
            </Row>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default QuestionDropdownList;
