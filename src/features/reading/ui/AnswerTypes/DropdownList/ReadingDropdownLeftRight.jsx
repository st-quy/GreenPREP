import React from 'react'

export function renderMatchingDropdown(answerContent, userAnswers, handleAnswerChange) {
    if (!answerContent || !Array.isArray(answerContent.leftItems) || !Array.isArray(answerContent.rightItems)) {
      return <div className="text-red-500">Dữ liệu chưa sẵn sàng hoặc không hợp lệ...</div>;
    }
  
    return (
      <div className="space-y-4 p-4 border rounded">
        {answerContent.content && (
          <div className="mb-4 p-2 bg-gray-100 rounded">
            {answerContent.content.split("\n").map((line, index) => {
              if (!line.includes(":")) {
                return (
                  <p key={index} className="text-black">
                    {line}
                  </p>
                );
              }
  
              const parts = line.split(":");
              return (
                <p key={index} className="text-black">
                  <span className="font-semibold text-blue-600">{parts[0]}</span>:
                  <span className="text-gray-700">{parts.slice(1).join(":")}</span>
                </p>
              );
            })}
          </div>
        )}
  
        {answerContent.leftItems.map((question, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <label className="text-gray-700">{question}</label>
            <select
              key={idx}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mx-2"
              value={userAnswers?.[idx] || ""}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
            >
              <option value="">Select answer</option>
              {Array.isArray(answerContent.rightItems) && answerContent.rightItems.length > 0
                ? answerContent.rightItems.map((option, i) => (
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
  }
  

  const ReadingDropdownList = ({ dataSource, userAnswers, handleAnswerChange }) => {
    if (!dataSource || !dataSource.AnswerContent) {return <div>Dữ liệu chưa sẵn sàng</div> };
  
    return (
      <div>
        {dataSource.Type === "dropdown-list" && Array.isArray(dataSource.AnswerContent?.options) 
          ? renderTextWithDropdowns(dataSource.Content, dataSource.AnswerContent)
          : renderMatchingDropdown(dataSource.AnswerContent, userAnswers, handleAnswerChange)}
      </div>
    );
  };

export default ReadingDropdownLeftRight
