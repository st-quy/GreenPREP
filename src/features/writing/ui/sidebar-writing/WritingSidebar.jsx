import React from 'react';
import CountdownTimer from '@shared/ui/CountdownTimer';

const WritingSidebar = ({ onTimeUp }) => {
  const handleTimeUp = () => {
    if (onTimeUp) {
      onTimeUp(true); // Pass true to indicate time is up
    }
  };

  return (
    <div 
      className="w-[450px] max-w-full bg-[#FFFFFF] rounded-lg p-6 inline-block shrink-0 lg:w-[450px] md:w-full sm:w-full" 
      style={{ 
        border: '0.5px solid rgba(0, 0, 0, 0.3)',
        height: '925px'
      }}
    >
      <div className="mb-8">
        <div className="flex flex-col mb-4">
          <h3 className="text-lg font-medium mb-2">Time Remaining</h3>
          <div>
            <CountdownTimer onTimeUp={handleTimeUp} />
          </div>
        </div>
        <div className="w-full" style={{ height: '0.5px', backgroundColor: 'rgba(0, 0, 0, 0.3)', margin: '2rem 0' }}></div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Question Navigation</h3>
        <div className="grid grid-cols-4 gap-2">
          <button className="flex items-center justify-center rounded-md border border-blue-300 bg-blue-50 p-2 text-sm relative">
            01
          </button>
          <button className="flex items-center justify-center rounded-md border border-gray-200 p-2 hover:border-blue-600 text-sm">
            02
          </button>
          <button className="flex items-center justify-center rounded-md border border-gray-200 p-2 hover:border-blue-600 text-sm">
            03
          </button>
          <button className="flex items-center justify-center rounded-md border border-gray-200 p-2 hover:border-blue-600 text-sm">
            04
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingSidebar; 