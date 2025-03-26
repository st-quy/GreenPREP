import React, { useState } from "react";
import DropdownList from "@shared/ui/DropdownList";

const DropInline = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (idx, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [idx]: value,
    }));
  };

  const processText = (text) => {
    let dropdownIndex = 0;

    return text.split("\n").map((line, lineIndex) => (
      <React.Fragment key={lineIndex}>
        {line.split(/\d+\./).map((segment, index) => {
          const match = segment.match(/\((.*?)\)/);
          if (match) {
            const options = match[1].split("/").map((opt) => opt.trim());
            const currentIndex = dropdownIndex++;

            return (
              <React.Fragment key={index}>
                {segment.replace(match[0], "")}
                <DropdownList
                  options={options}
                  selectedValue={userAnswers[currentIndex] || ""}
                  onChange={(value) => handleAnswerChange(currentIndex, value)}
                  selectClassName="m-[4px] min-w-[169px]"
                />
              </React.Fragment>
            );
          }
          return <React.Fragment key={index}>{segment}</React.Fragment>;
        })}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="text-[18px] lg-w[840px] mt-4">{processText(data.Content)}</div>
  );
};

export default DropInline;
