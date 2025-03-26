import { ArrowRightIcon } from "@assets/icons";
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const GrammarPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      <div className="space-y-4">
        {/* Test Structure */}
        <Card className="bg-white rounded-2xl px-10 py-6">
          <h2 className="text-[#3758F9] text-[24px] font-semibold mb-4">
            Test Structure
          </h2>
          <p className="mb-4 text-[18px]">
            The test consists of 2 parts (Parts 1-2) with a total of 30
            questions:
          </p>
          <ul className="list-disc pl-8 space-y-1">
            <li className="text-[18px]">
              <span className="font-bold">Part 1: </span>Grammar (25 questions)
            </li>
            <li className="text-[18px]">
              <span className="font-bold">Part 2: </span>Vocabulary (5
              questions)
            </li>
          </ul>
        </Card>

        {/* Form Description */}
        <Card className="bg-white rounded-2xl px-10 py-6">
          <h2 className="text-[#3758F9] text-[24px] font-semibold mb-4">
            Form Description
          </h2>
          <ul className="list-disc pl-8 space-y-1">
            <li className="text-[18px]">
              <span className="font-bold">Format: </span>
              Multiple-choice questions.
            </li>
            <li className="text-[18px]">
              <span className="font-bold">Total questions: </span>
              30.
            </li>
            <li className="text-[18px]">
              <span className="font-bold">Test duration: </span>
              25 minutes.
            </li>
          </ul>
        </Card>

        {/* Begin Test Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#3758F9] text-white px-6 py-2.5 rounded-full inline-flex items-center gap-2 text-[16px] hover:bg-[#3758F9]/90 transition-all duration-200 border-none outline-none"
            onClick={() => navigate("test")}
          >
            Begin the Test
            <img src={ArrowRightIcon} alt="Arrow right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;
