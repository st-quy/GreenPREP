import { ListenIcon } from "@assets/images";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#F9F9F9] mb-6 sm:mb-8">
      <img
        src={ListenIcon}
        alt="Listening Icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain"
      />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black m-0">
        Listening Test
      </div>
    </div>
  );
};

export default Header;
