import { ReadingIcon } from "@assets/images";

const Header = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#F9F9F9] p-2 pt-2">
      <img
        src={ReadingIcon}
        alt="Reading Icon"
        className="h-auto w-10 sm:w-12 md:w-16 lg:w-[45px] lg:h-[45px] object-contain"
      />
      <div className="text-xl font-bold text-black sm:text-2xl md:text-[40px] lg:text-[40px]">
        Reading Test
      </div>
    </div>
  );
};

export default Header;
