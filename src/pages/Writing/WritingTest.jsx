import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "@shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { Button, Card, Space, Input } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import { useWritingTest } from "@features/writing/hooks";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";
import { useCreateStudentAnswer } from "@features/sessions/hooks";
import { transformData } from "@shared/lib/utils";
import { useSelector } from "react-redux";

const WritingTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [markedQuestions, setMarkedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("markedQuestions")) || {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalQuestions, setTotalQuestion] = useState(0);

  const { data: questions } = useWritingTest();
  const { mutate: submitStudentAnswer } = useCreateStudentAnswer();
  const { participantID, sessionId } = useSelector((state) => state.session);

  const handleOnSubmit = () => {
    submitStudentAnswer({
      studentId: "77b5f9cb-73ba-4edd-9c90-998710832c87",
      topicId: "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
      skillName: "WRITING",
      sessionParticipantId: "cff9e0a0-d78a-43d5-a747-7fe83343fb30",
      questions: transformData(selectedAnswers),
      sessionId: "12bd21ef-b6d8-4991-b9ee-69160ce8fd09",
    });
    localStorage.removeItem("selectedAnswers");
    navigate("/session/writing/submission");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (questions) {
      setTotalQuestion(questions.Parts.length);
    }
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem("markedQuestions", JSON.stringify(markedQuestions));
  }, [markedQuestions]);

  const handleSubmitTest = () => {
    navigate("/");
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
        Math.min(prevIndex + 1, questions.Parts.length - 1)
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
            {questions?.Parts?.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-blue-600 font-bold">
                    {questions.Parts?.[currentQuestionIndex]?.Content}
                  </span>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleMarkQuestion(
                        questions.Parts?.[currentQuestionIndex].ID
                      )
                    }
                    icon={
                      markedQuestions[
                        questions.Parts?.[currentQuestionIndex].ID
                      ] ? (
                        <FlagOutlined color="red" />
                      ) : (
                        <FlagOutlined color="" />
                      )
                    }
                    className={`ml-4 px-3 py-1 text-sm font-medium rounded-xl transition-all duration-200 border-0
                      ${markedQuestions[questions.Parts?.[currentQuestionIndex].ID] ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : "bg-gray-200 !text-black hover:!bg-gray-300"}`}
                  >
                    {markedQuestions[questions.Parts?.[currentQuestionIndex].ID]
                      ? "Marked"
                      : "Mark"}
                  </Button>
                </div>
                <span className="text-gray-500 font-bold">
                  {questions?.Parts?.[currentQuestionIndex]?.SubContent}
                </span>

                <Space direction="vertical" className="w-full">
                  {questions.Parts?.[currentQuestionIndex]?.Questions.map(
                    (item, i) => {
                      const countLimit =
                        questions.Parts?.[
                          currentQuestionIndex
                        ]?.SubContent.match(/\d+/) ||
                        questions.Parts?.[currentQuestionIndex]?.Questions?.[
                          i
                        ].SubContent.match(/\d+/);
                      return (
                        <div key={i}>
                          <div className="my-2 font-semibold">
                            {item.Content}
                          </div>
                          <div className="relative">
                            <Input.TextArea
                              key={`Part${currentQuestionIndex}-${i}`}
                              onChange={(e) => {
                                const text = e.target.value;
                                const words = text
                                  .split(/\s+/)
                                  .filter((word) => word.length > 0);

                                if (words.length > countLimit) {
                                  const limitedText = words
                                    .slice(0, countLimit)
                                    .join(" ");
                                  e.target.value = limitedText;
                                  handleAnswerSelect(item.ID, limitedText);
                                  return;
                                }

                                handleAnswerSelect(item.ID, text);
                                e.target.dataset.count = `${words.length}/${countLimit}`;
                              }}
                              value={selectedAnswers[item.ID] || ""}
                              placeholder={`Type your answer here (maximum ${countLimit} words)`}
                              data-count={`0/${countLimit}`}
                              autoSize
                            />
                            <div className="text-sm text-gray-500 mt-1 text-right">
                              {
                                (selectedAnswers[item.ID] || "")
                                  .split(/\s+/)
                                  .filter((word) => word.length > 0).length
                              }
                              /{countLimit} words
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </Space>
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
                    const questionID = questions.Parts?.[index]?.ID;
                    const isAnswered = questions.Parts?.[
                      index
                    ]?.Questions.every(
                      (question) =>
                        selectedAnswers.hasOwnProperty(question.ID) &&
                        selectedAnswers[question.ID].trim() !== ""
                    );
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

export default WritingTest;
