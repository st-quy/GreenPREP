import { LogoGreen } from "@assets/images";
import ProfileMenu from "@features/auth/ui/components/ProfileMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 sm:py-3 sm:px-6 md:px-[47px] py-2 md:py-4 shadow-md box-border !bg-white">
      <div className="flex items-center w-full justify-between">
        <img
          src={LogoGreen}
          className="w-24 xs:w-28 sm:w-28 md:w-36 lg:w-40 object-contain px-2 sm:px-3 md:px-4 ml-[25px] cursor-pointer"
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
