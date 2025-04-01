import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect } from "react";
import { useFullScreenContext } from "@app/providers/FullScreenProvider";
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  const navigate = useNavigate();
  // const { startTestInFullScreen } = useFullScreenContext();

  // useEffect(() => {
  //   startTestInFullScreen();
  // }, []);
  return (
    <div>
      <Card className="mb-2 shadow-sm p-8">
        <h2 className="text-2xl font-medium text-blue-600 mb-1">
          Test Structure
        </h2>
        <p className="text-lg mb-1">
          The test consists of 4 parts with different types of questions.
        </p>

        <ul className="list-disc pl-4 text-lg">
          <li>
            <strong>Part 1:</strong> 3 questions.
          </li>
          <li>
            <strong>Part 2:</strong> 3 questions.
          </li>
          <li>
            <strong>Part 3:</strong> 3 questions.
          </li>
          <li>
            <strong>Part 4:</strong> 3 questions.
          </li>
        </ul>
      </Card>

      <Card className="mb-2 shadow-sm p-8">
        <h2 className="text-2xl font-medium text-blue-600 mb-1">
          Form Description
        </h2>

        <ul className="list-disc pl-4 text-lg">
          <li>
            <strong>Format:</strong> Responses are recorded.
          </li>
          <li>
            <strong>Time Limit:</strong> Each question has a fixed time.
          </li>
        </ul>
      </Card>

      <Card className="mb-2 shadow-sm p-8">
        <h2 className="text-2xl font-medium text-blue-600 mb-1">
          Important Notes
        </h2>

        <ul className="list-disc pl-4 text-lg">
          <li>Read the questions carefully to avoid going off-topic.</li>
          <li>
            Provide at least a simple response—do not leave any answers blank.
          </li>
          <li>Keep answers concise to finish within the given time.</li>
        </ul>
      </Card>

      <div className="flex justify-end mt-6 pb-5">
        <Button
          type="primary"
          size="middle"
          shape="round"
          className="!text-base bg-[#3758F9] hover:bg-blue-700 flex items-center !p-6"
          onClick={() => navigate("test/1/question/1")}
        >
          Begin The Test <ArrowRightOutlined className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Introduction;
