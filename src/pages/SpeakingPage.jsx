import Introduction from "../features/speaking/ui/Introduction.jsx";
import SpeakingHeader from "@features/speaking/ui/SpeakingHeader.jsx";

const SpeakingPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-2 bg-white max-h-screen">
      <SpeakingHeader />
      <Introduction />
    </div>
  );
};

export default SpeakingPage;
