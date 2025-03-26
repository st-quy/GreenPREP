import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Introduction = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleBeginTest = () => {
    try {
      navigate("test");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-6 sm:py-8 md:py-12">
      {/* Test Structure Card */}
      <Card
        className="mb-4 shadow-sm border border-gray-200 sm:mb-6 rounded-[20px] border-1 sm:p-2 md:p-10"
        style={{ borderRadius: "1rem" }}
      >
        <div>
          <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#3758F9] mb-3 sm:mb-4">
            Test Structure
          </div>
          <Text className="block mb-3 text-[#111928] text-sm sm:text-[18px] sm:mb-4">
            The test consists of 4 parts (Parts 1-4) with a total of 17
            questions, lasting 40 minutes.
          </Text>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 1: </p>
                Information Recognition (13 questions)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 2: </p>
                Information Matching (4 questions)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 3: </p>
                Opinion Matching (4 questions)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 4: </p>
                Inference (4 questions)
              </div>
            </li>
          </ul>
        </div>
      </Card>

      {/* Form Description Card */}
      <Card
        className="mb-6 shadow-sm border border-gray-200 rounded-[20px] border-1 sm:p-2 md:p-10"
        style={{ borderRadius: "1rem" }}
      >
        <div>
          <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#3758F9] mb-2 sm:mb-4">
            Form Description
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Format: </p>
                Listen to dialogues or monologues and answer multiple-choice
                questions.
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Number of Listens: </p>
                Each audio is played twice only, so focus is essential.
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Test Duration: </p>
                The total test time is 40 minutes, distributed across 17
                questions.
              </div>
            </li>
          </ul>
        </div>
      </Card>

      {/* Important Notes Card */}
      <Card
        className="mb-8 shadow-sm border border-gray-200 sm:mb-12 rounded-[20px] border-1 sm:p-2 md:p-10"
        style={{ borderRadius: "1rem" }}
      >
        <div>
          <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#3758F9] mb-2 sm:mb-4">
            Important Notes
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-[18px]">
              Click on the "Play" button to listen to each recording.
            </li>
            <li className="text-sm sm:text-[18px]">
              You can listen to each recording TWO TIMES ONLY.
            </li>
          </ul>
        </div>
      </Card>

      {/* Begin Test Button */}
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={handleBeginTest}
          size="large"
          style={{ borderRadius: "9999px" }}
          className="
              px-4 py-1 sm:px-6 sm:py-3 
              h-auto flex items-center font-medium 
              text-sm sm:text-base 
              transition-colors
              bg-[#3758F9]
            "
        >
          <span>Begin the Test</span>
          <ArrowRightOutlined />
        </Button>
      </div>

      {/* Error Modal for Navigation Failure */}
      <Modal
        title="Navigation Error"
        open={isError}
        onCancel={() => setIsError(false)}
        footer={[
          <Button key="back" onClick={() => setIsError(false)}>
            Go Back
          </Button>,
          <Button key="retry" type="primary" onClick={handleBeginTest}>
            Retry
          </Button>,
        ]}
        className="max-w-[90vw] sm:max-w-md"
      >
        <p className="text-sm sm:text-base">
          Failed to start the test. Please check your connection and try again.
        </p>
      </Modal>
    </div>
  );
};

export default Introduction;
