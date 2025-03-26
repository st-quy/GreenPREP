import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmTestSubmissionModal from '../../shared/ui/Modal/ConfirmTestSubmissionModal';
import CountdownTimer from '../../shared/ui/CountdownTimer';
import SubmissionSuccess from '../../shared/SubmissionSuccess/SubmissionSuccess';
import ButtonNextComponent from '../../shared/ui/button-next-previous/buttonNext';
import ButtonPreviousComponent from '../../shared/ui/button-next-previous/buttonPrevious';
import MarkerButton from '../../shared/ui/MarkerButton';
import DropdownList from '../../shared/ui/DropdownList';
import MultipleChoiceQuestion from '../../shared/ui/MultipleChoiceQuestion';
import { FaBook } from 'react-icons/fa';

const GrammarVocabulary = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load selected answers from localStorage
    const savedAnswers = localStorage.getItem('selectedAnswers');
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const fetchQuestions = async () => {
      try {
        const responseMC = await fetch('https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=multiple-choice&skillName=GRAMMAR AND VOCABULARY');
        if (!responseMC.ok) {
          throw new Error(`Error fetching multiple-choice questions: ${responseMC.status} ${responseMC.statusText}`);
        }
        const dataMC = await responseMC.json();
        
        const responseDL = await fetch('https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=matching&skillName=GRAMMAR AND VOCABULARY');
        if (!responseDL.ok) {
          throw new Error(`Error fetching matching questions: ${responseDL.status} ${responseDL.statusText}`);
        }
        const dataDL = await responseDL.json();

        if (dataMC.Parts && dataMC.Parts.length > 0 && dataMC.Parts[0].Questions) {
          const fetchedQuestions = dataMC.Parts[0].Questions;

          if (dataDL.Parts && dataDL.Parts.length > 0 && dataDL.Parts[0].Questions) {
            const matchingQuestions = dataDL.Parts[0].Questions;
            const combinedQuestions = [
              ...fetchedQuestions.slice(0, 25),
              ...matchingQuestions.slice(0, 5)
            ];
            setQuestions(combinedQuestions);
          } else {
            console.error('Unexpected API response structure for matching:', dataDL);
            setQuestions(fetchedQuestions);
          }
        } else {
          console.error('Unexpected API response structure for multiple-choice:', dataMC);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Save selected answers to localStorage whenever they change
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const handleMarkQuestion = () => {
    const currentQuestion = currentQuestionIndex;
    setMarkedQuestions((prev) => {
      if (prev.includes(currentQuestion)) {
        return prev.filter((index) => index !== currentQuestion);
      }
      return [...prev, currentQuestion];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  const confirmSubmission = () => {
    setIsSubmitted(true);
    setIsModalVisible(false);
  };

  const handleNextTest = () => {
    navigate('/reading-test');
  };

  const handleAnswerSelect = (leftItem, rightItem) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        [leftItem]: rightItem, // Store the selected right item for the left item
      },
    }));
  };

  const renderQuestion = (question) => {
    console.log('Current Question:', question);
    switch (question.Type) {
      case 'dropdown-list':
        const dropdownOptions = question.AnswerContent.options || [];
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2>{question.Content}</h2>
            <div className="bg-gray-50 p-6 rounded-lg w-[1052px] h-[808px] mt-4">
              <div className="flex flex-col items-center justify-center h-full">
                {dropdownOptions.map((answer, index) => (
                  <div key={index} className="flex items-center mb-4 w-full max-w-xs">
                    <label className="block text-center flex-1">{answer.key} =</label>
                    <DropdownList
                      options={answer.value}
                      selectedValue={selectedAnswers[currentQuestionIndex]?.[index] || null}
                      onChange={(value) => {
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [currentQuestionIndex]: {
                            ...prev[currentQuestionIndex],
                            [index]: value,
                          },
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'multiple-choice':
        const options = question.AnswerContent[0]?.options.map(opt => ({
          key: opt.key,
          value: opt.value
        })) || [];
        
        return (
          <MultipleChoiceQuestion
            questionNumber={currentQuestionIndex + 1}
            partNumber={Math.floor(currentQuestionIndex / 5) + 1}
            options={options}
            question={question.Content}
            selectedAnswer={selectedAnswers[currentQuestionIndex] || null}
            handleAnswerSelect={(value) => {
              setSelectedAnswers((prev) => ({
                ...prev,
                [currentQuestionIndex]: value,
              }));
            }}
            isMarked={markedQuestions.includes(currentQuestionIndex)}
            onMarkQuestion={handleMarkQuestion}
          />
        );
      case 'matching':
        const matchingContent = question.AnswerContent[0]; // Assuming there's only one AnswerContent for matching
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2>{question.Content}</h2>
            <p className="text-center">{matchingContent.title}</p>
            <p className="text-center">{matchingContent.subTitle}</p>
            <div className="flex flex-col w-full mt-4">
              {matchingContent.leftItems.map((leftItem, leftIndex) => (
                <div key={leftIndex} className="flex items-center mb-4 w-full max-w-xs justify-between">
                  <span className="flex-1 text-center">{leftItem}</span>
                  <DropdownList
                    options={matchingContent.rightItems}
                    selectedValue={selectedAnswers[currentQuestionIndex]?.[leftItem] || null}
                    onChange={(value) => handleAnswerSelect(leftItem, value)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <p>Unsupported question type.</p>;
    }
  };

  return (
    <div className="bg-[#F9F9F9] full-h-screen flex justify-center items-center">
      <div className="bg-[#F9F9F9] rounded-lg p-6 flex" style={{ marginTop: '217px' }}>
        <div className="w-3/4 pr-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaBook />
            </div>
            <h1 className="text-4xl font-bold ml-4" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '40px', lineHeight: '48px' }}>
              Grammar & Vocabulary Test
            </h1>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-[608px]">
            {isSubmitted ? (
              <SubmissionSuccess onNextTest={handleNextTest} />
            ) : (
              <div>
                {questions.length > 0 ? (
                  <div>
                    {renderQuestion(questions[currentQuestionIndex])}
                    <div className="flex justify-between mt-6">
                      <ButtonPreviousComponent
                        url="#"
                        isFirstQuestion={currentQuestionIndex === 0}
                        onClick={handlePreviousQuestion}
                      />
                      <ButtonNextComponent
                        url="#"
                        isLastQuestion={currentQuestionIndex === questions.length - 1}
                        onSubmitTest={handleSubmit}
                        onClick={handleNextQuestion}
                      />
                    </div>
                  </div>
                ) : ( 
                  <p>Loading questions...</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/4 pl-6">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2">Time Remaining</h2>
            <h2 className="text-lg font-semibold mb-2">Question Navigation</h2>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, i) => (
                <div className="relative" key={i}>
                  <button
                    className={`p-2 rounded-lg border border-gray-300 ${
                      markedQuestions.includes(i) ? 'bg-orange-100' : 'bg-gray-100'
                    } text-blue-600`}
                    style={{
                      width: '50px',
                      height: '51px',
                      borderRadius: '10px',
                      borderWidth: '0.5px',
                    }}
                    onClick={() => setCurrentQuestionIndex(i)}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmTestSubmissionModal
        visible={isModalVisible}
        onSubmit={confirmSubmission}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default GrammarVocabulary;