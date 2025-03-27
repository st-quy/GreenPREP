import { GrammarIcon } from "@assets/images";
import React from "react";

const HeaderGrammar = () => {
  return (
    <div className="flex my-10 gap-3 items-center sm:gap-4 bg-[#F9F9F9]">
      <img
        src={GrammarIcon}
        alt="GrammarIcon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain "
      />
      <div className="text-xl sm:text-2xl md:text-[40px] font-bold text-black m-0">
        Grammar And Vocabulary
      </div>
    </div>
  );
};

export default HeaderGrammar;
