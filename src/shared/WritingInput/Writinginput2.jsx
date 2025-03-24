import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

/**

* 1. Basic usage:
* <WritingInput2 partNumber={2} maxWords={50} />
*
* 2. In case the part has many sentences (eg: Part 4 has 2 sentences):
* <WritingInput2 partNumber={4} subPart={1} maxWords={50} />
* <WritingInput2 partNumber={4} subPart={2} maxWords={150} />
*
* Props:
* - partNumber: part number (required)
* - maxWords: word limit (default: 150)
* - subPart: sub sentence number in the part
* - height: height of the input box (default: "188px")
 */

const { TextArea } = Input;

const WritingInput2 = ({ maxWords = 50, partNumber , height = '188px', subPart }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentMessage.trim()) {
        setCurrentMessage('');
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentMessage(value);
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  

  return (
    <div className="w-full max-w-[795px]">
      <TextArea
        value={currentMessage}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your answer here" 
        className="w-full rounded-[6px] resize-none bg-[#F9FAFB]
          font-inter text-base font-normal leading-6
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-200
          placeholder:font-inter placeholder:text-base placeholder:font-normal placeholder:leading-6"
        style={{
          height: height
        }}
      />
      <div className={`flex justify-end mt-2 text-sm ${wordCount > maxWords ? 'text-red-500' : 'text-gray-500'}`}>
        Words {wordCount}/{maxWords}
      </div>
    </div>
  );
};

WritingInput2.propTypes = {
  maxWords: PropTypes.number,
  partNumber: PropTypes.number.isRequired,
  height: PropTypes.string,
  subPart: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default WritingInput2;
