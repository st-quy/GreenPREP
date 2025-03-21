import React from "react";

const WritingPage = () => {
  const headingStyle = {
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "30px",
    letterSpacing: "0px",
    color: "#3758F9",
  };

  const mainTitleStyle = {
    fontFamily: "Inter",
    fontSize: "40px",
    fontWeight: 700,
    lineHeight: "48px",
    letterSpacing: "0px",
    color: "#000000",
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

  const responsiveMainTitleStyle = {
    ...mainTitleStyle,
    fontSize: "28px",
    "@media (min-width: 640px)": {
      fontSize: "32px",
    },
    "@media (min-width: 768px)": {
      fontSize: "40px",
    },
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

  return (
    <div className="w-full h-screen bg-white">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-6 font-sans h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
          <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] bg-[#3758F9] rounded-xl flex items-center justify-center">
            <img
              src="write.png"
              alt="Writing Test Logo"
              className="w-[40px] h-[40px] sm:w-[47px] sm:h-[47px] md:w-[54px] md:h-[54px]"
            />
          </div>
          <h1 style={responsiveMainTitleStyle}>Writing Test</h1>
        </div>

        {/* Test Structure Section */}
        <div
          style={{ border: "0.5px solid rgba(0, 0, 0, 0.3)" }}
          className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 mb-3"
        >
          <h2 style={headingStyle} className="mb-3 sm:mb-4">
            Test Structure
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <p style={descriptionStyle} className="mb-3">
                The test has four parts and takes up to 50 minutes.
              </p>
              <ul className="space-y-1.5">
                <li>
                  <span style={partNumberStyle}>Part 1:</span>
                  <span style={partDescriptionStyle}>
                    {" "}
                    Short answers (1-5 words per answer, total 5 answers)
                  </span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 2:</span>
                  <span style={partDescriptionStyle}>
                    {" "}
                    Write in sentences (20-30 words)
                  </span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 3:</span>
                  <span style={partDescriptionStyle}>
                    {" "}
                    Write in sentences (30-40 words per answer, total 3 answers)
                  </span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 4:</span>
                  <span style={partDescriptionStyle}>
                    {" "}
                    Write an email (50-70 words for part 1, 120-150 words for
                    part 2)
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1 md:max-w-[250px]">
              <p style={partDescriptionStyle} className="mb-3">
                Recommended times:
              </p>
              <ul className="space-y-1.5">
                <li>
                  <span style={partNumberStyle}>Part 1:</span>
                  <span style={partDescriptionStyle}> 3 minutes</span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 2:</span>
                  <span style={partDescriptionStyle}> 7 minutes</span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 3:</span>
                  <span style={partDescriptionStyle}> 10 minutes</span>
                </li>
                <li>
                  <span style={partNumberStyle}>Part 4:</span>
                  <span style={partDescriptionStyle}> 30 minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Description Section */}
        <div
          style={{ border: "0.5px solid rgba(0, 0, 0, 0.3)" }}
          className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 mb-3"
        >
          <h2 style={headingStyle} className="mb-3 sm:mb-4">
            Form Description
          </h2>
          <ul className="space-y-1.5">
            <li>
              <span style={partNumberStyle}>Format:</span>
              <span style={partDescriptionStyle}> 11</span>
            </li>
            <li>
              <span style={partNumberStyle}>Total questions:</span>
              <span style={partDescriptionStyle}> 11</span>
            </li>
            <li>
              <span style={partNumberStyle}>Test duration:</span>
              <span style={partDescriptionStyle}> 50 minutes</span>
            </li>
          </ul>
        </div>

        {/* Begin Test Button */}
        <div className="flex justify-center sm:justify-end mt-4">
          <button
            style={buttonStyle}
            className="w-full sm:w-auto text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 outline-none border-none hover:bg-[#2847E8] active:transform active:scale-95"
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
      </div>
    </div>
  );
};

export default WritingPage;
