import { ArrowRightIcon } from "@assets/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const IntroWriting = () => {
  const navigate = useNavigate();

  const containerStyle = {
    border: "0.5px solid rgba(0, 0, 0, 0.3)",
  };

  const handleBeginTest = () => {
    navigate(`/session/writing/part/1`);
  };

  return (
    <>
    
      <div style={containerStyle} className="bg-white rounded-2xl p-8 mb-4">
        <h2 className="text-[#3758F9] text-xl font-semibold mb-4">
          Test Structure
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <p className="mb-4 text-base">
              The test has four parts and takes up to 50 minutes.
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li className="pl-2">
                <span className="font-bold">Part 1: </span>
                Short answers (1-5 words per answer, total 5 answers)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 2: </span>
                Write in sentences (20-30 words)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 3: </span>
                Write in sentences (30-40 words per answer, total 3 answers)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 4: </span>
                Write an email (50-70 words for part 1, 120-150 words for part
                2)
              </li>
            </ul>
          </div>
          <div className="flex-1 md:max-w-[250px]">
            <p className="mb-4 text-base">Recommended times:</p>
            <ul className="list-disc pl-8 space-y-2">
              <li className="pl-2">
                <span className="font-bold">Part 1: </span>3 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 2: </span>7 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 3: </span>
                10 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 4: </span>
                30 minutes
              </li>
            </ul>
          </div>
        </div>
      </div>

     
      <div style={containerStyle} className="bg-white rounded-2xl p-8 mb-4">
        <h2 className="text-[#3758F9] text-xl font-semibold mb-4">
          Form Description
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li className="pl-2">
            <span className="font-bold">Format: </span>
            11
          </li>
          <li className="pl-2">
            <span className="font-bold">Total questions: </span>
            11
          </li>
          <li className="pl-2">
            <span className="font-bold">Test duration: </span>
            50 minutes
          </li>
        </ul>
      </div>

      
      <div className="flex justify-end mt-4">
        <button 
          onClick={handleBeginTest}
          className="bg-[#3758F9] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2847E8] active:transform active:scale-95 border-none outline-none"
        >
          Begin the Test
          <img src={ArrowRightIcon} alt="arrow" className="h-5 w-5 invert" />
        </button>
      </div>
    </>
  );
};

export default IntroWriting;
