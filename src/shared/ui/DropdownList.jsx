import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownList = ({
  options,
  selectedValue,
  onChange,
  selectClassName = "",
}) => {
  return (
    <Select
      value={selectedValue || undefined}
      onChange={onChange}
      className={`inline-block mx-1 h-10 ${selectClassName}`}
      placeholder="Select option"
    >
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default DropdownList;
