import React from "react";

const IntroWriting = () => {
  const headingStyle = {
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "30px",
    letterSpacing: "0px",
    color: "#3758F9",
  };

  const descriptionStyle = {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0px",
  };

  const partNumberStyle = {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "26px",
    letterSpacing: "0px",
  };

  const partDescriptionStyle = {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0px",
  };

  const buttonStyle = {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 500,
    backgroundColor: "#3758F9",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  const containerStyle = {
    border: "0.5px solid rgba(0, 0, 0, 0.3)"
  };

  return (
    <>
      {/* Test Structure Section */}
      <div style={containerStyle} className="bg-white rounded-2xl p-8 mb-4">
        <h2 className="text-[#3758F9] text-xl font-semibold mb-4">
          Test Structure
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <p className="mb-4 text-base">
              The test has four parts and takes up to 50 minutes.
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li className="pl-2">
                <span className="font-bold">Part 1: </span>
                Short answers (1-5 words per answer, total 5 answers)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 2: </span>
                Write in sentences (20-30 words)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 3: </span>
                Write in sentences (30-40 words per answer, total 3 answers)
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 4: </span>
                Write an email (50-70 words for part 1, 120-150 words for part 2)
              </li>
            </ul>
          </div>
          <div className="flex-1 md:max-w-[250px]">
            <p className="mb-4 text-base">
              Recommended times:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li className="pl-2">
                <span className="font-bold">Part 1: </span>
                3 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 2: </span>
                7 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 3: </span>
                10 minutes
              </li>
              <li className="pl-2">
                <span className="font-bold">Part 4: </span>
                30 minutes
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Description Section */}
      <div style={containerStyle} className="bg-white rounded-2xl p-8 mb-4">
        <h2 className="text-[#3758F9] text-xl font-semibold mb-4">
          Form Description
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li className="pl-2">
            <span className="font-bold">Format: </span>
            11
          </li>
          <li className="pl-2">
            <span className="font-bold">Total questions: </span>
            11
          </li>
          <li className="pl-2">
            <span className="font-bold">Test duration: </span>
            50 minutes
          </li>
        </ul>
      </div>

      {/* Begin Test Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-[#3758F9] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#2847E8] active:transform active:scale-95 border-none outline-none"
        >
          Begin the Test
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default IntroWriting; 