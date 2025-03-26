import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const IntroReading = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleBeginTest = () => {
    try {
      navigate("/question");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-6 sm:py-8 md:py-12">
      {/* Test Structure Card */}
      <Card className="mb-4 shadow-sm border border-gray-200 sm:mb-6 rounded-[20px]  border-1 sm:p-2 md:p-10">
        <div>
          {/* Responsive padding */}
          <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#3758F9] mb-3 sm:mb-4">
            Test Structure
          </div>
          <Paragraph className="mb-3 text-[#111928] text-sm sm:text-[18px] sm:mb-4">
            The test consists of 4 parts (Parts 1-4) with 4 main question types:
          </Paragraph>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 1: </p> Sentence
                Completion (Fill in the blanks)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 2: </p> Text
                Sequencing (Rearrange sentences in a logical order)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 3: </p> Matching
                Opinions (Match opinions to the correct speaker)
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Part 4: </p> Heading
                Matching (Match headings to paragraphs)
              </div>
            </li>
          </ul>
        </div>
      </Card>

      {/* Form Description Card */}
      <Card className="mb-8 shadow-sm border border-gray-200 sm:mb-12 boder-1 rounded-[20px] sm:p-2 md:p-10">
        <div>
          {/* Responsive padding */}
          <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#3758F9] mb-2 sm:mb-4">
            Form Description
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Format: </p> Drop down,
                Drag & Drop.
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Total questions: </p>
                30.
              </div>
            </li>
            <li className="text-sm sm:text-[18px]">
              <div className="flex">
                <p className="font-bold whitespace-pre">Test duration: </p> 25
                minutes.
              </div>
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

export default IntroReading;
