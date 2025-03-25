import { WriteImg } from "@assets/images";

const WritingHeader = () => {
  return (
    <div className="flex items-center mb-6 mt-6">
      <div className="w-12 h-12 bg-[#3758F9] rounded-lg flex items-center justify-center mr-3">
        <img src={WriteImg} alt="Writing Test Logo" className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold">Writing Test</h1>
    </div>
  );
};

export default WritingHeader;
