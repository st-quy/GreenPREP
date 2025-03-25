import { ArrowRightIcon } from "@assets/icons";
import React from "react";

const GrammarPage = () => {
  return (
    <>
      <div className="space-y-4">
        {/* Test Structure */}
        <div className="bg-white rounded-2xl px-10 py-6">
          <h2 className="text-[#3758F9] text-lg font-semibold mb-4">
            Test Structure
          </h2>
          <p className="mb-4">
            The test consists of 2 parts (Parts 1-2) with a total of 30
            questions:
          </p>
          <ul className="list-disc pl-8 space-y-1">
            <li>
              <span className="font-bold">Part 1: </span>Grammar (25 questions)
            </li>
            <li>
              <span className="font-bold">Part 2: </span>Vocabulary (5
              questions)
            </li>
          </ul>
        </div>
        {/* Form Description */}
        <div className="bg-white rounded-2xl px-10 py-6">
          <h2 className="text-[#3758F9] text-lg font-semibold mb-4">
            Form Description
          </h2>
          <ul className="list-disc pl-8 space-y-1">
            <li>
              <span className="font-bold">Format: </span>
              Multiple-choice questions.
            </li>
            <li>
              <span className="font-bold">Total questions: </span>
              30.
            </li>
            <li>
              <span className="font-bold">Test duration: </span>
              25 minutes.
            </li>
          </ul>
        </div>
        {/* Begin Test Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-[#3758F9] text-white px-6 py-2.5 rounded-full inline-flex items-center gap-2 text-sm hover:bg-[#3758F9]/90 transition-all duration-200 border-none outline-none">
            Begin the Test
            <img src={ArrowRightIcon} alt="Arrow right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default GrammarPage;
