import { Button, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {/* Test Structure Section */}
      <Card className="mb-4 rounded-2xl p-10 shadow-sm">
        <h2 className="text-lg font-semibold text-[#4361ee] mb-2">
          Test Structure
        </h2>
        <p className="mb-2 text-[15px]">
          The test consists of 4 parts (Parts 1-4) with a total of 17 questions,
          lasting 40 minutes.
        </p>
        <ul className="space-y-0.5 text-[15px] px-4">
          <li>Part 1: Information Recognition (13 questions)</li>
          <li>Part 2: Information Matching (4 questions)</li>
          <li>Part 3: Opinion Matching (4 questions)</li>
          <li>Part 4: Inference (4 questions)</li>
        </ul>
      </Card>

      {/* Form Description Section */}
      <Card className="mb-4 rounded-2xl p-10 shadow-sm">
        <h2 className="text-lg font-semibold text-[#4361ee] mb-2">
          Form Description
        </h2>
        <ul className="space-y-1 text-[15px] px-4">
          <li>
            <span className="font-medium">Format: </span>
            Listen to dialogues or monologues and answer multiple-choice
            questions.
          </li>
          <li>
            <span className="font-medium">Number of Listens: </span>
            Each audio is played twice only, so focus is essential.
          </li>
          <li>
            <span className="font-medium">Test Duration: </span>
            The total test time is 40 minutes, distributed across 17 questions.
          </li>
        </ul>
      </Card>

      {/* Important Notes Section */}
      <Card className="mb-4 rounded-2xl p-10 shadow-sm">
        <h2 className="text-lg font-semibold text-[#4361ee] mb-2">
          Important Notes
        </h2>
        <ul className="space-y-1 text-[15px] px-4">
          <li>Click on the "Play" button to listen to each recording.</li>
          <li>You can listen to each recording TWO TIMES ONLY.</li>
        </ul>
      </Card>

      {/* Begin Test Button */}
      <div className="flex justify-end mt-3">
        <Button
          className="bg-[#4361ee] !text-white px-4 p-6 rounded-full flex items-center gap-2 hover:!bg-[#3651d4] text-sm"
          onClick={() => navigate("test")}
        >
          Begin the Test -&gt;
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
