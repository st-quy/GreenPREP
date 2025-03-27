import { ListenIcon } from "@assets/images";
import React from "react";

const Header = () => {
  return (
    <div className="flex my-10 gap-3 items-center sm:gap-4 bg-[#F9F9F9]">
      <img
        src={ListenIcon}
        alt="listening icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain "
      />
      <div className="text-4xl font-bold">Listening Test</div>
    </div>
  );
};

export default Header;
