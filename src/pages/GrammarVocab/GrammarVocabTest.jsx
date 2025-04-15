import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import QuestionMuitipleChoice from "@features/grammarvocab/components/QuestionMuitipleChoice";
import QuestionDropdownList from "@features/grammarvocab/components/QuestionDropdownList";
import { useGrammarVocabTest } from "@features/grammarvocab/hooks";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";
import { transformData } from "@shared/lib/utils";
import { useCreateStudentAnswer } from "@features/sessions/hooks";
import { useSelector } from "react-redux";

const GrammarVocabTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [listQuestion, setListQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );

  const [markedQuestions, setMarkedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("markedQuestionsGVocab")) || {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalQuestions, setTotalQuestion] = useState(0);

  const { data: questions } = useGrammarVocabTest();
  const { mutate: submitStudentAnswer } = useCreateStudentAnswer();
  const { participantID, sessionId } = useSelector((state) => state.session);

  const handleOnSubmit = () => {
    submitStudentAnswer({
      studentId: "77b5f9cb-73ba-4edd-9c90-998710832c87",
      topicId: "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
      skillName: "GRAMMAR AND VOCABULARY",
      sessionParticipantId: "cff9e0a0-d78a-43d5-a747-7fe83343fb30",
      sessionId: "12bd21ef-b6d8-4991-b9ee-69160ce8fd09",
      questions: transformData(selectedAnswers),
    });
    localStorage.removeItem("selectedAnswers");
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
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
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
            {listQuestion.length > 0 && (
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
                  (data, index) => {
                    const question = listQuestion?.[index];

                    const questionID = question?.ID;

                    const isMarked = markedQuestions[questionID];
                    const selected = selectedAnswers?.[questionID];

                    const isEnoughAnswered =
                      question?.Type === "multiple-choice"
                        ? !!selected
                        : Array.isArray(selected) &&
                          selected.length ===
                            (question?.Type === "listening-questions-group"
                              ? question?.GroupContent?.listContent?.length
                              : question?.AnswerContent?.leftItems?.length);

                    const isAnswered =
                      selectedAnswers.hasOwnProperty(questionID) &&
                      isEnoughAnswered;

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
