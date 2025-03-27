import React, { useEffect, useState, useRef } from "react";
import CountdownTimer from "../../../shared/ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import {
  FlagOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import QuestionMuitipleChoice from "./QuestionMuitipleChoice";
import QuestionDropdownList from "./QuestionDropdownList";
import { useListeningTest } from "../hooks/useListeningTest";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";

const ListeningTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartsID, setCurrentPartsID] = useState(0);
  const [listQuestion, setListQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [markedQuestions, setMarkedQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem("markedQuestions")) || {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [historyListen, setHistoryListen] = useState([]);
  const [currentAudio, setCurrentAudio] = useState("");
  const [totalQuestions, setTotalQuestion] = useState(0);

  const audioRef = useRef(null);

  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: questions } = useListeningTest();

  const handleOnSubmit = () => {
    navigate("/session/listening/submission");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (questions) {
      setCurrentPartsID(0);
      setAudio(questions.Parts[0].Questions[0].AudioKeys);
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
    if (audio) {
      audioRef.current = new Audio(audio);
    }
  }, [audio]);

  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem("markedQuestions", JSON.stringify(markedQuestions));
  }, [markedQuestions]);

  const handleSubmitTest = () => {
    navigate("/session/grammar");
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

  const toggleAudio = (valueTime) => {
    setCurrentAudio(valueTime);
    if (isPlaying) {
      localStorage.setItem(
        "history_listen",
        JSON.stringify(
          historyListen.map((item) =>
            item.key === valueTime
              ? {
                  ...item,
                  value: [valueTime],
                }
              : item
          )
        )
      );
      audioRef.current.pause();
    } else {
      localStorage.setItem(
        "history_listen",
        JSON.stringify([
          ...historyListen,
          {
            key: valueTime,
            value: [],
          },
        ])
      );
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem(
        "history_listen",
        JSON.stringify(
          historyListen.map((item) =>
            item.key === currentAudio
              ? {
                  ...item,
                  value: [currentAudio],
                }
              : item
          )
        )
      );
    }
    setAudio(listQuestion?.[currentQuestionIndex]?.AudioKeys);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setHistoryListen(JSON.parse(localStorage.getItem("history_listen")) || []);
  }, [localStorage.getItem("history_listen")]);

  return (
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
                    handleMarkQuestion(listQuestion?.[currentQuestionIndex].ID)
                  }
                  icon={
                    markedQuestions[listQuestion?.[currentQuestionIndex].ID] ? (
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

              {listQuestion.length > 0 &&
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
        <Card className="p-8">
          <h2 className="mb-2">Listen audio file here:</h2>
          <div className="flex gap-6">
            <Button
              className="!rounded-full"
              type="primary"
              ghost
              icon={
                historyListen.length &&
                historyListen.find(
                  (item) => item.key === `audio-${currentQuestionIndex}-first`
                ) ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )
              }
              onClick={() => toggleAudio(`audio-${currentQuestionIndex}-first`)}
              key={`audio-${currentQuestionIndex}-first`}
              disabled={
                historyListen.length > 0 &&
                historyListen
                  .find(
                    (item) => item.key === `audio-${currentQuestionIndex}-first`
                  )
                  ?.value.includes(`audio-${currentQuestionIndex}-first`)
              }
            >
              {historyListen.length &&
              historyListen.find(
                (item) => item.key === `audio-${currentQuestionIndex}-first`
              )
                ? historyListen
                    .find(
                      (item) =>
                        item.key === `audio-${currentQuestionIndex}-first`
                    )
                    ?.value.includes(`audio-${currentQuestionIndex}-first`)
                  ? ""
                  : "Stop"
                : "Play first time"}
            </Button>
            <Button
              className="!rounded-full"
              type="primary"
              ghost
              icon={
                historyListen.length &&
                historyListen.find(
                  (item) => item.key === `audio-${currentQuestionIndex}-second`
                ) ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )
              }
              onClick={() =>
                toggleAudio(`audio-${currentQuestionIndex}-second`)
              }
              key={`audio-${currentQuestionIndex}-second`}
              disabled={
                (historyListen.length > 0 &&
                  historyListen
                    .find(
                      (item) =>
                        item.key === `audio-${currentQuestionIndex}-second`
                    )
                    ?.value.includes(`audio-${currentQuestionIndex}-second`)) ||
                !historyListen
                  .find(
                    (item) => item.key === `audio-${currentQuestionIndex}-first`
                  )
                  ?.value.includes(`audio-${currentQuestionIndex}-first`)
              }
            >
              {historyListen.length &&
              historyListen.find(
                (item) => item.key === `audio-${currentQuestionIndex}-second`
              )
                ? historyListen
                    .find(
                      (item) =>
                        item.key === `audio-${currentQuestionIndex}-second`
                    )
                    ?.value.includes(`audio-${currentQuestionIndex}-second`)
                  ? ""
                  : "Stop"
                : "Play second time"}
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
            className="bg-blue-600 hover:!bg-blue-700 !text-white p-6 rounded-full text-sm"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next ->"}
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
                  const isAnswered = selectedAnswers.hasOwnProperty(questionID);
                  const isMarked = markedQuestions[questionID];

                  return (
                    <Button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-11 h-11 rounded-xl text-sm font-medium flex items-center justify-center border-1 hover:!border-gray-300  ${isMarked ? "bg-yellow-500 !text-white hover:!bg-yellow-600" : isAnswered ? "bg-green-500 !text-white hover:!bg-green-600" : "bg-gray-50 text-gray-900 hover:bg-gray-100"} ${currentQuestionIndex === index && "bg-[#E1E8FF] hover:!bg-[#d6e0ff] !border-[#4C6AFA] !text-[#4C6AFA]"}`}
                    >
                      {isMarked ? <FlagOutlined /> : index + 1}
                    </Button>
                  );
                }
              )}
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

export default ListeningTest;
