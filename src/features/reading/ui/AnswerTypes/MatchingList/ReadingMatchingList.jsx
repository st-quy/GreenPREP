import { useEffect, useState } from "react";
import DropdownList from "@shared/ui/DropdownList";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingMatchingList = ({ dataSource }) => {
  const [selectedHeadings, setSelectedHeadings] = useState({});
  const [isMarked, setIsMarked] = useState(false);
  const { updateAnswer, getAnswerData } = useReadingContext();
  // Check if data is valid
  if (!dataSource || !dataSource.AnswerContent) {
    return <div>No data available</div>;
  }

  const { leftItems, rightItems } = dataSource.AnswerContent;
  useEffect(() => {
    const answerData = getAnswerData();
    if (answerData) {
      const initialAnswers = answerData.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});
      setSelectedHeadings(initialAnswers);
    }
  }, []);
  const handleSelectChange = (index, value) => {
    const key = leftItems?.[index];
    if (!key) {
      return;
    }

    setSelectedHeadings((prev) => ({ ...prev, [key]: value }));
    updateAnswer(key, value);
  };

  // Extract paragraphs from content
  const paragraphs = dataSource.Content.split("\n")
    .filter((line) => line.trim().startsWith("Paragraph"))
    .map((line) => line.replace(/^Paragraph \d+ - /, "").trim());

  const toggleMarked = () => {
    setIsMarked(!isMarked);
  };

  // Extract title from content
  const title = dataSource.Content.split("\n")[0];

  return (
    <div className=" bg-white rounded-lg">
      <h3 className="text-[18px] text-[#111928] font-bold py-6 ">{title}</h3>

      {leftItems.map((item, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center mb-2">
            <p className="text-[18px] font-medium text-[#111928] underline">
              {item}
            </p>
            <div className="text-[18px] text-[#111928] ml-4 w-64">
              <DropdownList
                options={rightItems}
                selectedValue={selectedHeadings[item] || ""}
                onChange={(value) => handleSelectChange(index, value)}
                selectClassName="min-w-[250px]"
              />
            </div>
          </div>
          <p className="text-[#111928] text-justify text-[18px]">
            {paragraphs[index]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReadingMatchingList;
