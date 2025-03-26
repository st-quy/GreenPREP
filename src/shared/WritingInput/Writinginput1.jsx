import React from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateWritingInput } from '@features/writing/writingredux/actions/writingActions';

const { TextArea } = Input;

const WritingInput = ({ partId, questionId }) => {
  const dispatch = useDispatch();
  
  // Get value from Redux store with safe fallback
  const value = useSelector((state) => {
    // @ts-ignore
    if (!state || !state.writing || !state.writing.inputs) return '';
    // @ts-ignore
    return state.writing.inputs[partId]?.[questionId] || '';
  });

  const handleChange = (e) => {
    dispatch(updateWritingInput(partId, questionId, e.target.value));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };  

  return (
    <div className="w-full max-w-[795px]">
      <TextArea
        value={value}
        onChange={handleChange}
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
