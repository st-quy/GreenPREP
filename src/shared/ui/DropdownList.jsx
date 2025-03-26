import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownList = ({
  options,
  selectedValue,
  onChange,
  selectClassName = "",
  placeholder = "Select option",
}) => {
  return (
    <Select
      value={selectedValue || undefined}
      onChange={onChange}
      className={`inline-block mx-1 h-10 ${selectClassName}`}
      placeholder={placeholder}
      dropdownMatchSelectWidth={false}
    >
      {options.map((option, index) => (
        <Option key={index} value={option}>
          <div className="">{option}</div>
        </Option>
      ))}
    </Select>
  );
};

export default DropdownList;
