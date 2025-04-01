import React, { useEffect, useState } from "react";
import DropInline from "./DropInline/DropInline";
import DropdownList from "@shared/ui/DropdownList";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingDropdownList = ({ dataSource }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const { updateAnswer, getAnswerData } = useReadingContext();
  const { leftItems, rightItems } = dataSource.AnswerContent;
  useEffect(() => {
    const answerData = getAnswerData();
    if (answerData) {
      const initialAnswers = answerData.reduce((acc, { key, value }) => {
        acc[key] = value; // Sử dụng key là tên đoạn văn
        return acc;
      }, {});
      setUserAnswers(initialAnswers);
    }
  }, []);
  const handleAnswerChange = (index, value) => {
    const key = leftItems?.[index];
    setUserAnswers((prev) => ({ ...prev, [key]: value }));

    updateAnswer(key, value);
  };

  if (dataSource.AnswerContent.options) {
    return <DropInline data={dataSource} />;
  }
  return (
    <div className="text-sm md:text-base">
      {dataSource.AnswerContent.content && (
        <div className="mb-6">
          {dataSource.AnswerContent.content.split("\n").map((line, index) => {
            if (!line.includes(":")) {
              return (
                <p key={index} className="text-black">
                  {line}
                </p>
              );
            }

            const parts = line.split(":");
            return (
              <p key={index} className="text-black my-2">
                <span className="font-bold text-black underline">
                  {parts[0]}
                </span>
                :<span className="text-black">{parts.slice(1).join(":")}</span>
              </p>
            );
          })}
        </div>
      )}

      {leftItems.map((question, index) => (
        <div key={index} className="flex items-center my-4 justify-between">
          <label className="text-black">{question}</label>

          <DropdownList
            options={rightItems || []}
            selectedValue={userAnswers[question] || ""}
            onChange={(value) => handleAnswerChange(index, value)}
            selectClassName="min-w-[169px]"
          />
        </div>
      ))}
    </div>
  );
};

export default ReadingDropdownList;
