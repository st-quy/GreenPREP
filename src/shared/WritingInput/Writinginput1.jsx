import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const WritingInput = () => {
  const [currentMessage, setCurrentMessage] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentMessage.trim()) {
        setCurrentMessage('');
      }
    }
  };  

  return (
    <div className="w-full max-w-[795px]">
      <TextArea
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your answer here"   
        autoSize={{ minRows: 1 }}
        className="w-full min-h-[57px] rounded-[6px] resize-none p-3
          font-inter text-base font-normal leading-6
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-200
          placeholder:font-inter placeholder:text-base placeholder:font-normal placeholder:leading-6"
        style={{
          minHeight: '57px',
          height: '57px'
        }}
      />
    </div>
  );
};

export default WritingInput;
