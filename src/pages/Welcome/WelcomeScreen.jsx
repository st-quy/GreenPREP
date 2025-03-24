import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { welcomeSchema } from './welcomeSchema';

const WelcomeScreen = () => {
    const [sessionKey, setSessionKey] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSessionKey(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            await welcomeSchema.validate({ sessionKey });
            navigate("/waiting-for-approval");
            console.log("Sending request for approval with session key:", sessionKey);
            setIsModalOpen(false);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleGetStarted = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="w-full bg-white overflow-x-hidden">
            <div className="w-full bg-white p-3 flex flex-col items-center md:flex-row md:items-start md:justify-between md:p-6">
                {!isModalOpen && (
                    <div className="w-full flex-1 text-center px-2 mt-4 md:text-left md:px-8 md:mt-[85px] ml-[30px]">
                        <h1 className="text-lg font-bold mb-2 text-gray-800 md:text-3xl md:mb-4">
                            Assess, Improve, and
                            <br />
                            Achieve <span className="text-blue-600">Your Goals!</span>
                        </h1>
                        <p className="text-gray-500 text-[9px] mb-4 mx-auto max-w-xs md:text-sm md:mb-8 md:max-w-md md:mx-0">
                            This mock test is designed to help you assess your proficiency, identify areas for improvement, and build
                            confidence in your English skills. Whether you're preparing for an exam or simply looking to enhance your
                            language abilities, this is the perfect place to start.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="bg-[#3758F9] border-[#3758F9] hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs transition duration-300 ease-in-out md:px-6 md:py-2 md:text-base outline-none"
                        >
                            Get Started
                        </button>

                    </div>
                )}

                <div className="w-full flex-1 mt-4 flex justify-center md:mt-0 md:px-8 md:justify-end">
                    <img
                        src="/src/assets/Images/Happy_student_rafiki.png"
                        alt="Welcome Illustration"
                        className="w-[400px] h-[320px] object-contain md:w-[550px] md:h-[470px] lg:w-[650px] lg:h-[550px]"
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[90%] sm:w-[450px] lg:w-[550px] h-auto sm:h-[450px] md:h-[500px] shadow-2xl absolute top-[20%] md:top-40 left-[5%] md:left-[70px] z-60 md:w-[600px] sm:w-[90%] xl:w-[550px]">
                        <h2 className="text-4xl font-semibold text-black mb-4 pt-7">Ready to Go?</h2>
                        <p className="text-xs text-gray-500 mb-4 pt-5 pb-2 break-words">
                            This is your chance to assess your English skills, track your progress, and improve with every attempt.
                        </p>
                        <input
                            type="text"
                            value={sessionKey}
                            onChange={handleInputChange}
                            maxLength={100}
                            className="border p-2 mb-2 w-full rounded-md"
                            placeholder="Please enter the session key"
                        />
                        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-2 rounded-full border-[#3758F9]"
                            >
                                Submit Key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomeScreen;