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
      navigate("reading-test");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-6 sm:py-8 md:py-12 ">
      {/* Test Structure Card */}
      <Card className="mb-4 shadow-sm border border-gray-200 sm:mb-6 rounded-[20px]  border-1 p-2 lg:h-[320px]">
        <div className="p-2 sm:p-6">
          {/* Responsive padding */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-[24px] lg:font-[600] font-semibold text-[#3758F9] mb-3 sm:mb-4">
            Test Structure
          </div>
          <Paragraph className="mb-3 text-[#111928] text-sm sm:text-base sm:mb-4 lg:text-[18px] lg:font-[700]">
            The test consists of 4 parts (Parts 1-4) with 4 main question types:
          </Paragraph>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-base lg:text-[18px]">
              <Text className="font-[700] lg:text-[18px]">Part 1: </Text>
              Sentence Completion (Fill in the blanks)
            </li>
            <li className="text-sm sm:text-base lg:text-[18px] ">
              <Text className="font-[700] lg:text-[18px]">Part 2: </Text>
              Text Sequencing (Rearrange sentences in a logical order)
            </li>
            <li className="text-sm sm:text-base lg:text-[18px] ">
              <Text className="font-[700] lg:text-[18px]">Part 3: </Text>
              Matching Opinions (Match opinions to the correct speaker)
            </li>
            <li className="text-sm sm:text-base lg:text-[18px] ">
              <Text className="font-[700] lg:text-[18px]">Part 4: </Text>
              Heading Matching (Match headings to paragraphs)
            </li>
          </ul>
        </div>
      </Card>

      {/* Form Description Card */}
      <Card className="mb-8 shadow-sm border border-gray-200 sm:mb-12 boder-1 rounded-[20px] p-2 lg:h-[237px">
        <div className="p-2 sm:p-6">
          {/* Responsive padding */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-[24px] lg:font-[600]  font-semibold text-[#3758F9] mb-2 sm:mb-4">
            Form Description
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#111928] sm:space-y-2">
            <li className="text-sm sm:text-base lg:text-[18px]">
              <Text className="font-[700] text-[18px]">Format: </Text>
              Drop down, Drag & Drop.
            </li>
            <li className="text-sm sm:text-base lg:text-[18px]">
              <Text className="font-[700] text-[18px]">Total questions: </Text>
              30.
            </li>
            <li className="text-sm sm:text-base lg:text-[18px]">
              <Text className="font-[700] text-[18px]">Test duration: </Text> 25
              minutes.
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
              px-4 py-1 sm:px-6 sm:py-2 
              h-auto flex items-center 
              text-sm sm:text-base 
              lg:text-[16px]
              transition-colors
              bg-[#3758F9]
            "
        >
          <span className="mr-2">Begin the Test</span>
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
