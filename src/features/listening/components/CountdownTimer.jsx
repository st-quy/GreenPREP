import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime = 40 * 60 }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining <= 0) {
      // Handle time up
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 className="text-base font-medium text-gray-900">Time Remaining</h2>
      <div className="text-[40px] font-bold text-blue-600">
        {formatTime(timeRemaining)}
      </div>
      <div className="h-px bg-gray-200 my-6"></div>
    </div>
  );
};

export default CountdownTimer; 