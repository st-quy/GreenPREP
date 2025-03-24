import { useState, useEffect } from 'react';
import MarkerButton from './MarkerButton';

const MultipleChoiceQuestion = ({
  questionNumber,
  partNumber,
  onAnswerChange,
  onMarkQuestion,
  isMarked = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isMarkedState, setIsMarkedState] = useState(isMarked);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch('https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=multiple-choice');
        const data = await response.json();
        console.log(data);
        if (data && data.Parts && data.Parts.length > 0) {
          const part = data.Parts[0];
          setQuestion(part.Questions[0].Content);
          setOptions(part.Questions[0].AnswerContent[0].options.map(option => ({
            value: option.key,
            label: option.key,
            text: option.value
          })));
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, []);

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value);
    if (onAnswerChange) {
      onAnswerChange(value);
    }
  };

  const handleMarkToggle = () => {
    const newMarkedState = !isMarkedState;
    setIsMarkedState(newMarkedState);
    if (onMarkQuestion) {
      onMarkQuestion(newMarkedState);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        {/* Question Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-600">
            Part {partNumber} - Question {questionNumber}
          </h2>
          <MarkerButton onClick={handleMarkToggle} marked={isMarkedState} />
        </div>

        {/* Question Text */}
        <p className="text-gray-800 mb-4">{question}</p>
        <p className="text-gray-600 mb-4">Choose only 1 answer:</p>

        {/* Answer Options */}
        <div className="space-y-4">
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center ${
                selectedAnswer === option.value
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-100'
              } rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors`}
            >
              <input
                type="radio"
                name="answer"
                value={option.value}
                checked={selectedAnswer === option.value}
                onChange={() => handleAnswerSelect(option.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-800">
                {option.label}. {option.text}
              </span>
            </label>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;