const Header = () => {
  return (
    <div className="w-full px-4 sm:py-3 sm:px-6 md:px-[47px] py-2 md:py-4 shadow-md relative box-border">
      <div className="flex items-center w-full">
        <div className="flex items-center">
          <img
            src="/assets/images/Logo.png"
            className="w-32 sm:w-40 md:w-48 lg:w-64 h-auto object-contain py-2 px-2 sm:py-3 sm:px-3 md:py-4 md:px-4 ml-[25px]"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
