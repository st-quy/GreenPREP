import React, { useEffect } from 'react';
import MarkerButton from '@shared/ui/MarkerButton';
import { useDispatch } from 'react-redux';
import { setTime } from '@app/providers/reducer/timeSlice';
import WritingInput from '@shared/WritingInput/Writinginput1';
import CountdownTimer from '@shared/ui/CountdownTimer';

const WritingPart1 = ({ content, subContent, questions, partId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set initial time to 50 minutes (3000 seconds)
    dispatch(setTime(3000));
  }, [dispatch]);

  const handleTimeUp = () => {
    alert("Time's up!");
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col">
        {/* Left Side - Questions */}
        <div className="w-full lg:w-full bg-[#FFFFFF] rounded-lg p-6 inline-block " style={{ border: '0.5px solid rgba(0, 0, 0, 0.3)' }}>
          <div className="flex justify-between items-center mb-4">
            <h2><span className="text-[#3758F9]">Part {partId}</span> of 4</h2>
            <MarkerButton onClick={() => console.log('Marked!')} />
          </div>

          <div className="space-y-4">
            <div className="text-lg">{content}</div>
            <div className="text-sm text-gray-600">{subContent}</div>
            
            {/* Questions */}
            <div className="space-y-4 mt-6">
              {questions.map((question) => (
                <div key={question.ID} className="flex flex-col gap-2">
                  <div className="p-4 rounded-lg">
                    <p className="font-medium">{question.Content}</p>
                    {question.SubContent && (
                      <p className="text-sm text-gray-600 mt-1">{question.SubContent}</p>
                    )}
                  </div>
                  <div className="px-4">
                    <WritingInput />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Timer and Navigation */}
      <div className="w-full lg:w-1/3 bg-[#FFFFFF] rounded-lg p-6 inline-block" style={{ border: '0.5px solid rgba(0, 0, 0, 0.3)' }}>
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
    </div>
  );
}

export default WritingPart1;
