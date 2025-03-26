import { useRef, useState } from "react";
import { Card, Typography } from "antd";
import OrderingList from "@shared/ui/OrderingList";
const ReadingOrderingList = ({ dataSource }) => {
  const formatAnswersData = (data) => {
    if (data && Array.isArray(data)) {
      return data.map((item, index) => ({
        key: item,
        value: index + 1,
      }));
    }
    return {};
  };
  const answers = useRef(formatAnswersData(dataSource));
  const handleOrderingChange = (data) => {
    answers.current = formatAnswersData(data);
    console.log(JSON.stringify(answers.current));
  };
  return (
    <Card className="w-full mx-auto border-none">
      <div>
        <OrderingList
          options={dataSource.AnswerContent.options}
          onChange={handleOrderingChange}
        />
      </div>
    </Card>
  );
};
export default ReadingOrderingList;
