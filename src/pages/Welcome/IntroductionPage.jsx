import { Layout, Typography, Flex, Grid, Button } from "antd";
const { Header, Content } = Layout;
const { Title, Text } = Typography;
import { StepData } from "@pages/Welcome/constants";
import { useNavigate } from "react-router-dom";

const IntroductionPage = () => {
  const navigate = useNavigate();
  return (
    <Layout className=" !bg-white">
      <Content className="w-full ">
        <Flex
          vertical
          gap={30}
          className="w-full py-10 px-20 shadow-[0_3px_10px_rgb(0,0,0,0.2)] !bg-white rounded-lg "
        >
          <Flex gap={10} vertical>
            <Text className="text-lg/[26px] font-bold text-[#3758F9FF]">
              Test Structure & FLow
            </Text>
            <Text className="text-2xl md:text-3xl lg:text-[40px]/[48px] font-bold">
              Welcome to English Mock Test Journey
            </Text>
          </Flex>
          <Text className="text-sm lg:text-lg/[26px] font-semibold">
            The test is structured to assess different aspects of your language
            profi..
          </Text>

          <Flex vertical gap={20}>
            {StepData.map((item, index) => (
              <Flex className="gap-3 sm:gap-3 md:gap-4 lg:gap-5" key={index}>
                <Flex
                  justify="center"
                  align="center"
                  className="w-full max-w-10 h-10 md:max-w-10 md:h-10 lg:max-w-14 lg:h-14 rounded-full text-lg md:text-xl lg:text-[28px]/[16px] font-medium border border-solid border-[#3758F9FF] text-[#3758F9FF]  hover:bg-[#3758F9FF] hover:text-white "
                >
                  {index + 1}
                </Flex>
                <Flex vertical justify="space-between">
                  <Text className="text-lg md:text-xl lg:text-2xl font-bold">
                    {item.title}
                  </Text>
                  <Text className="text-sm md:text-base text-[#637381]">
                    {item.description}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Button
            type="primary"
            size="middle"
            className="text-1/4 md:text-1/5 lg:w-1/6 rounded-full !text-md mx-auto my-10"
            htmlType="button"
            onClick={() => navigate("/pre-condition")}
          >
            Start now
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default IntroductionPage;
