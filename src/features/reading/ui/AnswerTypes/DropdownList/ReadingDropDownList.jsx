import React, { useState } from "react";
import DropInline from "./DropInline/DropInline";
import DropdownList from "@shared/ui/DropdownList";

const ReadingDropdownList = ({ dataSource }) => {
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (idx, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [idx]: value,
    }));
  };

  if (dataSource.AnswerContent.options) {
    return <DropInline data={dataSource} />;
  }

  return (
    <div className="text-sm md:text-[18px]">
      {dataSource.AnswerContent.content && (
        <div className="mb-6">
          {dataSource.AnswerContent.content.split("\n").map((line, index) => {
            if (!line.includes(":")) {
              return (
                <p key={index} className="text-[#111928]">
                  {line}
                </p>
              );
            }

            const parts = line.split(":");
            return (
              <p key={index} className="text-[#111928] my-2">
                <span className="font-bold text-[#111928] underline">
                  {parts[0]}
                </span>
                :
                <span className="text-[#111928]">
                  {parts.slice(1).join(":")}
                </span>
              </p>
            );
          })}
        </div>
      )}

      {dataSource.AnswerContent.leftItems.map((question, idx) => (
        <div key={idx} className="flex items-center my-4 justify-between">
          <label className="text-[#111928]">{question}</label>

          <DropdownList
            options={dataSource.AnswerContent.rightItems || []}
            selectedValue={userAnswers[idx] || ""}
            onChange={(value) => handleAnswerChange(idx, value)}
            selectClassName="min-w-[169px]"
          />
        </div>
      ))}
    </div>
  );
};

export default ReadingDropdownList;
