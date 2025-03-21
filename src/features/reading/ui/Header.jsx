import ReadingIcon from "@assets/Images/ReadingIcon.png";

const Header = () => {
  return (
    <div className="flex items-center mt-10 gap-3 sm:gap-4 bg-[#F9F9F9] ">
      <img
        src={ReadingIcon}
        alt="Reading Icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain"
      />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black m-0">
        Reading Test
      </div>
    </div>
  );
};

export default Header;
