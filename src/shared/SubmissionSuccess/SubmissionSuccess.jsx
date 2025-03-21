import React, { useState } from 'react';
import checkmark from '../../assets/Images/checkmark.png';
import ellipse5 from '../../assets/Images/Ellipse 5.png';
import ellipse6 from '../../assets/Images/Ellipse 6.png';
import ellipse7 from '../../assets/Images/Ellipse 7.png';
import arrowRight from '../../assets/Images/arrow-right.png';

const SubmissionSuccess = ({ onNextTest, testType = 'speaking', isLastTest = false }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState(null);

  const handleNextTest = async () => {
    setIsNavigating(true);
    setError(null);
    
    try {
      await onNextTest();
    } catch (err) {
      setError('Failed to navigate. Please try again.');
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-7xl flex items-center justify-center mx-auto">
      <div className="flex flex-col items-center w-full max-w-xl">
        <div className="w-full flex flex-col items-center px-4 sm:px-0 py-8 sm:py-12">
          <div className="relative flex items-center justify-center h-[100px] sm:h-[120px] md:h-[136px]">
            {/* Outer circle - Ellipse 5 */}
            <img src={ellipse5} alt="" className="absolute w-[100px] sm:w-[120px] md:w-[136px] h-[100px] sm:h-[120px] md:h-[136px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Middle circle - Ellipse 6 */}
            <img src={ellipse6} alt="" className="absolute w-[76px] sm:w-[90px] md:w-[104px] h-[76px] sm:h-[90px] md:h-[104px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Inner circle - Ellipse 7 */}
            <img src={ellipse7} alt="" className="absolute w-[50px] sm:w-[60px] md:w-[70px] h-[50px] sm:h-[60px] md:h-[70px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Checkmark icon */}
            <img src={checkmark} alt="Checkmark" className="relative z-10 w-[35px] sm:w-[42px] md:w-[50px] h-[35px] sm:h-[42px] md:h-[50px]" />
          </div>
          
          <h2 className="font-['Inter'] text-[24px] sm:text-[27px] md:text-[30px] leading-[30px] sm:leading-[34px] md:leading-[38px] font-semibold text-black mt-[30px] sm:mt-[35px] md:mt-[40px] text-center">Test submitted</h2>

          {/* / Cho bài reading test
          <SubmissionSucces testType="reading" onNextTest={handleNextTest} />

          // Cho bài listening test
          <SubmissionSucces testType="Listening" onNextTest={handleNextTest} /> */}

          {/* ///////////////////////////////////////////////////////////////// */}


          {/* Nếu là bài test cuối (writing) thì hãy thêm component này vào */}
            {/* <SubmissionSucces 
              testType="writing" 
              onNextTest={handleBackHome} 
              isLastTest={true} 
            /> */}
          <p className="font-['Inter'] text-[14px] sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[23px] md:leading-[26px] font-semibold text-black text-center mt-[30px] sm:mt-[35px] md:mt-[40px] px-4 sm:px-0">
            {isLastTest ? "Congrats!!! You has finished your exam" : `Your ${testType} test has been submitted successfully!`}
          </p>
          
          {error && (
            <div className="mt-4 text-red-600 text-center font-['Inter'] text-[14px] sm:text-[15px] md:text-[16px]">
{error}
            </div>
          )}

          <button
            onClick={handleNextTest}
            disabled={isNavigating}
            className={`bg-[#2F80ED] text-white w-[160px] sm:w-[176px] md:w-[192px] h-[40px] sm:h-[44px] md:h-[48px] rounded-full flex items-center justify-center transition-all duration-300 mt-[30px] sm:mt-[35px] md:mt-[40px] border-none outline-none
              ${isNavigating ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            <span className="font-['Inter'] text-[14px] sm:text-[15px] md:text-[16px] leading-[20px] sm:leading-[22px] md:leading-[24px]">
              {isNavigating ? 'Loading...' : isLastTest ? 'Back home' : 'Go to next test'}
            </span>
            {!isNavigating && (
              <img src={arrowRight} alt="arrow" className="w-[16px] sm:w-[18px] md:w-[20px] h-[16px] sm:h-[18px] md:h-[20px] ml-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;