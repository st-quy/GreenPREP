import React, { useState } from "react";
import { ArrowRight, EllipseCheckmark } from "@assets/images";

{
  /*
  Example:::
  For listening test:
  <SubmissionSucces testType="listening" onNextTest={handleNextTest} /> 

  For the last test:
  <SubmissionSucces isLastTest ={true} testType="writing" onNextTest={handleNextTest}
*/
}

const SubmissionSuccess = ({
  onNextTest,
  testType = "speaking",
  isLastTest = false,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState(null);

  const handleNextTest = async () => {
    setIsNavigating(true);
    setError(null);

    try {
      await onNextTest();
    } catch (err) {
      setError("Failed to navigate. Please try again.");
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div className="w-full flex flex-col items-center px-4 sm:px-0 py-8 sm:py-12">
          <div className="relative flex items-center justify-center h-[100px] sm:h-[120px] md:h-[136px]">
            <img
              src={EllipseCheckmark}
              alt=""
              className="absolute w-[100px] sm:w-[120px] md:w-[136px] h-[100px] sm:h-[120px] md:h-[136px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <h2 className="text-[24px] sm:text-[27px] md:text-[30px] leading-[30px] sm:leading-[34px] md:leading-[38px] font-semibold text-black mt-[30px] sm:mt-[35px] md:mt-[40px] text-center">
            Test submitted
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[23px] md:leading-[26px] font-semibold text-black text-center mt-[30px] sm:mt-[35px] md:mt-[40px] px-4 sm:px-0">
            {isLastTest
              ? "Congrats!!! You has finished your exam"
              : `Your ${testType} test has been submitted successfully!`}
          </p>

          {error && (
            <div className="mt-4 text-red-600 text-center text-[14px] sm:text-[15px] md:text-[16px]">
              {error}
            </div>
          )}

          <button
            onClick={handleNextTest}
            disabled={isNavigating}
            className={`bg-[#2F80ED] text-white w-[160px] sm:w-[176px] md:w-[192px] h-[40px] sm:h-[44px] md:h-[48px] rounded-full flex items-center justify-center transition-all duration-300 mt-[30px] sm:mt-[35px] md:mt-[40px] border-none outline-none
              ${isNavigating ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            <span className="text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px]">
              {isNavigating
                ? "Loading..."
                : isLastTest
                  ? "Back home"
                  : "Go to next test"}
            </span>
            {!isNavigating && (
              <img
                src={ArrowRight}
                alt="arrow"
                className="w-[16px] sm:w-[18px] md:w-[20px] h-[16px] sm:h-[18px] md:h-[20px] ml-2"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
