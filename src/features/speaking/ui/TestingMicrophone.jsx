import { Button, Card, Flex, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioVisualizer from "@features/speaking/ui/AudioVisualizer";
const { Title, Text } = Typography;

const TestingMicrophone = () => {
  const navigate = useNavigate();
  const [isMicrophone, setIsMicrophone] = useState(false);
  const [statusRecord, setStatusRecord] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioChunksRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [svgColor, setSvgColor] = useState("#003087");
  const handleClickStartMicrophone = async () => {
    setBgColor("#003087");
    setSvgColor("#FFFFFF");
    if (isMicrophone && statusRecord) {
      statusRecord.stop();
      statusRecord.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setIsLoading(false);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setStatusRecord(null);
      };
      return;
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioUrl(null);
        const mediaRecorder = new MediaRecorder(stream);
        setStatusRecord(mediaRecorder);
        setIsMicrophone(true);
        setIsLoading(true);
        audioChunksRef.current = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });
            setIsLoading(false);
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
          };
          setStatusRecord(null);
        }, 5000);
      } catch (error) {
        console.error("false");
      }
    }
  };
  const handleReplayAudio = async () => {
    if (!audioUrl) {
      console.warn("Không có audio để phát lại!");
      return;
    }
    const audio = new Audio(audioUrl);
    audio.load();
    await audio.play();
  };
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setIsMicrophone(true);
      } catch (error) {
        console.error(":x: Lỗi kiểm tra quyền microphone:", error);
      }
    };
    checkMicrophonePermission();
  }, []);
  return (
    <>
      <Flex vertical className="w-full mx-auto gap-[13px] md:gap-[27px]">
        <Card className=" w-full !border-black/15 p-8">
          <Flex vertical className="gap-3 md:gap-4 lg:gap-5">
            <Text className="text-[20px] font-semibold ">
              Before we get started, let's test your microphone.
            </Text>
            <Text className="text-[20px] font-normal ">
              It's important to make sure we can hear you clearly so we can mark
              your response.
            </Text>
          </Flex>
        </Card>
        <Card
          className=" w-full !border-black/15 p-8"
          classNames={{
            body: "flex flex-col gap-4 md:flex-row justify-between items-center",
          }}
        >
          <Flex vertical className="gap-3 md:gap-4 lg:gap-5 " align="center">
            <Flex
              justify="center"
              align="center"
              className="w-full h-[120px] max-w-[120px] border-solid border-[1px] border-[#003087] rounded-full cursor-pointer"
              style={{ backgroundColor: bgColor }}
              onClick={handleClickStartMicrophone}
            >
              <div className={`w-[60px] h-[60px]`}>
                {audioUrl || isLoading ? (
                  <>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.6665 16.6667L19.9998 30.0001H6.6665V50.0001H19.9998L36.6665 63.3334V16.6667Z"
                        stroke={svgColor} // Sử dụng state svgColor
                        fill={svgColor} // Sử dụng state svgColor
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M63.5665 16.4333C69.8155 22.6843 73.326 31.1612 73.326 40C73.326 48.8388 69.8155 57.3158 63.5665 63.5667"
                        stroke={svgColor} // Sử dụng state svgColor
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${isLoading && `opacity-0 animate-[fadeIn_1.1s_ease-in-out_infinite]`}`}
                      />
                      <path
                        d="M51.7998 28.2C54.9243 31.3255 56.6796 35.5639 56.6796 39.9833C56.6796 44.4028 54.9243 48.6412 51.7998 51.7667"
                        stroke={svgColor} // Sử dụng state svgColor
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${isLoading && `opacity-0 animate-[fadeIn_1s_ease-in-out_infinite]`}`}
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 61 61"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.9998 41.8663C34.013 41.8663 36.8379 40.6422 39.0036 38.5706C41.0752 36.4991 42.2051 33.6742 42.2051 30.7552V13.3352C42.2051 7.12047 37.2145 2.12988 30.9998 2.12988C24.7851 2.12988 19.7946 7.12047 19.7946 13.3352V30.661C19.7946 36.8757 24.7851 41.8663 30.9998 41.8663ZM24.0318 13.3352C24.0318 9.47453 27.1392 6.36718 30.9998 6.36718C34.8605 6.36718 37.9678 9.47453 37.9678 13.3352V30.661C37.9678 32.4501 37.3087 34.2392 35.9904 35.5574C34.6722 36.8757 32.8831 37.629 30.9998 37.629C27.1392 37.629 24.0318 34.5216 24.0318 30.661V13.3352Z"
                        fill={svgColor} // Sử dụng state svgColor
                      />
                      <path
                        d="M50.3972 30.1901C50.3972 29.0602 49.4556 28.0244 48.2315 28.0244C47.0074 28.0244 46.0658 28.966 46.0658 30.1901C46.0658 38.5706 39.2861 45.3502 30.9057 45.3502C22.6194 45.3502 15.8398 38.5706 15.8398 30.2843C15.8398 29.1544 14.8981 28.1186 13.674 28.1186C12.4499 28.1186 11.5083 29.0602 11.5083 30.2843C11.5083 40.2655 19.0413 48.4576 28.74 49.4934V54.8606H22.9019C21.772 54.8606 20.7362 55.8022 20.7362 57.0263C20.7362 58.2504 21.6778 59.1921 22.9019 59.1921H38.8153C39.9453 59.1921 40.981 58.2504 40.981 57.0263C40.981 55.8022 40.0394 54.8606 38.8153 54.8606H32.9773V49.4934C42.7701 48.4576 50.3972 40.1713 50.3972 30.1901Z"
                        fill={svgColor} // Sử dụng state svgColor
                      />
                    </svg>
                  </>
                )}
              </div>
            </Flex>
            {audioUrl ? (
              <Button
                type="primary"
                size="middle"
                className="bg-white text-[#003087] border-solid border-[1px] border-[#003087] max-w-[185px] rounded-full py-4"
                htmlType="submit"
                onClick={handleReplayAudio}
              >
                Replay Audio
              </Button>
            ) : (
              <Button
                type="primary"
                size="middle"
                className="bg-white text-[#3758F9] border-solid border-[1px] border-[#3758F9] max-w-[185px] rounded-full py-4"
                htmlType="submit"
                onClick={handleClickStartMicrophone}
              >
                {isMicrophone && statusRecord
                  ? "Stop Test Microphone"
                  : "Test Microphone"}
              </Button>
            )}
          </Flex>
          <AudioVisualizer
            isRecording={!audioUrl && isMicrophone && statusRecord}
          />
        </Card>
        {isMicrophone && (
          <>
            <Card
              className=" w-full !border-black/15 p-8"
              classNames={{
                body: "flex justify-between items-center flex-col gap-4 md:flex-row",
              }}
            >
              <Text className="text-[20px] font-bold">
                {`Click the "Start Test" button when you're ready to proceed.`}
              </Text>
              <Button
                type="primary"
                size="middle"
                className="rounded-full bg-[#3658F9] py-3 w-[114px] ml-auto mt-1 !p-6"
                htmlType="submit"
                onClick={() => navigate("/session/speaking")}
              >
                Start Test -&gt;
              </Button>
            </Card>
          </>
        )}
      </Flex>
    </>
  );
};
export default TestingMicrophone;
