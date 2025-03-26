import React from "react";
import DropInline from "./DropInline/DropInline";
import DropdownList from "@shared/ui/DropdownList";

const ReadingDropdownList = ({ dataSource }) => {
  if (dataSource.AnswerContent.options) {
    return <DropInline data={dataSource} />;
  }

  console.log("dataSource:", dataSource);
  console.log("handleAnswerChange:", dataSource.handleAnswerChange);

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

      {dataSource.AnswerContent.leftItems.map((question, idx) => (
        <div key={idx} className="flex items-center my-4 justify-between">
          <label className="text-black">{question}</label>

          <DropdownList
            options={dataSource.AnswerContent.rightItems || []}
            selectedValue={dataSource.userAnswers?.[idx] || ""}
            onChange={(value) =>
              dataSource.handleAnswerChange
                ? dataSource.handleAnswerChange(idx, value)
                : console.error("handleAnswerChange is not defined")
            }
            selectClassName="min-w-[169px]"
          />
        </div>
      ))}
    </div>
  );
};

export default ReadingDropdownList;
