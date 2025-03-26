import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Radio, Space, Typography, Spin } from "antd";
import NavigationControl from "./components/navigationControl";
import MarkerButton from "@shared/ui/MarkerButton";
import { 
  toggleMarkedQuestion, 
  selectNavigation, 
  setAnswer,
  fetchTestDataStart,
  fetchTestDataSuccess,
  fetchTestDataFailure 
} from "./navigationSlice";
import { fetchTestData } from "./services/api";

const { Text } = Typography;

const NavigationFeature = () => {
  const dispatch = useDispatch();
  const { 
    currentQuestion, 
    markedQuestions, 
    answeredQuestions, 
    testData,
    loading,
    error 
  } = useSelector(selectNavigation);

  useEffect(() => {
    const loadTestData = async () => {
      dispatch(fetchTestDataStart());
      try {
        const data = await fetchTestData("ef6b69aa-2ec2-4c65-bf48-294fd12e13fc");
        dispatch(fetchTestDataSuccess(data));
      } catch (error) {
        dispatch(fetchTestDataFailure(error.message));
      }
    };
    loadTestData();
  }, [dispatch]);

  const handleMarkQuestion = () => {
    dispatch(toggleMarkedQuestion(currentQuestion)); 
  };

  const handleAnswerSelect = (e) => {
    dispatch(setAnswer({ 
      questionId: currentQuestion, 
      answer: e.target.value 
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!testData) {
    return null;
  }

  const currentPart = testData.Parts[0];
  const currentQuestionData = currentPart.Questions[currentQuestion - 1];
  const options = currentQuestionData.AnswerContent[0].options;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-2xl">📝</span>
        </div>
        <Text strong className="text-2xl">{testData.Name}</Text>
      </div>

      <div className="flex gap-6">
        {/* Left side - Question content */}
        <div className="flex-1">
          <Card className="rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Text strong className="text-blue-500">Part {currentPart.Content.split(':')[0]}</Text>
                <Text strong> - Question {currentQuestion}</Text>
              </div>
              <MarkerButton
                marked={markedQuestions.includes(currentQuestion)}
                onClick={handleMarkQuestion}
              />
            </div>

            <div className="mb-5">
              <Text>{currentQuestionData.Content}</Text>
            </div>

            <div className="mb-5">
              <Text type="secondary">Choose only 1 answer:</Text>
            </div>

            <Radio.Group 
              onChange={handleAnswerSelect}
              value={answeredQuestions[currentQuestion]}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {options.map((option) => (
                  <Radio
                    key={option.key}
                    value={option.value}
                    className={`w-full px-4 py-3 border rounded-md mb-2 transition-colors ${answeredQuestions[currentQuestion] === option.value ? 'bg-blue-100' : 'bg-white'}`}
                  >
                    {option.key}. {option.value}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        </div>

        {/* Right side - Navigation */}
        <div className="w-72">
          <Card className="rounded-lg">
            <NavigationControl/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NavigationFeature;
