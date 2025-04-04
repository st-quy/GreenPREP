import { ReadingIcon } from "@assets/images";

const Header = () => {
  return (
    <div className="flex items-center mt-10 gap-3 sm:gap-4 bg-[#F9F9F9] ">
      <img
        src={ReadingIcon}
        alt="Reading Icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain"
      />
      <div className="text-4xl font-bold">Reading Test</div>
    </div>
  );
};

export default Header;
