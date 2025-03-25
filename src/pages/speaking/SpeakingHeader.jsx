import { CommentOutlined } from "@ant-design/icons";
import { SpeakingIcon } from "@assets/images";

const SpeakingHeader = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-[#F9F9F9] mb-6 sm:mb-8">
      <img
        src={SpeakingIcon}
        alt="Speaking Icon"
        className="w-10 h-auto sm:w-12 md:w-16 lg:w-20 object-contain"
      />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black m-0">
        Speaking Test
      </div>
    </div>
  );
};
export default SpeakingHeader;
