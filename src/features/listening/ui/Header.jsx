import { ListenIcon } from "@assets/images";
import React from "react";

const Header = () => {
  return (
    <div className="flex py-7 items-center mb-6">
      <div className="mr-3">
        <img
          src={ListenIcon}
          alt="listening icon"
          className="w-20 h-20 object-cover"
        />
      </div>
      <h1 className="text-3xl pl-5 font-bold">Listening Test</h1>
    </div>
  );
};

export default Header;
