import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { RecordIcon } from "@assets/images";
import { CountdownIndicator } from "@features/speaking/ui/CountdownIndicator";
import AudioVisualizer from "@features/speaking/ui/AudioVisualizer";
import ConfirmTestSubmissionModal from "@shared/ui/Modal/ConfirmTestSubmissionModal";
import { useCloudinaryUpload } from "@features/speaking/hooks/useCloudinaryUpload";
import { useCreateAnswer, useGetSpeaking } from "@features/speaking/hooks";
import { useSelector } from "react-redux";

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
  const [testStatus, setTestStatus] = useState("idle"); // idle, reading, preparing, recording, completed, uploading
  const [forceCompleted, setForceCompleted] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [questionsData, setQuestionsData] = useState({});
  const [partFourQuest, setPartFourQuestion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceStartRecording, setForceStartRecording] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [isProcessingFinish, setIsProcessingFinish] = useState(false);

  const testStartedRef = useRef(false);
  const finishButtonTimeoutRef = useRef(null);
  const finishButtonShownRef = useRef(false);
  const recordingStoppedRef = useRef(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const isRecordingActiveRef = useRef(false);

  const {
    uploadToCloudinary,
    isUploading,
    uploadedUrl,
    error: cloudinaryError,
  } = useCloudinaryUpload();

  const { mutateAsync: postAnswers } = useCreateAnswer();

  const result = useGetSpeaking();
  const { participantID, sessionId } = useSelector((state) => state.session);

  useEffect(() => {
    setIsTestActive(false);
    setTestStatus("idle");
    setForceCompleted(false);
    setIsRecordingActive(false);
    setQuestionsData({});
    setPartFourQuestion([]);
    setForceStartRecording(false);
    testStartedRef.current = false;
    setAudioBlob(null);
    setIsProcessingFinish(false);
    recordingStoppedRef.current = false;
    audioChunksRef.current = [];

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
          const currentPartIndex = parts.findIndex((p) =>
            p.Content.toLowerCase().includes(currentPart.toLowerCase())
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

  useEffect(() => {
    if (cloudinaryError) {
      console.error(
        "Cloudinary upload error:",
        cloudinaryError || "Upload failed"
      );
    }
  }, [cloudinaryError]);

  const handleStartTest = () => {
    if (!isTestActive) {
      setIsTestActive(true);
      setForceCompleted(false);
    }
  };

  const handlePreparationStart = () => {
    setTestStatus("preparing");
  };

  const getSupportedMimeType = () => {
    const types = ["audio/mpeg", "audio/mp4", "audio/webm;codecs=opus"];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        if (type.includes("mpeg")) {
          setAudioFormat("mp3");
          return type;
        } else if (type.includes("mp4")) {
          setAudioFormat("mp4");
          return type;
        }
      }
    }

    setAudioFormat("webm");
    return "audio/webm;codecs=opus";
  };

  const handleRecordingStart = async () => {
    if (isRecordingActiveRef.current) {
      return;
    }
    isRecordingActiveRef.current = true;
    setIsRecordingActive(true);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.onstop = null;
    }

    setTestStatus("recording");
    setIsRecordingActive(true);
    recordingStoppedRef.current = false;
    audioChunksRef.current = [];

    if (finishButtonTimeoutRef.current) {
      clearTimeout(finishButtonTimeoutRef.current);
    }

    // Start audio recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = getSupportedMimeType();

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          setAudioBlob(blob);
          recordingStoppedRef.current = true;
        } else {
          console.error("No audio chunks collected during recording");
        }

        mediaRecorder.stream.getTracks().forEach((track) => track.stop());

        mediaRecorder.ondataavailable = null;
        mediaRecorder.onstop = null;
      };

      mediaRecorder.start(1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }

    finishButtonTimeoutRef.current = setTimeout(() => {
      if (!finishButtonShownRef.current) {
        finishButtonShownRef.current = true;
        setShowFinishButton(true);
      }
    }, 10900);
  };

  const handleRecordingComplete = async () => {
    isRecordingActiveRef.current = false;
    setIsRecordingActive(false);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    await waitForAudioBlob();

    if (!audioBlob && audioChunksRef.current.length > 0) {
      const mimeType =
        audioFormat === "mp3"
          ? "audio/mpeg"
          : audioFormat === "mp4"
            ? "audio/mp4"
            : "audio/webm";
      const blob = new Blob(audioChunksRef.current, { type: mimeType });
      setAudioBlob(blob);
    }

    await handleFinish(false);
  };

  const waitForAudioBlob = async () => {
    const maxWaitTime = 2000;
    const startTime = Date.now();

    while (
      !recordingStoppedRef.current &&
      Date.now() - startTime < maxWaitTime
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  useEffect(() => {
    return () => {
      if (finishButtonTimeoutRef.current) {
        clearTimeout(finishButtonTimeoutRef.current);
      }

      // Cleaning up MediaRecorder on component unmount.
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());

        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
      }
    };
  }, []);

  const handleFinish = async (isCompleted) => {
    if (isProcessingFinish) {
      return;
    }

    setIsRecordingActive(false);
    setIsProcessingFinish(true);
    setForceCompleted(isCompleted);
    setTestStatus("uploading");

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());

      await waitForAudioBlob();
    }

    const mimeType =
      audioFormat === "mp3"
        ? "audio/mpeg"
        : audioFormat === "mp4"
          ? "audio/mp4"
          : "audio/webm";

    if (!audioBlob && audioChunksRef.current.length > 0) {
      const blob = new Blob(audioChunksRef.current, { type: mimeType });
      setAudioBlob(blob);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    const currentAudioBlob =
      audioBlob ||
      (audioChunksRef.current.length > 0
        ? new Blob(audioChunksRef.current, { type: mimeType })
        : null);

    try {
      if (currentAudioBlob && currentAudioBlob.size > 0) {
        const options = {
          folder: "speaking_tests",
          tags: [`part_${partId}`, `question_${questionsId}`],
        };

        const cloudinaryUrl = await uploadToCloudinary(
          currentAudioBlob,
          options,
          "mp3"
        );

        if (partId == "4") {
          await postAnswers({
            studentId: "77b5f9cb-73ba-4edd-9c90-998710832c87",
            topicId: "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
            skillName: "SPEAKING",
            sessionParticipantId: "cff9e0a0-d78a-43d5-a747-7fe83343fb30",
            sessionId: "12bd21ef-b6d8-4991-b9ee-69160ce8fd09",
            questions: [
              {
                questionId: partFourQuest[0].ID,
                answerText: null,
                answerAudio: cloudinaryUrl || null,
              },
              {
                questionId: partFourQuest[1].ID,
                answerText: null,
                answerAudio: cloudinaryUrl || null,
              },
              {
                questionId: partFourQuest[2].ID,
                answerText: null,
                answerAudio: cloudinaryUrl || null,
              },
            ],
          });
        } else {
          await postAnswers({
            studentId: "77b5f9cb-73ba-4edd-9c90-998710832c87",
            topicId: "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
            skillName: "SPEAKING",
            sessionParticipantId: "cff9e0a0-d78a-43d5-a747-7fe83343fb30",
            sessionId: "12bd21ef-b6d8-4991-b9ee-69160ce8fd09",
            questions: [
              {
                questionId: questionsData.ID,
                answerText: null,
                answerAudio: cloudinaryUrl || null,
              },
            ],
          });
        }

        navigateToNextQuestion();
      } else {
        console.warn("No audio blob available for upload");
      }
    } catch (error) {
      console.error("Failed to upload recording:", error);
    }
  };

  const navigateToNextQuestion = () => {
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
                : testStatus === "uploading"
                  ? "Please wait while your recording is being uploaded..."
                  : testStatus === "completed"
                    ? "Your recording is complete."
                    : "Prepare your answer based on the question above."}
          </p>
          {testStatus === "recording" &&
            showFinishButton &&
            !isProcessingFinish && (
              <Button
                type="primary"
                className="bg-blue-700 hover:bg-blue-600 rounded-2xl w-full md:w-auto"
                onClick={() => handleFinish(true)}
                disabled={isProcessingFinish}
              >
                Finish Recording{" "}
                <img src={RecordIcon || "/placeholder.svg"} className="w-4" />
              </Button>
            )}
          {isProcessingFinish ||
            (isUploading && (
              <Button
                type="primary"
                className="bg-gray-400 rounded-2xl w-full md:w-auto"
                disabled={true}
              >
                Processing...
              </Button>
            ))}
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
