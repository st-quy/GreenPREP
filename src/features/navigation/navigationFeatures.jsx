import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Radio, Space, Typography, Spin } from "antd";
import QuestionNavigation from "./components/questionNavigation";
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
    dispatch(toggleMarkedQuestion(currentQuestion)); // ⚡ Chuyển trạng thái Mark vào Redux
  };

  const handleAnswerSelect = (e) => {
    dispatch(setAnswer({ 
      questionId: currentQuestion, 
      answer: e.target.value 
    }));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testData) {
    return null;
  }

  const currentPart = testData.Parts[0];
  const currentQuestionData = currentPart.Questions[currentQuestion - 1];
  const options = currentQuestionData.AnswerContent[0].options;

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="test-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div className="test-icon" style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: '#4070f4', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px'
        }}>
          <span style={{ color: 'white', fontSize: '24px' }}>📝</span>
        </div>
        <Text strong style={{ fontSize: '24px' }}>{testData.Name}</Text>
      </div>

      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left side - Question content */}
        <div style={{ flex: "1" }}>
          <Card style={{ borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <Text strong style={{ color: '#4070f4' }}>Part {currentPart.Content.split(':')[0]}</Text>
                <Text strong> - Question {currentQuestion}</Text>
              </div>
              <MarkerButton
                marked={markedQuestions.includes(currentQuestion)} // ⚡ Lấy trạng thái từ Redux
                onClick={handleMarkQuestion} // ⚡ Gọi Redux để cập nhật trạng thái
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Text>{currentQuestionData.Content}</Text>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Text type="secondary">Choose only 1 answer:</Text>
            </div>

            <Radio.Group 
              onChange={handleAnswerSelect}
              value={answeredQuestions[currentQuestion]}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {options.map((option) => (
                  <Radio
                    key={option.key}
                    value={option.value}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e8e8e8',
                      borderRadius: '4px',
                      marginRight: 0,
                      marginBottom: '8px',
                      backgroundColor: answeredQuestions[currentQuestion] === option.value ? '#e6f4ff' : 'white'
                    }}
                  >
                    {option.key}. {option.value}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        </div>

        {/* Right side - Navigation */}
        <div style={{ width: "300px" }}>
          <Card style={{ borderRadius: '8px' }}>
            <QuestionNavigation />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NavigationFeature;
