import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, selectNavigation } from "../navigationSlice";
import { Button } from "antd";

const NavigationBox = ({ questionNumber }) => {
  const dispatch = useDispatch();
  const { currentQuestion, markedQuestions } = useSelector(selectNavigation);

  const isMarked = markedQuestions.includes(questionNumber);
  const isActive = currentQuestion === questionNumber;

  return (
    <Button
      type={isActive ? "primary" : "default"}
      onClick={() => dispatch(setCurrentQuestion(questionNumber))}
      style={{
        margin: "4px",
        borderColor: isMarked ? "#f26f21" : undefined,
        color: isMarked && !isActive ? "#f26f21" : undefined,
        backgroundColor: isActive ? "#f26f21" : "transparent",
      }}
    >
      {questionNumber < 10 ? `0${questionNumber}` : questionNumber}
    </Button>
  );
};

NavigationBox.propTypes = {
  questionNumber: PropTypes.number.isRequired,
};

export default NavigationBox;
