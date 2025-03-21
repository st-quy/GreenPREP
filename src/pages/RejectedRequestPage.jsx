import { Layout, Typography, Flex, Grid, Button } from "antd";
const { Header, Content } = Layout;
const { Title, Text } = Typography;
import { GreenPREPLogo } from "@assets/images";

const StepData = [
  {
    title: "Speaking",
    description: "You'll describe picture, share",
  },
  {
    title: "Listening",
    description: "You'll describe picture, share",
  },
  {
    title: "Grammar & vocabulary",
    description: "You'll describe picture, share",
  },
  {
    title: "Reading",
    description: "You'll describe picture, share",
  },
  {
    title: "Writing",
    description: "You'll describe picture, share",
  },
];
const RejectedRequestPage = () => {
  return (
    <Layout>
      <Header className="flex justify-between items-center bg-white !p-5 shadow-[0px_2px_2px_1px_#00000024]">
        <Title level={3} className="!text-black !m-0 justify-center flex items-center ">
          <img
            src={GreenPREPLogo}
            className="w-10 bg-white rounded-full mr-2 "
          />
          GreenEDP
        </Title>
      </Header>
      <Content className="h-screen w-screen  ">
        <Flex
          vertical
          gap={16}
          className="w-full max-w-[1471px] mx-auto px-[calc(10px+4vw)] py-2.5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-8 bg-white rounded-lg"
        >
          <Flex gap={5} vertical>
            <Text className="text-lg/[26px] font-bold text-[#3758F9FF]">
              Test Structure & FLow
            </Text>
            <Text className="text-2xl md:text-3xl lg:text-[40px]/[48px] font-bold">
              Welecome to Englist Mock Test Journey
            </Text>
          </Flex>
          <Text className="text-sm lg:text-lg/[26px] font-semibold">
            The test is structured to assess different aspects of your language
            profi..
          </Text>

          <Flex vertical gap={14}>
            {StepData.map((item, index) => (
              <Flex gap={20} key={index}>
                <Flex
                  justify="center"
                  align="center"
                  className="w-14 h-14 rounded-full text-[28px]/[16px] font-medium border border-solid border-[#3758F9FF] text-[#3758F9FF]  hover:bg-[#3758F9FF] hover:text-white "
                >
                  0{index + 1}
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
          >
            Start now
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default RejectedRequestPage;
