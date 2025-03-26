import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import QuestionMuitipleChoice from "@features/grammarvocab/components/QuestionMuitipleChoice";
import QuestionDropdownList from "@features/grammarvocab/components/QuestionDropdownList";
import { useGrammarVocabTest } from "@features/grammarvocab/hooks";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";

const GrammarVocabTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listQuestion, setListQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswersGVocab")) || {}
  );
  const [markedQuestions, setMarkedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("markedQuestionsGVocab")) || {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalQuestions, setTotalQuestion] = useState(0);

  const { data: questions } = useGrammarVocabTest();

  const handleOnSubmit = () => {
    navigate("/session/grammar/submission");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (questions) {
      const totalQ = questions.Parts.reduce((total, part, index) => {
        if (part.Questions && Array.isArray(part.Questions)) {
          return total + part.Questions.length;
        }
        return total;
      }, 0);
      setTotalQuestion(totalQ);
      const allQuestions = questions?.Parts.flatMap(
        (part) => part.Questions || []
      );
      setListQuestion(allQuestions);
    }
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(
      "selectedAnswersGVocab",
      JSON.stringify(selectedAnswers)
    );
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "markedQuestionsGVocab",
      JSON.stringify(markedQuestions)
    );
  }, [markedQuestions]);

  const handleSubmitTest = () => {
    navigate("/session/reading");
    localStorage.removeItem("countdownTime");
    localStorage.removeItem("selectedAnswersGVocab");
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev, [questionId]: answer };
      localStorage.setItem(
        "selectedAnswersGVocab",
        JSON.stringify(updatedAnswers)
      );
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setIsModalOpen(true);
    } else {
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, listQuestion.length - 1)
      );
    }
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

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-xl p-6 shadow-sm">
            {listQuestion.length && (
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-blue-600 font-bold">
                    {listQuestion?.[currentQuestionIndex]?.Part?.Content}
                  </span>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleMarkQuestion(
                        listQuestion?.[currentQuestionIndex].ID
                      )
                    }
                    icon={
                      markedQuestions[
                        listQuestion?.[currentQuestionIndex].ID
                      ] ? (
                        <FlagOutlined color="red" />
                      ) : (
                        <FlagOutlined color="" />
                      )
                    }
                    className={`ml-4 px-3 py-1 text-sm font-medium rounded-xl transition-all duration-200 border-0
                      ${markedQuestions[listQuestion?.[currentQuestionIndex].ID] ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : "bg-gray-200 !text-black hover:!bg-gray-300"}`}
                  >
                    {markedQuestions[listQuestion?.[currentQuestionIndex].ID]
                      ? "Unmark"
                      : "Mark"}
                  </Button>
                </div>

                {listQuestion.length &&
                listQuestion?.[currentQuestionIndex].Type ===
                  "multiple-choice" ? (
                  <QuestionMuitipleChoice
                    key={currentQuestionIndex}
                    question={listQuestion?.[currentQuestionIndex]}
                    questionIndex={currentQuestionIndex}
                    selectedAnswers={selectedAnswers}
                    handleAnswerSelect={handleAnswerSelect}
                  />
                ) : (
                  <QuestionDropdownList
                    key={currentQuestionIndex}
                    question={listQuestion?.[currentQuestionIndex]}
                    questionIndex={currentQuestionIndex}
                    selectedAnswers={selectedAnswers}
                    handleAnswerSelect={handleAnswerSelect}
                  />
                )}
              </div>
            )}
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
              className="bg-blue-600 hover:!bg-blue-700 !text-white p-6 rounded-full text-sm"
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "Submit"
                : "Next ->"}
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
              {totalQuestions &&
                Array?.from({ length: totalQuestions }, (_, i) => i + 1).map(
                  (question, index) => {
                    const questionID = listQuestion?.[index]?.ID;
                    const isAnswered =
                      selectedAnswers.hasOwnProperty(questionID);
                    const isMarked = markedQuestions[questionID];

                    return (
                      <Button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-11 h-11 rounded-xl text-sm font-medium flex items-center justify-center border-1 hover:!border-gray-300  ${isMarked ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : isAnswered ? "bg-green-500 !text-white hover:!bg-green-600" : currentQuestionIndex === index ? "bg-[#E1E8FF] hover:!bg-[#d6e0ff] !border-[#4C6AFA] !text-[#4C6AFA]" : "bg-gray-50 text-gray-900 hover:bg-gray-100"}`}
                      >
                        {isMarked ? <FlagOutlined /> : index + 1}
                      </Button>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmTestSubmissionModal
        visible={isModalOpen}
        onSubmit={handleOnSubmit}
        onCancel={handleCancelModal}
      />
    </div>
  );
};

export default GrammarVocabTest;
