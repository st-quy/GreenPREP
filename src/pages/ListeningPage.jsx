import React from "react";

const ListeningPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex py-7 items-center mb-6">
          <div className="mr-3">
            <img
              src="/src/assets/Images/listeningIcon.png"
              alt="listening icon"
              className="w-20 h-20 object-cover"
            />
          </div>
          <h1 className="text-3xl pl-5 font-bold">Listening Test</h1>
        </div>

        {/* Test Structure Section */}
        <div className="mb-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#4361ee] mb-4">
            Test Structure
          </h2>
          <p className="mb-4 text-[15px]">
            The test consists of 4 parts (Parts 1-4) with a total of 17
            questions, lasting 40 minutes.
          </p>
          <ul className="space-y-1.5 text-[15px]">
            <li>Part 1: Information Recognition (13 questions)</li>
            <li>Part 2: Information Matching (4 questions)</li>
            <li>Part 3: Opinion Matching (4 questions)</li>
            <li>Part 4: Inference (4 questions)</li>
          </ul>
        </div>

        {/* Form Description Section */}
        <div className="mb-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#4361ee] mb-4">
            Form Description
          </h2>
          <ul className="space-y-2 text-[15px]">
            <li>
              <span className="font-medium">Format: </span>
              Listen to dialogues or monologues and answer multiple-choice
              questions.
            </li>
            <li>
              <span className="font-medium">Number of Listens: </span>
              Each audio is played twice only, so focus is essential.
            </li>
            <li>
              <span className="font-medium">Test Duration: </span>
              The total test time is 40 minutes, distributed across 17
              questions.
            </li>
          </ul>
        </div>

        {/* Important Notes Section */}
        <div className="mb-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#4361ee] mb-4">
            Important Notes
          </h2>
          <ul className="space-y-2 text-[15px]">
            <li>Click on the "Play" button to listen to each recording.</li>
            <li>You can listen to each recording TWO TIMES ONLY.</li>
          </ul>
        </div>

        {/* Begin Test Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-[#4361ee] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#3651d4] transition-colors text-sm">
            Begin the Test
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;
