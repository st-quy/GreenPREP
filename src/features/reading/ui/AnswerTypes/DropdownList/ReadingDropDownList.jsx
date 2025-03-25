import React from "react";
import DropInline from "./DropInline/DropInline";

const ReadingDropdownList = ({ dataSource }) => {
  if (dataSource.AnswerContent.options) {
    return <DropInline data={dataSource} />;
  }

  console.log(dataSource);

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
                  <span className="font-bold text-black underline">{parts[0]}</span>:
                  <span className="text-black">{parts.slice(1).join(":")}</span>
                </p>
              );
            })}
          </div>
        )}
  
        {dataSource.AnswerContent.leftItems.map((question, idx) => (
          <div key={idx} className="flex items-center my-4 justify-between">
            <label className="text-black">{question}</label>
            <select
              key={idx}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mx-2"
              value={dataSource.userAnswers?.[idx] || ""}
              onChange={(e) => dataSource.handleAnswerChange(idx, e.target.value)}
            >
              <option value="">Select answer</option>
              {Array.isArray(dataSource.AnswerContent.rightItems) && dataSource.AnswerContent.rightItems.length > 0
                ? dataSource.AnswerContent.rightItems.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))
                : <option value="" disabled>No options available</option>}
            </select>
          </div>
        ))}
      </div>
  );
};

export default ReadingDropdownList;
