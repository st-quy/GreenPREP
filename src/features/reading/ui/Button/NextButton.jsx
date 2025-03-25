import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

const NextButton = ({ event }) => {
  return (
    <button
      onClick={event}
      className="h-[48px] w-[114px] rounded-3xl bg-[#3758F9] p-2 text-white font-[500] lg:text-[16px] border-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
      <ArrowRightOutlined className="ms-2" />
    </button>
  );
};

export default NextButton;
