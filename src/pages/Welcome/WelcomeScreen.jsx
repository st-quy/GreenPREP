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
    setErrorMessage(""); // Clear error when input changes
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
                  Achieve <span className="text-blue-600">Your Goals!</span>
                </h1>
                <p className="text-lg text-gray-600">
                  This mock test helps you assess your English proficiency,
                  identify areas for improvement, and build confidence in your
                  language skills.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="primary"
                  size="large"
                  className="flex items-center gap-2"
                  style={{
                    height: "48px",
                    padding: "0 32px",
                    fontSize: "18px",
                    backgroundColor: "#3758F9",
                  }}
                >
                  Get Started <ArrowRightOutlined />
                </Button>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-2xl shadow-lg">
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
                  <div className="flex justify-between items-center mt-6">
                    <Button onClick={() => setIsModalOpen(false)} size="large">
                      Back
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleSubmit}
                      style={{ backgroundColor: "#3758F9" }}
                    >
                      Submit Key
                    </Button>
                  </div>
                </Form>
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
