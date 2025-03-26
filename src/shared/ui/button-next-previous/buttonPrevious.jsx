import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ButtonPreviousComponent = ({ url, isFirstQuestion = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isFirstQuestion && url) {
      navigate(url);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFirstQuestion}
      className={`w-[142px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out ${
        isFirstQuestion
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#3758F9] hover:text-white"
      }`}
    >
      <FaArrowLeft className="w-[20px] h-[20px]" />

      <span className="w-[66px] h-[24px] flex items-center justify-center font-medium">
        Previous
      </span>
    </button>
  );
};

export default ButtonPreviousComponent;
