import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    try {
      navigate("/enter-session-key");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* Mobile-first approach with clear breakpoints */}
      <div className="w-full bg-white p-3 flex flex-col items-center md:flex-row md:items-start md:justify-between md:p-6">
        {/* Text content section */}
        <div className="w-full flex-1 text-center px-2 mt-4 md:text-left md:px-8 md:mt-[85px]">
          <h1 className="text-lg font-bold mb-2 text-gray-800 md:text-3xl md:mb-4">
            Assess, Improve, and
            <br />
            Achieve <span className="text-blue-600">Your Goals!</span>
          </h1>
          <p className="text-gray-500 text-[9px] mb-4 mx-auto max-w-xs md:text-sm md:mb-8 md:max-w-md md:mx-0">
            This mock test is designed to help you assess your proficiency,
            identify areas for improvement, and build confidence in your English
            skills. Whether you're preparing for an exam or simply looking to
            enhance your language abilities, this is the perfect place to start.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs transition duration-300 ease-in-out md:px-6 md:py-2 md:text-base"
          >
            Get Started
          </button>
        </div>

        <div className="w-full flex-1 mt-4 flex justify-center md:mt-0 md:px-8 md:justify-end">
          <img
            src="/assets/images/Happy_student_rafiki.png"
            alt="Welcome Illustration"
            className="w-[400px] h-[320px] object-contain md:w-[550px] md:h-[470px] lg:w-[650px] lg:h-[550px]"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
