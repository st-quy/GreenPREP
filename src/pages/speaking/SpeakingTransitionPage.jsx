import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import speakingPartData from "./constants/speakingPartData";

/**
 * Data:
 * - speakingPartData: Object containing static information (title, description, caution, nextRoute)
 * for each part of the speaking
 * This data is hard because the BA department requires (if there any requirements change, this page need to be rewrite)
 */

export default function SpeakingTransitionPage() {
  const { partId } = useParams();
  const navigate = useNavigate();

  // Get data
  const part = speakingPartData[partId];

  if (!part) {
    navigate("/homepage");
  }

  // Handle next button (start a test from question 1)
  const handleStart = () => {
    navigate(part.nextRoute);
  };

  return (
    <div className="w-full space-y-4">
      {/* Part 1 Instructions */}
      <div className="bg-white rounded-lg border border-solid border-gray-200 p-10">
        <h2 className="text-blue-600 font-semibold text-lg mb-3">
          {part.title}
        </h2>
        <p className="mb-3">{part.description}</p>
        <p className="font-semibold">
          Click the "Next" button when you're ready to proceed.
        </p>
      </div>

      {/* Caution */}
      {part.caution && (
        <div className="bg-white rounded-lg border border-solid border-gray-200 p-10">
          <h2 className="text-red-600 font-semibold text-lg mb-3">Caution</h2>
          <p>{part.caution}</p>
        </div>
      )}

      {/* Next Button to start*/}
      <div className="flex justify-center md:justify-end mt-6">
        <Button
          type="primary"
          size="large"
          onClick={handleStart}
          shape="round"
          className="bg-blue-600 hover:bg-blue-700 flex items-center"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
