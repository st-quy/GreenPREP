import { useEffect, useState, useCallback } from "react";
import { Progress, Typography } from "antd";
import PropTypes from "prop-types";

const { Text } = Typography;

export const CountdownIndicator = ({
  duration = 30,
  preparationTime = 5,
  onRecordingStart = () => {},
  onComplete = () => {},
  className = "",
  size = "medium",
  isTestStart = false,
  forceCompleted = false,
}) => {
  // States for timer
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isPreparationPhase, setIsPreparationPhase] = useState(false);
  const [preparationTimeRemaining, setPreparationTimeRemaining] =
    useState(preparationTime);
  const [isRecording, setIsRecording] = useState(false);

  // Calculate percentage of time remaining
  const percentRemaining = (timeRemaining / duration) * 100;

  // Determine the visual state based on time remaining
  const getVisualState = () => {
    if (percentRemaining > 25) return "normal";
    if (percentRemaining > 10) return "warning";
    return "critical";
  };

  const visualState = getVisualState();

  // Get stroke color based on visual state
  const getStrokeColor = () => {
    switch (visualState) {
      case "normal":
        return {
          "0%": "#52c41a",
          "100%": "#95de64",
        };
      case "warning":
        return {
          "0%": "#faad14",
          "100%": "#ffc53d",
        };
      case "critical":
        return {
          "0%": "#f5222d",
          "100%": "#ff7875",
        };
      default:
        return {
          "0%": "#52c41a",
          "100%": "#95de64",
        };
    }
  };

  // Get size based on prop
  const getSize = () => {
    switch (size) {
      case "small":
        return 80;
      case "medium":
        return 120;
      case "large":
        return 160;
      default:
        return 120;
    }
  };

  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsPreparationPhase(false);
    setPreparationTimeRemaining(preparationTime);
    setIsRecording(false);
  }, [duration]);

  // Start timer with preparation phase
  const startTimer = useCallback(() => {
    resetTimer();
    setIsPreparationPhase(true);
  }, [resetTimer]);

  // Handle preparation phase completion
  const startMainTimer = useCallback(() => {
    setIsPreparationPhase(false);
    setIsRunning(true);
    setIsRecording(true);
    onRecordingStart();
  }, [onRecordingStart]);

  // Handle timer completion
  const completeTimer = useCallback(() => {
    setIsRunning(false);
    setIsRecording(false);
    onComplete();
  }, [onComplete]);

  // Auto-start timer if enabled
  useEffect(() => {
    if (isTestStart) {
      startTimer();
    }
  }, [isTestStart, startTimer]);

  // Watch for forceCompleted prop changes
  useEffect(() => {
    if (forceCompleted && isRunning) {
      setTimeRemaining(0);
      completeTimer();
    }
  }, [forceCompleted, isRunning, completeTimer]);

  // Preparation phase countdown
  useEffect(() => {
    let interval;

    if (isPreparationPhase && preparationTimeRemaining > 0) {
      interval = setInterval(() => {
        setPreparationTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            startMainTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPreparationPhase, preparationTimeRemaining, startMainTimer]);

  // Main timer countdown
  useEffect(() => {
    let interval;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0.1) {
            clearInterval(interval);
            completeTimer();
            return 0;
          }
          return Math.max(prev - 0.1, 0);
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, completeTimer]);

  // Set pulsing animation for final 5 seconds
  useEffect(() => {
    if (isRunning && timeRemaining <= 5 && timeRemaining > 0) {
      setIsPulsing(true);
    } else {
      setIsPulsing(false);
    }
  }, [isRunning, timeRemaining]);

  // Keyframes for animations
  const keyframesStyle = `
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 1;
      }
    }
    
    .recording-dot {
      animation: blink 1s infinite;
    }
  `;

  // Get the pulse animation class for the Progress component
  const getPulseClass = () => {
    return isPulsing ? "ant-progress-circle-pulse" : "";
  };

  // Additional styles for the Progress component
  const additionalStyles = `
    .ant-progress-circle-pulse .ant-progress-inner {
      animation: pulse-scale 0.8s infinite alternate;
    }
    
    @keyframes pulse-scale {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.05);
      }
    }
  `;

  // Render preparation countdown
  if (isPreparationPhase) {
    return (
      <div
        className={["transition-all duration-300", className]
          .filter(Boolean)
          .join(" ")}
      >
        <style>{keyframesStyle}</style>
        <style>{additionalStyles}</style>
        <div className="flex flex-col items-center">
          <Progress
            type="circle"
            percent={(preparationTimeRemaining / preparationTime) * 100}
            format={() => `${preparationTimeRemaining}`}
            strokeColor={{
              "0%": "#1677ff",
              "100%": "#69b1ff",
            }}
            size={getSize()}
            strokeWidth={6}
            trailColor="#f0f0f0"
          />
          <Text className="mt-2 text-center font-medium">
            Get ready, read the questions!
          </Text>
        </div>
      </div>
    );
  }

  // Render main timer
  return (
    <div
      className={["transition-all duration-300", className]
        .filter(Boolean)
        .join(" ")}
    >
      <style>{keyframesStyle}</style>
      <style>{additionalStyles}</style>
      <div className="flex flex-col items-center">
        <Progress
          type="circle"
          percent={percentRemaining}
          className={getPulseClass()}
          format={() => (
            <span
              style={{
                fontSize:
                  size === "small"
                    ? "16px"
                    : size === "medium"
                      ? "24px"
                      : "32px",
                fontWeight: isPulsing ? "bold" : "normal",
              }}
            >
              {Math.ceil(timeRemaining)}s
            </span>
          )}
          strokeColor={getStrokeColor()}
          size={getSize()}
          strokeWidth={6}
          trailColor="#f0f0f0"
        />

        {isRecording && (
          <div className="mt-3 flex items-center bg-red-50 px-3 py-1 rounded-full border border-red-200">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 recording-dot" />
            <Text className="text-red-500 font-medium">Recording</Text>
          </div>
        )}
      </div>
    </div>
  );
};

CountdownIndicator.propTypes = {
  duration: PropTypes.number,
  preparationTime: PropTypes.number,
  onRecordingStart: PropTypes.func,
  onComplete: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isTestStart: PropTypes.bool,
  forceCompleted: PropTypes.bool,
};

// how to use
// const [testDuration, setTestDuration] = useState(30);
// const [preparationTime, setPreparationTime] = useState(5);
// const [isTestActive, setIsTestActive] = useState(false);
// const [testStatus, setTestStatus] = useState("idle"); // idle, preparing, recording, completed
// const [forceCompleted, setForceCompleted] = useState(false);

// useEffect(() => {
//   handleStartTest();
//   setTestStatus("preparing");
// }, []);

// const handleStartTest = () => {
//   setIsTestActive(true);
//   setForceCompleted(false);
// };

// const handleRecordingStart = () => {
//   setTestStatus("recording");
//   console.log("Recording started");
// };

// const handleRecordingComplete = () => {
//   setIsTestActive(false);
//   setTestStatus("completed");
//   console.log("Recording completed");
// };

// const handleSubmit = () => {
//   setForceCompleted(true);
// };

// <CountdownIndicator
//   duration={testDuration}
//   preparationTime={preparationTime}
//   onRecordingStart={handleRecordingStart}
//   onComplete={handleRecordingComplete}
//   size="medium"
//   isTestStart={isTestActive}
//   forceCompleted={forceCompleted}
// />

// <Button type="primary" onClick={handleSubmit}>
//   Submit Answer
// </Button>
