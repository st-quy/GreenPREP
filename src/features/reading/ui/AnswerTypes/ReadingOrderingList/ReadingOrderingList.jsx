import { useEffect, useState } from "react";
import { Card } from "antd";
import OrderingList from "@shared/ui/OrderingList";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingOrderingList = ({ dataSource }) => {
  const {
    updateAllCurrentQuestionAnswer,
    getAnswerData,
    currentQuestionIndex,
  } = useReadingContext();

  const formatAnswersData = (data) => {
    return data?.map((item, index) => ({ key: item, value: index + 1 })) || [];
  };

  const reverseFormatAnswersData = (formattedData) => {
    return formattedData?.map((item) => item.key) || [];
  };

  const [option, setOption] = useState([...dataSource.AnswerContent.options]);

  useEffect(() => {
    const answerData = getAnswerData();

    if (answerData?.length) {
      const orderedOptions = reverseFormatAnswersData(answerData).map((key) =>
        dataSource.AnswerContent.options.find((item) => item === key)
      );
      setOption([...orderedOptions]);
    } else {
      setOption([...dataSource.AnswerContent.options]);
    }
  }, [getAnswerData, currentQuestionIndex]);

  const handleOrderingChange = (data) => {
    updateAllCurrentQuestionAnswer(formatAnswersData(data));
  };

  return (
    <Card className="w-full mx-auto border-none">
      {/* Thêm key để ép re-render */}
      <OrderingList
        key={option.join("-")}
        options={option}
        onChange={handleOrderingChange}
      />
    </Card>
  );
};

export default ReadingOrderingList;
