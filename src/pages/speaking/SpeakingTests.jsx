import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { RecordIcon } from "@assets/images";
import { CountdownIndicator } from "@features/speaking/ui/CountdownIndicator";
import { useQuery } from "@tanstack/react-query";
import { SpeakingApi } from "@features/speaking/api";
import AudioVisualizer from "@features/speaking/ui/AudioVisualizer";

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
  const result = useQuery({
    queryKey: ["speakingData"],
    queryFn: () => SpeakingApi.getSpeaking(),
  });
  const [questionsData, setQuestionsData] = useState({});

  useEffect(() => {
    if (!result.isPending && result.data) {
      // console.log(result.data);
      const parsedata =
        result.data.data.Parts[Number(partId) - 1].Questions[
          Number(questionsId) - 1
        ];
      console.log(parsedata);
      if (parsedata) {
        setQuestionsData(parsedata);
        handleStartTest();
        setTestStatus("preparing");
      }
    }
  }, [result.isPending]);

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

  const handleSubmit = () => {
    setForceCompleted(true);
  };

  if (Number(partId) > 4 || Number(questionsId) > 3) {
    navigate("/session/speaking");
  }

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12">
        <div className="text-blue-600 font-medium mb-2 flex">
          Part {partId}{" "}
          <div className="text-black">&nbsp;- Question {questionsId}</div>
        </div>
        {questionsData && (
          <div className="text-gray-800">{questionsData.Content}</div>
        )}
      </div>

      {!result.isPending && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12 flex justify-between items-center">
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
            onClick={handleSubmit}
          >
            Finish Recording <img src={RecordIcon} className="w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
