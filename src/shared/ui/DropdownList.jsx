import React, { useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownList = ({
  options,
  selectedValue,
  onChange,
  selectClassName = "",
  placeholder = "Select answer",
}) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hiệu ứng nền xanh khi hover */
      .custom-dropdown .ant-select-item-option-active,
      .custom-dropdown .ant-select-item-option-selected:hover {
        background-color: #3758F9 !important;
        color: white !important;
      }

      /* Chữ trắng khi hover vào */
      .custom-dropdown .ant-select-item-option-active div,
      .custom-dropdown .ant-select-item-option-selected:hover div {
        color: white !important;
      }

      /* Giữ màu mặc định cho option đã chọn khi không hover */
      .custom-dropdown .ant-select-item-option-selected {
        background-color: transparent !important;
        color: #637381 !important;  /* Đổi thành màu chữ mặc định */
        font-weight: normal !important;
      }

      /* Giữ màu chữ mặc định của option đã chọn */
      .custom-dropdown .ant-select-item-option-selected div {
        color: #637381 !important; /* Đổi thành màu chữ mặc định */
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <Select
      value={selectedValue || undefined}
      onChange={onChange}
      className={`inline-block mx-1 h-10 ${selectClassName}`}
      placeholder={placeholder}
      dropdownMatchSelectWidth={false}
      popupClassName="custom-dropdown"
    >
      {options.map((option, index) => (
        <Option key={index} value={option}>
          <div className="text-[16px] text-[#637381]">{option}</div>
        </Option>
      ))}
    </Select>
  );
};

export default DropdownList;
