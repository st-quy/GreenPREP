import React from 'react';
import Grammaricon from '../assets/Images/Grammaricon.png';

const GrammarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] xl:max-w-[1200px] lg:max-w-[992px] md:max-w-[768px] sm:max-w-full mx-auto px-3 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#4361ee] rounded-xl flex items-center justify-center">
            <img 
              src={Grammaricon}
              alt="Grammar icon" 
              className="w-6 h-6"
            />
          </div>
          <h1 className="text-2xl font-bold">Grammar & Vocabulary Test</h1>
        </div>

        <div className="space-y-4">
          {/* Test Structure */}
          <div className="bg-white rounded-2xl px-10 py-6">
            <h2 className="text-[#4361ee] text-lg font-semibold mb-4">Test Structure</h2>
            <p className="mb-4">The test consists of 2 parts (Parts 1-2) with a total of 30 questions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Part 1: Grammar (25 questions)</li>
              <li>Part 2: Vocabulary (5 questions)</li>
            </ul>
          </div>

          {/* Form Description */}
          <div className="bg-white rounded-2xl px-10 py-6">
            <h2 className="text-[#4361ee] text-lg font-semibold mb-4">Form Description</h2>
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
            <button 
              className="bg-[#4361ee] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm"
            >
              Begin the Test
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;