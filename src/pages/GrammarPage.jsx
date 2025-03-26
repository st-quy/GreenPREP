import { ArrowRightIcon } from "@assets/icons";
import { GrammarIcon } from "@assets/images";
import React from "react";
import { Card } from "antd";

const GrammarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 my-10">
        <div className="w-14 h-14 bg-[#3758F9] rounded-xl flex items-center justify-center">
          <img src={GrammarIcon} alt="Grammar icon" className="w-14 h-14" />
        </div>
        <h1 className="text-[40px] font-bold">Grammar & Vocabulary Test</h1>
      </div>

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
          <button className="bg-[#3758F9] text-white px-6 py-2.5 rounded-full inline-flex items-center gap-2 text-[16px] hover:bg-[#3758F9]/90 transition-all duration-200 border-none outline-none">
            Begin the Test
            <img src={ArrowRightIcon} alt="Arrow right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;
