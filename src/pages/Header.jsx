const Header = () => {
  return (
    <div className="w-full px-4 sm:py-3 sm:px-6 md:px-[47px] py-2 md:py-4 shadow-md relative box-border">
      <div className="flex items-center w-full">
        <div className="flex items-center">
          <img
            src="/assets/images/Logo.png"
            className="w-30 h-8 sm:w-40 sm:h-9 md:w-48 md:h-10 object-cover py-2 px-2 sm:py-3 sm:px-3 md:py-4 md:px-4"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
