import React from "react";

export function renderTextWithDropdowns(text) {
  if (!text) return null;

  return text.split("\n").map((line, index) => (
    <p key={index} className="mb-4">
      {line.split(/(\d+\.\s\([^)]*\))/g).map((part, i) => {
        const match = part.match(/\d+\.\s\(([^)]+)\)/);
        if (match) {
          const options = match[1].split("/").map((opt) => opt.trim());
          return (
            <select
              key={i}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mx-2"
            >
              <option>Select answer</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        }
        return part;
      })}
    </p>
  ));
}

const RDropDownList = ({ dataSource }) => {
  return <div>{renderTextWithDropdowns(dataSource.Content)}</div>;
};

export default RDropDownList;
