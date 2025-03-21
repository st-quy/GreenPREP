// Import necessary components and hooks from Ant Design and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const IntroReading = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false); // State to manage error modal visibility

  // Function to handle navigation to the first question
  const handleBeginTest = () => {
    try {
      navigate("/question");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsError(true); // Show error modal if navigation fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header section with an icon and test title */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="/src/assets/Images/ReadingIcon.png"
            alt="Reading Icon"
            className="w-20 h-20"
          />
          <Title level={2} className="!text-3xl !font-bold !text-black !m-0">
            Reading Test
          </Title>
        </div>

        {/* Test Structure Card */}
        <Card
          className="!rounded-2xl !mb-6 !shadow-sm !border !border-gray-200"
          bodyStyle={{ padding: "2rem" }}
        >
          <Title
            level={3}
            className="!text-xl !font-semibold !text-blue-600 !mb-4"
          >
            Test Structure
          </Title>
          <Paragraph className="!mb-4 !text-gray-800">
            The test consists of 4 parts (Parts 1-4) with 4 main question types:
          </Paragraph>
          <ul className="space-y-2 text-gray-800 list-none pl-0">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Part 1:
                </Text>{" "}
                Sentence Completion (Fill in the blanks)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Part 2:
                </Text>{" "}
                Text Sequencing (Rearrange sentences in a logical order)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Part 3:
                </Text>{" "}
                Matching Opinions (Match opinions to the correct speaker)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Part 4:
                </Text>{" "}
                Heading Matching (Match headings to paragraphs)
              </span>
            </li>
          </ul>
        </Card>

        {/* Form Description Card */}
        <Card
          className="!rounded-2xl !mb-12 !shadow-sm !border !border-gray-200"
          bodyStyle={{ padding: "2rem" }}
        >
          <Title
            level={3}
            className="!text-xl !font-semibold !text-blue-600 !mb-4"
          >
            Form Description
          </Title>
          <ul className="space-y-2 text-gray-800 list-none pl-0">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Format:
                </Text>{" "}
                Multiple-choice questions.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Total questions:
                </Text>{" "}
                30.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                <Text strong className="!font-medium">
                  Test duration:
                </Text>{" "}
                25 minutes.
              </span>
            </li>
          </ul>
        </Card>

        {/* Begin Test Button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={handleBeginTest}
            size="large"
            className="!bg-blue-600 !border-blue-600 !rounded-full !px-4 !py-2 !h-auto !flex !items-center !font-medium hover:!bg-blue-700 hover:!border-blue-700"
          >
            <span className="mr-2">Begin the Test</span>
            <ArrowRightOutlined />
          </Button>
        </div>
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
      >
        <p>
          Failed to start the test. Please check your connection and try again.
        </p>
      </Modal>
    </div>
  );
};

export default IntroReading;
