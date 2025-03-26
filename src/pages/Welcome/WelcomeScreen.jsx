import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { welcomeSchema } from "./welcomeSchema";
import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { WelcomeImage } from "@assets/images";

const WelcomeScreen = () => {
  const [sessionKey, setSessionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSessionKey(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await welcomeSchema.validate({ sessionKey });
      navigate("/waiting-for-approval");
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-white overflow-x-hidden h-screen max-h-full">
      <div className="w-full bg-white flex flex-col items-center md:flex-row md:items-start md:justify-between">
        {!isModalOpen && (
          <div className="w-full flex-1 text-center px-2 mt-4 md:text-left md:px-8 md:mt-[85px] ml-[30px]">
            <h1 className="text-lg font-bold mb-2 text-[#111928] md:text-3xl md:mb-4">
              Assess, Improve, and
              <br />
              Achieve <span className="text-[#3758F9]">Your Goals!</span>
            </h1>
            <p className="text-gray-500 text-[9px] mb-4 mx-auto max-w-xs md:text-sm md:mb-8 md:max-w-md md:mx-0">
              This mock test is designed to help you assess your proficiency,
              identify areas for improvement, and build confidence in your
              English skills. Whether you're preparing for an exam or simply
              looking to enhance your language abilities, this is the perfect
              place to start.
            </p>
            <Button
              onClick={handleGetStarted}
              shape="round"
              type="primary"
              size="large"
              style={{ backgroundColor: "#3758F9", borderColor: "#3758F9" }}
            >
              Get Started
              <ArrowRightOutlined />
            </Button>
          </div>
        )}
        {isModalOpen && (
          <div className="bg-white p-4 sm:p-6 rounded-lg md:ml-[60px] w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl z-60 sm:w-[90%] md:w-[40%] md:h-[450px] mt-12 xl:w-[550px]">
            <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-2 sm:mb-4 pt-2 sm:pt-4">
              Ready to Go?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 break-words">
              This is your chance to assess your English skills, track your
              progress, and improve with every attempt.
            </p>
            <Form onFinish={handleSubmit} initialValues={{ sessionKey }}>
              <Form.Item
                name="sessionKey"
                rules={[
                  { required: true, message: "Please enter the session key!" },
                  {
                    validator: async (_, value) => {
                      try {
                        await welcomeSchema.validate({ sessionKey: value });
                      } catch (error) {
                        return Promise.reject(error.message);
                      }
                    },
                  },
                ]}
              >
                <Input
                  type="text"
                  value={sessionKey}
                  onChange={handleInputChange}
                  maxLength={100}
                  className="border p-2 mb-2 w-full rounded-md"
                  placeholder="Please enter the session key"
                />
              </Form.Item>
            </Form>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleSubmit}
                shape="round"
                type="primary"
                size="large"
                style={{ backgroundColor: "#3758F9", borderColor: "#3758F9" }}
              >
                Submit Key
              </Button>
            </div>
          </div>
        )}
        <img
          src={WelcomeImage}
          alt="Welcome Illustration"
          className="block md:block w-[400px] h-[320px] object-contain md:w-[550px] md:h-[470px] lg:w-[650px] lg:h-[550px]"
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
