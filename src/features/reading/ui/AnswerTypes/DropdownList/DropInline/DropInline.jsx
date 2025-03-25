import React, { useState } from "react";

const DropInline = ({ data }) => {
  const processText = (text) => {
    return text.split(/\d+\./).map((segment, index) => {
      const match = segment.match(/\((.*?)\)/);
      if (match) {
        const options = match[1].split("/").map((opt) => opt.trim());
        return (
          <React.Fragment key={index}>
            {segment.replace(match[0], "")}
            <select className="my-4 bg-[#DFE4EA] border-none lg:h-[48px]">
              <option value="">Select answer</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </React.Fragment>
        );
      }
      return <React.Fragment key={index}>{segment}</React.Fragment>;
    });
  };

  return (
    <div className="text-[18px] lg-w[840px]">{processText(data.Content)}</div>
  );
};

export default DropInline;
