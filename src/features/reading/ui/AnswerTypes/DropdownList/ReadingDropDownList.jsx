import React from "react";
import DropInline from "./DropInline/DropInline";

const ReadingDropdownList = ({ dataSource }) => {
  if (dataSource.AnswerContent.options) {
    return <DropInline data={dataSource} />;
  }

  return (
    <div>
      <h1>Dropdown Part 3</h1>
    </div>
  );
};

export default ReadingDropdownList;
