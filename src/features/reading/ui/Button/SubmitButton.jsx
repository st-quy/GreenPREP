import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

const SubmitButton = ({ event }) => {
  return (
    <button
      onClick={event}
      className="h-[48px] w-[114px] rounded-3xl bg-white p-2 text-[#3758F9] border-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
