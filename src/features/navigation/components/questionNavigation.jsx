import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from "antd";
import { StarFilled } from "@ant-design/icons";
import { setCurrentQuestion, selectNavigation } from "../navigationSlice";

const QuestionNavigation = () => {
  const dispatch = useDispatch();
  const { 
    currentQuestion, 
    totalQuestions, 
    markedQuestions,
    answeredQuestions 
  } = useSelector(selectNavigation);

  const handleQuestionClick = (questionNumber) => {
    dispatch(setCurrentQuestion(questionNumber));
  };

  const getButtonStyle = (questionNumber) => {
    const isCurrentQuestion = questionNumber === currentQuestion;
    const isAnswered = answeredQuestions[questionNumber] !== undefined;
    
    /** @type {import('react').CSSProperties} */
    const baseStyle = {
      width: "40px",
      height: "40px",
      position: "relative",
      padding: "4px 8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px"
    };

    if (isCurrentQuestion) {
      return {
        ...baseStyle,
        border: "2px solid #4070f4",
        backgroundColor: "#e6f4ff",
        color: "#4070f4",
        fontWeight: "bold"
      };
    }

    if (isAnswered) {
      return {
        ...baseStyle,
        backgroundColor: "#e6f4ff",
        border: "1px solid #d9d9d9"
      };
    }

    return {
      ...baseStyle,
      border: "1px solid #d9d9d9"
    };
  };

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Question Navigation</h3>
      <Space wrap size={[8, 8]} style={{ width: "100%" }}>
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
          <div key={num} style={{ position: "relative" }}>
            <Button
              onClick={() => handleQuestionClick(num)}
              style={getButtonStyle(num)}
            >
              {num}
            </Button>
            {markedQuestions.includes(num) && (
              <StarFilled
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  color: "#faad14",
                  fontSize: "14px",
                  backgroundColor: "white",
                  borderRadius: "50%"
                }}
              />
            )}
          </div>
        ))}
      </Space>
    </div>
  );
};

export default QuestionNavigation;
