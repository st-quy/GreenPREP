import { ListenIcon } from "@assets/images";
import React from "react";

const Header = () => {
  return (
    <div className="flex mt-10 gap-3 items-center sm:gap-4 bg-[#F9F9F9]">
      <div>
        <img
          src={ListenIcon}
          alt="listening icon"
          className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain "
        />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black m-0">
        Listening Test
      </h1>
    </div>
  );
};

export default Header;
