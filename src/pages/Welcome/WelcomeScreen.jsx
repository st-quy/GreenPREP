import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { welcomeSchema } from "./welcomeSchema";
import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { WelcomeImage } from "@assets/images";
import axios from "axios";

const WelcomeScreen = () => {
  const [sessionKey, setSessionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    setSessionKey(event.target.value);
    setErrorMessage(""); // Clear error when input changes
  };

  const handleSubmit = async () => {
    try {
      await welcomeSchema.validate({ sessionKey });
      await axios.post(
        "https://dev-api-greenprep.onrender.com/api/session-requests",
        {
          sessionKey: sessionKey,
          sessionId: "6706a6d9-c6e7-4c67-be66-aae2932dfcf7",
          UserID: "d9a93655-574e-44b6-b27d-ff387722635a",
        }
      );
      navigate("/waiting-for-approval");
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <div className="flex-1 w-full lg:max-w-xl">
            {!isModalOpen ? (
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  Assess, Improve, and
                  <br />
                  Achieve <span className="text-[#003087]">Your Goals!</span>
                </h1>
                <p className="text-lg text-gray-600">
                  This mock test helps you assess your English proficiency,
                  identify areas for improvement, and build confidence in your
                  language skills.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="primary"
                  className="w-[180px] h-[50px] rounded-[50px] px-7 py-[13px] flex items-center justify-center gap-[10px] font-medium text-white bg-[#003087] hover:bg-[#002A6B] border-hidden"
                >
                  Get Started <ArrowRightOutlined />
                </Button>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-2xl shadow-lg h-[650px]">
                <div className="mt-[30px]">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ready to Go?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter your session key to begin your English assessment
                    journey.
                  </p>
                  <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                      name="sessionKey"
                      validateStatus={errorMessage ? "error" : ""}
                      help={errorMessage}
                      rules={[
                        { required: true, message: "Session key is required" },
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
                        size="large"
                        placeholder="Enter your session key"
                        value={sessionKey}
                        onChange={handleInputChange}
                        maxLength={100}
                      />
                    </Form.Item>
                    <div className="flex justify-center mt-6">
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleSubmit}
                        className="w-[180px] h-[50px] rounded-[50px] px-7 py-[13px] flex items-center justify-center gap-[10px] font-medium text-white bg-[#003087] hover:bg-[#002A6B] border-hidden"
                      >
                        Submit Key
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </div>

          {/* Right Image Section */}
          <div className="flex-1 w-full lg:max-w-xl">
            <img
              src={WelcomeImage}
              alt="Welcome Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
