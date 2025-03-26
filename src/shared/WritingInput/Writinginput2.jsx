import React from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateWritingInput } from '@features/writing/writingredux/actions/writingActions';

const { TextArea } = Input;

/**

* 1. Basic usage:
* <WritingInput2 partNumber={2} maxWords={50} />
*
* 2. In case the part has many sentences (eg: Part 4 has 2 sentences):
* <WritingInput2 partNumber={4} subPart={1} maxWords={50} />
* <WritingInput2 partNumber={4} subPart={2} maxWords={150} />
*

* - partNumber: part number (required)
* - maxWords: word limit (default: 150)
* - subPart: sub sentence number in the part  
* - height: height of the input box (default: "188px")
 */

const WritingInput2 = ({ maxWords = 50, partNumber, height = '188px', subPart = 1 }) => {
  const dispatch = useDispatch();
  
  
  const value = useSelector((state) => {
    // @ts-ignore
    const inputs = state?.writing?.inputs;
    if (!inputs) return '';
    const questionId = `part${partNumber}_${subPart}`;
    return inputs[partNumber]?.[questionId] || '';
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const questionId = `part${partNumber}_${subPart}`;
    dispatch(updateWritingInput(partNumber, questionId, newValue));
  };

  
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="w-full max-w-[795px]">
      <TextArea
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your answer here"
        autoSize={true}
        className="w-full rounded-[6px] resize-none bg-[#F9FAFB]
          font-inter text-base font-normal leading-6
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-200
          placeholder:font-inter placeholder:text-base placeholder:font-normal placeholder:leading-6"
        style={{
          minHeight: height
        }}
      />
      <div className={`flex justify-end mt-2 text-sm ${wordCount > maxWords ? 'text-red-500' : 'text-gray-500'}`}>
        Words {wordCount}/{maxWords}
      </div>
    </div>
  );
};

export default WritingInput2;