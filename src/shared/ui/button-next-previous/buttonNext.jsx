import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ButtonNextComponent = ({
  url,
  isLastQuestion = false,
  onSubmitTest = null,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLastQuestion && onSubmitTest) {
      onSubmitTest();
    } else if (url) {
      navigate(url);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-[114px] h-[48px] rounded-[50px] px-6 py-3 gap-[10px] bg-white text-[#3758F9] flex items-center justify-center border-none cursor-pointer shadow-[0_1px_3px_#A6AFC366] transition-all duration-300 ease-in-out hover:bg-[#3758F9] hover:text-white"
    >
      <span className="w-[36px] h-[24px] flex items-center justify-center font-medium">
        {isLastQuestion ? "Submit" : "Next"}
      </span>

      {!isLastQuestion && <FaArrowRight className="w-[20px] h-[20px]" />}
    </button>
  );
};

export default ButtonNextComponent;
