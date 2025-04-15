import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { WelcomeImage } from "@assets/images";
import { useGetAllSession, useSessionRequest } from "@features/sessions/hooks";
import { useDispatch, useSelector } from "react-redux";
import { updateTopicData } from "@app/providers/reducer/sessions/sessionSlice";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetAllSession();

  const { mutate: createRequest, isPending } = useSessionRequest();

  const handleSubmit = async (values) => {
    const session = data.find((session) => session.ID === values.sessionID);
    dispatch(updateTopicData(session));
    sessionStorage.setItem("topidId", session?.examSet);
    createRequest({
      sessionKey: values.sessionKey,
      sessionId: values.sessionID,
      UserID: userId,
    });
  };

  const [form] = Form.useForm();

  return (
    <div className="">
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
                <Form onFinish={handleSubmit} layout="vertical" form={form}>
                  <Form.Item
                    label="Session Name"
                    name="sessionID"
                    rules={[
                      { required: true, message: "Session name is required" },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder={
                        data.length > 0
                          ? "Select session name"
                          : "No session available"
                      }
                      options={data?.map((session) => ({
                        label: session.sessionName,
                        value: session.ID,
                      }))}
                      showSearch
                      className="w-full"
                      disabled={isPending}
                      filterOption={(input, option) => {
                        var _a;
                        return (
                          (_a =
                            option === null || option === void 0
                              ? void 0
                              : option.label) !== null && _a !== void 0
                            ? _a
                            : ""
                        )
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="sessionKey"
                    rules={[
                      { required: true, message: "Session key is required" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your session key"
                      maxLength={100}
                      disabled={isPending}
                    />
                  </Form.Item>
                  <div className="flex justify-between items-center mt-6">
                    <Button onClick={() => setIsModalOpen(false)} size="large">
                      Back
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      // onClick={handleSubmit}
                      className="!bg-blue-600 text-white"
                      loading={isPending}
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
