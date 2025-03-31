import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { RecordIcon } from "@assets/images";
import { CountdownIndicator } from "@features/speaking/ui/CountdownIndicator";
import { useQuery } from "@tanstack/react-query";
import { SpeakingApi } from "@features/speaking/api";
import AudioVisualizer from "@features/speaking/ui/AudioVisualizer";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";

export default function SpeakingTests() {
  const { partId, questionsId } = useParams();
  const navigate = useNavigate();
  const [testDuration, setTestDuration] = useState(
    partId == "1" ? 30 : partId == "4" ? 120 : 45
  );
  const [preparationTime, setPreparationTime] = useState(
    partId == "4" ? 60 : 5
  );
  const [readingTime, setReadingTime] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testStatus, setTestStatus] = useState("idle"); // idle, reading, preparing, recording, completed
  const [forceCompleted, setForceCompleted] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [questionsData, setQuestionsData] = useState({});
  const [partFourQuest, setPartFourQuestion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canStartEarly, setCanStartEarly] = useState(false);
  const [forceStartRecording, setForceStartRecording] = useState(false);
  const testStartedRef = useRef(false);

  const result = useQuery({
    queryKey: ["speakingData"],
    queryFn: () => SpeakingApi.getSpeaking(),
  });

  useEffect(() => {
    setIsTestActive(false);
    setTestStatus("idle");
    setForceCompleted(false);
    setIsRecordingActive(false);
    setQuestionsData({});
    setPartFourQuestion([]);
    setCanStartEarly(false);
    setForceStartRecording(false);
    testStartedRef.current = false;

    setTestDuration(partId == "1" ? 30 : partId == "4" ? 120 : 45);
    setPreparationTime(partId == "4" ? 60 : 5);
    setReadingTime(partId == "4" ? 10 : 0);
  }, [partId, questionsId]);

  useEffect(() => {
    if (!result.isPending && result.data && !testStartedRef.current) {
      try {
        const parts = result.data.data.Parts;
        if (parts && parts.length > 0) {
          const currentPart = `PART ${partId}`;
          const currentPartIndex = parts.findIndex(
            (p) => p.Content == currentPart
          );
          const part = parts[currentPartIndex];
          if (currentPartIndex !== -1) {
            const part = parts[currentPartIndex];
          } else {
            const part = parts[Number(partId) - 1];
          }
          if (part && part.Questions && part.Questions.length > 0) {
            if (partId == "4") {
              setPartFourQuestion(part.Questions);
            } else {
              setQuestionsData(part.Questions[Number(questionsId) - 1]);
            }
            handleStartTest();
            // Set initial status based on whether we have a reading phase
            setTestStatus(partId == "4" ? "reading" : "preparing");
            testStartedRef.current = true; // Mark test as started
          }
        }
      } catch (error) {
        console.error("Error parsing speaking data:", error);
      }
    }
  }, [result.isPending, result.data, partId, questionsId]);

  const handleStartTest = () => {
    if (!isTestActive) {
      setIsTestActive(true);
      setForceCompleted(false);
    }
  };

  const handlePreparationStart = () => {
    // Update test status when preparation phase starts
    setTestStatus("preparing");
    setCanStartEarly(false); // Reset early start flag
  };

  const handleRecordingStart = () => {
    setTestStatus("recording");
    setIsRecordingActive(true);
    setCanStartEarly(false);
  };

  const handleRecordingComplete = () => {
    setIsTestActive(false);
    setTestStatus("completed");
    setIsRecordingActive(false);
    handleFinish(false);
  };

  const handleFinish = (isCompleted) => {
    setForceCompleted(isCompleted);
    setTimeout(() => {
      switch (partId) {
        case "1":
          if (questionsId == "3") {
            navigate("/session/speaking/part/2/introduction");
            break;
          }
          navigate(
            `/session/speaking/test/1/question/${Number(questionsId) + 1}`
          );
          break;
        case "2":
          if (questionsId == "3") {
            navigate("/session/speaking/part/3/introduction");
            break;
          }
          navigate(
            `/session/speaking/test/2/question/${Number(questionsId) + 1}`
          );
          break;
        case "3":
          if (questionsId == "3") {
            navigate("/session/speaking/part/4/introduction");
            break;
          }
          navigate(
            `/session/speaking/test/3/question/${Number(questionsId) + 1}`
          );
          break;
        case "4":
          setIsModalOpen(true);
          break;
        default:
          break;
      }
    }, 100);
  };

  const handleOnSubmit = () => {
    navigate("/session/speaking/submission");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleEarlyStart = () => {
    setForceStartRecording(true);
    handleRecordingStart();
  };

  useEffect(() => {
    if (
      Number(partId) > 4 ||
      Number(questionsId) > 3 ||
      (Number(partId) == 4 && Number(questionsId) > 1)
    ) {
      navigate("/session/speaking");
    }
  }, [partId, questionsId, navigate]);

  const componentKey = `${partId}-${questionsId}`;
  return (
    <>
      <div className="w-full space-y-4" key={componentKey}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 md:py-8 px-4 md:px-12">
          <div className="text-blue-600 font-medium mb-2 flex">
            Part {partId}{" "}
            {partId != "4" && (
              <div className="text-black">&nbsp;- Question {questionsId}</div>
            )}
          </div>
          {questionsData && (
            <div>
              <div className="text-gray-800 text-sm md:text-base">
                {questionsData?.Content || ""}
              </div>
              {questionsData?.ImageKeys?.length > 0 ? (
                <div className="flex items-center pt-3 flex-col md:flex-row gap-4 md:gap-6">
                  {questionsData?.ImageKeys?.map((image, index) => (
                    <img
                      key={index}
                      src={image || ""}
                      alt="speaking pic"
                      className="w-full md:w-1/4"
                    />
                  ))}
                </div>
              ) : null}
              {partFourQuest && (
                <>
                  <div className="flex items-center pt-3 flex-col md:flex-row gap-4 md:gap-6 mb-3 md:mb-5">
                    {partFourQuest[0]?.ImageKeys?.map((image, index) => (
                      <img
                        key={index}
                        src={image || ""}
                        alt="speaking pic"
                        className="w-full md:w-1/3"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {partFourQuest.map((quest) => (
                      <p key={quest.ID} className="py-1 text-sm md:text-base">
                        {quest?.Content || ""}
                      </p>
                    ))}
                  </div>
                </>
              )}
              {questionsData?.SubContent && (
                <div className="text-gray-800 pt-4 md:pt-8 text-sm md:text-base">
                  {questionsData?.SubContent || ""}
                </div>
              )}
            </div>
          )}
        </div>

        {!result.isPending && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 md:py-8 px-4 md:px-12 flex flex-col gap-4 md:flex-row justify-between items-center">
            <CountdownIndicator
              duration={testDuration}
              preparationTime={preparationTime}
              readingTime={readingTime}
              onRecordingStart={handleRecordingStart}
              onComplete={handleRecordingComplete}
              onPreparationStart={handlePreparationStart}
              size="medium"
              isTestStart={isTestActive}
              forceCompleted={forceCompleted}
              onPreparationTimeElapsed={(elapsed) => {
                if (preparationTime > 10 && elapsed >= 10) {
                  setCanStartEarly(true);
                }
              }}
              forceStartRecording={forceStartRecording}
            />
            <AudioVisualizer isRecording={isRecordingActive} />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 md:py-8 px-4 md:px-12 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
          <p className="font-semibold text-xs md:text-sm">
            {testStatus === "reading"
              ? "Read the questions carefully."
              : testStatus === "recording"
                ? "Click the 'Finish Recording' button to stop recording."
                : canStartEarly
                  ? "You can start recording now or wait for the preparation time to finish."
                  : "Prepare your answer based on the question above."}
          </p>
          {(testStatus === "recording" || testStatus === "completed") && (
            <Button
              type="primary"
              className="bg-blue-700 hover:bg-blue-600 rounded-2xl w-full md:w-auto"
              onClick={() => handleFinish(true)}
            >
              Finish Recording{" "}
              <img src={RecordIcon || "/placeholder.svg"} className="w-4" />
            </Button>
          )}
          {testStatus === "preparing" && canStartEarly && (
            <Button
              type="primary"
              className="bg-green-600 hover:bg-green-500 rounded-2xl w-full md:w-auto"
              onClick={handleEarlyStart}
            >
              Start Recording{" "}
              <img src={RecordIcon || "/placeholder.svg"} className="w-4" />
            </Button>
          )}
        </div>
      </div>
      <ConfirmTestSubmissionModal
        visible={isModalOpen}
        onSubmit={handleOnSubmit}
        onCancel={handleCancelModal}
        showCancel={false}
      />
    </>
  );
}
