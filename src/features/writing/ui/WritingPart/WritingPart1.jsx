import React from 'react';
import MarkerButton from '@shared/ui/MarkerButton';
import WritingInput from '@shared/WritingInput/Writinginput1';

const WritingPart1 = ({ content, subContent, questions, partId }) => {
  return (
    <div className="w-full">
      {/* Questions */}
      <div className="w-full bg-[#FFFFFF] rounded-lg p-6 inline-block" style={{ border: '0.5px solid rgba(0, 0, 0, 0.3)' }}>
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
  );
}

export default WritingPart1;
