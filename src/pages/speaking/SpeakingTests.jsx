import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [isTestActive, setIsTestActive] = useState(false);
  const [testStatus, setTestStatus] = useState("idle"); // idle, preparing, recording, completed
  const [forceCompleted, setForceCompleted] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [questionsData, setQuestionsData] = useState({});
  const [partFourQuest, setPartFourQuestion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    setTestDuration(partId == "1" ? 30 : partId == "4" ? 120 : 45);
    setPreparationTime(partId == "4" ? 60 : 5);
  }, [partId, questionsId]);

  useEffect(() => {
    if (!result.isPending && result.data) {
      try {
        const parts = result.data.data.Parts;
        if (parts && parts.length > 0) {
          const part = parts[Number(partId) - 1];
          if (part && part.Questions && part.Questions.length > 0) {
            if (partId == "4") {
              setPartFourQuestion(part.Questions);
            } else {
              setQuestionsData(part.Questions[Number(questionsId) - 1]);
            }
            handleStartTest();
            setTestStatus("preparing");
          }
        }
      } catch (error) {
        console.error("Error parsing speaking data:", error);
      }
    }
  }, [result.isPending, partId, questionsId]);

  const handleStartTest = () => {
    setIsTestActive(true);
    setForceCompleted(false);
  };

  const handleRecordingStart = () => {
    setTestStatus("recording");
    setIsRecordingActive(true);
  };

  const handleRecordingComplete = () => {
    setIsTestActive(false);
    setTestStatus("completed");
    setIsRecordingActive(false);
  };

  const handleFinish = () => {
    setForceCompleted(true);
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12">
          <div className="text-blue-600 font-medium mb-2 flex">
            Part {partId}{" "}
            {partId != "4" && (
              <div className="text-black">&nbsp;- Question {questionsId}</div>
            )}
          </div>
          {questionsData && (
            <div>
              <div className="text-gray-800">
                {questionsData?.Content || ""}
              </div>
              {questionsData?.ImageKeys && (
                <img
                  src={questionsData?.ImageKeys || ""}
                  alt="speaking pic"
                  className="w-1/3 pt-8"
                />
              )}
              {partFourQuest && (
                <div className="Flex flex-col">
                  {partFourQuest.map((quest) => (
                    <p key={quest.ID} className="py-1">
                      {quest?.Content || ""}
                    </p>
                  ))}
                </div>
              )}
              {questionsData?.SubContent && (
                <div className="text-gray-800 pt-8">
                  {questionsData?.SubContent || ""}
                </div>
              )}
            </div>
          )}
        </div>

        {!result.isPending && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12 flex flex-col gap-6 md:flex-row justify-between items-center">
            <CountdownIndicator
              duration={testDuration}
              preparationTime={preparationTime}
              onRecordingStart={handleRecordingStart}
              onComplete={handleRecordingComplete}
              size="medium"
              isTestStart={isTestActive}
              forceCompleted={forceCompleted}
            />
            <AudioVisualizer isRecording={isRecordingActive} />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12">
          <p className="font-semibold text-sm">
            Click the 'Finish Recording' button to stop recording.
          </p>
        </div>

        {(testStatus === "recording" || testStatus === "completed") && (
          <div className="flex justify-end">
            <Button
              type="primary"
              className="bg-blue-700 hover:bg-blue-600 rounded-2xl py-4"
              onClick={handleFinish}
            >
              Finish Recording{" "}
              <img src={RecordIcon || "/placeholder.svg"} className="w-4" />
            </Button>
          </div>
        )}
      </div>
      <ConfirmTestSubmissionModal
        visible={isModalOpen}
        onSubmit={handleOnSubmit}
        onCancel={handleCancelModal}
      />
    </>
  );
}
