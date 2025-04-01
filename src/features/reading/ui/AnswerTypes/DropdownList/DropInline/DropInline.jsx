import React, { useEffect, useState } from "react";
import DropdownList from "@shared/ui/DropdownList";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const DropInline = ({ data }) => {
  const { updateAnswer, getAnswerData } = useReadingContext();

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
  const [userAnswer, setUserAnswers] = useState({});
  const handleAnswerChange = (idx, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [idx]: value,
    }));
    const key = idx;
    updateAnswer(key, value);
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
                  selectedValue={userAnswer[currentIndex] || ""}
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
    <div className="text-[18px] lg-w[840px] mt-4">
      {processText(data.Content)}
    </div>
  );
};

export default DropInline;
