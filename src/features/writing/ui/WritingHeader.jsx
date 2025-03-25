import { WriteImg } from "@assets/images";

const WritingHeader = () => {
  return (
    <div className="flex items-center mb-6 mt-0">
      <div className="w-20 h-20 bg-[#3758F9] rounded-lg flex items-center justify-center mr-3">
        <img src={WriteImg} alt="Writing Test Logo" className="w-[54px] h-[54px]" />
      </div>
      <h1 className="text-[40px] leading-[48px] font-bold">Writing Test</h1>
    </div>
  );
};

export default WritingHeader;
