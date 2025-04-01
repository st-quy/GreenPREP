import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PreviousButton = ({ event, isDisabled }) => {
  return (
    <button
      onClick={event}
      disabled={isDisabled}
      className="h-[48px] w-[114px] rounded-3xl bg-white p-2 text-[#3758F9] font-[500] lg:text-[16px] border-none disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
    >
      <ArrowLeftOutlined className="me-2" />
      Previous
    </button>
  );
};

export default PreviousButton;
