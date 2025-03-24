import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { RecordIcon } from "@assets/images";
import { CountdownIndicator } from "@features/speaking/ui/CountdownIndicator";
import { useQuery } from "@tanstack/react-query";
import { SpeakingApi } from "@features/speaking/api";

export default function SpeakingTests() {
  const { partId, questionsId } = useParams();
  const [testDuration, setTestDuration] = useState(
    partId == "1" ? 30 : partId == "4" ? 120 : 45
  );
  const [preparationTime, setPreparationTime] = useState(
    partId == "4" ? 60 : 5
  );
  const [isTestActive, setIsTestActive] = useState(false);
  const [testStatus, setTestStatus] = useState("idle"); // idle, preparing, recording, completed
  const [forceCompleted, setForceCompleted] = useState(false);
  // const result = useQuery({
  //   queryKey: ["speakingData"],
  //   queryFn: () => SpeakingApi.getSpeaking(),
  // });

  useEffect(() => {
    handleStartTest();
    setTestStatus("preparing");
  }, []);

  const handleStartTest = () => {
    setIsTestActive(true);
    setForceCompleted(false);
  };

  const handleRecordingStart = () => {
    setTestStatus("recording");
  };

  const handleRecordingComplete = () => {
    setIsTestActive(false);
    setTestStatus("completed");
  };

  const handleSubmit = () => {
    setForceCompleted(true);
  };

  return (
    <div className="w-full space-y-4">
      {/* Question card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12">
        <div className="text-blue-600 font-medium mb-2 flex items-center">
          Part {partId}{" "}
          {questionsId && (
            <div className="text-black">&nbsp;- Question {questionsId}</div>
          )}
        </div>
        <div className="text-gray-800">Please tell me about your family.</div>
      </div>

      {/* Recording interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12 flex">
        <CountdownIndicator
          duration={testDuration}
          preparationTime={preparationTime}
          onRecordingStart={handleRecordingStart}
          onComplete={handleRecordingComplete}
          size="medium"
          isTestStart={isTestActive}
          forceCompleted={forceCompleted}
        />
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-8 px-12">
        <p className="font-semibold text-sm">
          Click the 'Finish Recording' button to stop recording.
        </p>
      </div>

      {/* Finish button */}
      <div className="flex justify-end">
        <Button
          type="primary"
          className="bg-blue-700 hover:bg-blue-600 rounded-2xl py-4"
          onClick={handleSubmit}
        >
          Finish Recording <img src={RecordIcon} className="w-4" />
        </Button>
      </div>
    </div>
  );
}
