import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card } from "antd";

const Introduction = () => {
  return (
    <div>
      <Card className="mb-2 shadow-sm p-2 sm:p-6">
        <h2 className="text-base font-medium text-blue-600 mb-1">
          Test Structure
        </h2>
        <p className="text-sm mb-1">
          The test consists of 4 parts with different types of questions.
        </p>

        <ul className="list-disc pl-4 text-sm">
          <li>Part 1: 3 questions.</li>
          <li>Part 2: 3 questions.</li>
          <li>Part 3: 3 questions.</li>
          <li>Part 4: 3 questions.</li>
        </ul>
      </Card>

      <Card className="mb-2 shadow-sm p-2 sm:p-6">
        <h2 className="text-base font-medium text-blue-600 mb-1">
          Form Description
        </h2>

        <ul className="list-disc pl-4 text-sm">
          <li>
            <strong>Format:</strong> Responses are recorded.
          </li>
          <li>
            <strong>Time Limit:</strong> Each question has a fixed time.
          </li>
        </ul>
      </Card>

      <Card className="mb-2 shadow-sm p-2 sm:p-6">
        <h2 className="text-base font-medium text-blue-600 mb-1">
          Important Notes
        </h2>

        <ul className="list-disc pl-4 text-sm">
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
          className="bg-blue-600 hover:bg-blue-700 flex items-center"
        >
          Begin The Test <ArrowRightOutlined className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Introduction;
