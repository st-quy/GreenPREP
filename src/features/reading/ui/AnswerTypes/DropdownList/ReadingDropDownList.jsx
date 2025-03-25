import React from "react";

const ReadingDropdownList = ({ dataSource }) => {
  if (dataSource.AnswerContent.options) {
    return <h1>Dropdown Inline</h1>;
  }

  return (
    <div>
      <h1>Dropdown Part 3</h1>
    </div>
  );
};

export default ReadingDropdownList;
