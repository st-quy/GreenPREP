import { ArrowRightIcon } from "@assets/icons";
import { GrammarIcon } from "@assets/images";
import React from "react";

const GrammarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] xl:max-w-[1200px] lg:max-w-[992px] md:max-w-[768px] sm:max-w-full mx-auto px-3 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#4361ee] rounded-xl flex items-center justify-center">
            <img src={GrammarIcon} alt="Grammar icon" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Grammar & Vocabulary Test</h1>
        </div>

        <div className="space-y-4">
          {/* Test Structure */}
          <div className="bg-white rounded-2xl px-10 py-6">
            <h2 className="text-[#4361ee] text-lg font-semibold mb-4">
              Test Structure
            </h2>
            <p className="mb-4">
              The test consists of 2 parts (Parts 1-2) with a total of 30
              questions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Part 1: Grammar (25 questions)</li>
              <li>Part 2: Vocabulary (5 questions)</li>
            </ul>
          </div>

          {/* Form Description */}
          <div className="bg-white rounded-2xl px-10 py-6">
            <h2 className="text-[#4361ee] text-lg font-semibold mb-4">
              Form Description
            </h2>
            <ul className="space-y-1">
              <li className="flex gap-1">
                <span className="font-medium">Format:</span>
                <span>Multiple-choice questions.</span>
              </li>
              <li className="flex gap-1">
                <span className="font-medium">Total questions:</span>
                <span>30.</span>
              </li>
              <li className="flex gap-1">
                <span className="font-medium">Test duration:</span>
                <span>25 minutes.</span>
              </li>
            </ul>
          </div>

          {/* Begin Test Button */}
          <div className="flex justify-end mt-4">
            <button className="bg-[#4361ee] text-white px-6 py-2.5 rounded-full inline-flex items-center gap-2 text-sm hover:bg-[#4361ee]/90 transition-all duration-200">
              Begin the Test
              <img src={ArrowRightIcon} alt="Arrow right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;