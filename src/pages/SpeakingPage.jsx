import { useState } from "react";
import Introduction from "../features/speaking/ui/Introduction.jsx";
import Instruction from "../features/speaking/ui/Instruction.jsx";
import { CommentOutlined } from "@ant-design/icons";
import SpeakingHeader from "@features/speaking/ui/SpeakingHeader.jsx";

const SpeakingPage = () => {
  const [currentStep, setCurrentStep] = useState("introduction");

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white max-h-screen">
      <SpeakingHeader />

      {currentStep === "introduction" && (
        <Introduction onNext={() => setCurrentStep("instruction")} />
      )}
      {currentStep === "instruction" && <Instruction />}
    </div>
  );
};

export default SpeakingPage;
