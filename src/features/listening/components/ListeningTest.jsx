import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "../../../shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { FlagOutlined, PlayCircleOutlined } from "@ant-design/icons";
import QuestionMuitipleChoice from "./QuestionMuitipleChoice";
import { useListeningTest } from "../hooks/useListeningTest";

const ListeningTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentParts, setCurrentParts] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [markedQuestions, setMarkedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("markedQuestions")) || {};
  });
  const { data: questions } = useListeningTest();

  useEffect(() => {
    if (questions) {
      setCurrentParts(questions.Parts[0]);
    }
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem("markedQuestions", JSON.stringify(markedQuestions));
  }, [markedQuestions]);

  const handleSubmitTest = () => {
    navigate("/session/reading");
    localStorage.removeItem("countdownTime");
    localStorage.removeItem("selectedAnswers");
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev, [questionId]: answer };
      localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, currentParts.Questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleMarkQuestion = (questionId) => {
    setMarkedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };
  const audioRef = useRef(
    new Audio(
      "https://drive.google.com/file/d/1sFZqYIsyON0re2cNo1MT05z-cXElONmf/preview"
    )
  );

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="container mx-auto py-6 max-w-[1550px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl p-6 shadow-sm">
              {currentParts && (
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-bold">
                      {currentParts.Content}
                    </span>
                    <Button
                      type="primary"
                      onClick={() =>
                        handleMarkQuestion(
                          currentParts.Questions[currentQuestionIndex].ID
                        )
                      }
                      icon={
                        markedQuestions[
                          currentParts.Questions[currentQuestionIndex].ID
                        ] ? (
                          <FlagOutlined color="red" />
                        ) : (
                          <FlagOutlined color="" />
                        )
                      }
                      className={`ml-4 px-3 py-1 text-sm font-medium rounded-xl transition-all duration-200 border-0
                      ${markedQuestions[currentParts.Questions[currentQuestionIndex].ID] ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : "bg-gray-200 !text-black hover:!bg-gray-300"}`}
                    >
                      {markedQuestions[
                        currentParts.Questions[currentQuestionIndex].ID
                      ]
                        ? "Unmark"
                        : "Mark"}
                    </Button>
                  </div>
                  {currentParts.Questions.length > 0 && (
                    <QuestionMuitipleChoice
                      question={currentParts.Questions[currentQuestionIndex]}
                      questionIndex={currentQuestionIndex}
                      selectedAnswers={selectedAnswers}
                      handleAnswerSelect={handleAnswerSelect}
                    />
                  )}
                </div>
              )}
            </Card>
            <Card className="p-8">
              <h2 className="mb-2">Listen audio file here:</h2>
              <div className="flex gap-6">
                <Button
                  className="!rounded-full"
                  type="primary"
                  ghost
                  icon={<PlayCircleOutlined />}
                  onClick={playAudio}
                >
                  Play first time
                </Button>
                <Button
                  className="!rounded-full"
                  type="primary"
                  ghost
                  icon={<PlayCircleOutlined />}
                >
                  Play second time
                </Button>
              </div>
            </Card>
            <div className="flex justify-end gap-6">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="!bg-white shadow-sm text-[#3758F9] p-6 rounded-full text-sm"
              >
                &lt;- Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex === currentParts?.Questions.length - 1
                }
                className="bg-blue-600 hover:!bg-blue-700 !text-white p-6 rounded-full text-sm"
              >
                Next -&gt;
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">
                Time Remaining
              </h2>
              <CountdownTimer onSubmit={handleSubmitTest} />
            </div>
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-4">
                Question Controls
              </h2>
              <div className="grid grid-cols-6 gap-2.5">
                {questions?.Parts[0]?.Questions.map((question, index) => {
                  const isAnswered = selectedAnswers.hasOwnProperty(
                    question.ID
                  );
                  const isMarked = markedQuestions[question.ID];

                  return (
                    <Button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-11 h-11 rounded-xl text-sm font-medium flex items-center justify-center border-1 hover:!border-gray-300  ${isMarked ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : isAnswered ? "bg-green-500 !text-white hover:!bg-green-600" : currentQuestionIndex === index ? "bg-[#E1E8FF] hover:!bg-[#d6e0ff] !border-[#4C6AFA] !text-[#4C6AFA]" : "bg-gray-50 text-gray-900 hover:bg-gray-100"}`}
                    >
                      {isMarked ? <FlagOutlined /> : index + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningTest;
