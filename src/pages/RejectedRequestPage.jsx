import { Layout, Typography, Flex, Grid, Button } from "antd";
const { Header, Content } = Layout;
const { Title, Text } = Typography;
import { RejectedImg, HatLogo } from "@assets/images";
import { useNavigate } from "react-router-dom";

const RejectedRequestPage = () => {
  const navigate = useNavigate();
  const handleClickBackHome = () => navigate("/");
  return (
    <Layout>
      <Header className="flex justify-between items-center bg-white !p-5 shadow-[0px_2px_2px_1px_#00000024]">
        <Title
          level={3}
          className="!text-black !m-0 justify-center flex items-center "
        >
          <img src={HatLogo} className="w-10 bg-white rounded-full mr-2 " />
          GreenPREP
        </Title>
      </Header>
      <Content className="h-screen max-h-[calc(100vh-64px)] w-screen">
        <Flex
          vertical
          gap={16}
          justify="center"
          align="center"
          className="w-full max-w-[calc(100vw-32px)] lg:max-w-[1260px] mx-auto mt-8 bg-white rounded-2xl shadow-[0px_10px_20px_10px_#00000024]"
        >
          <img
            src={RejectedImg}
            className="w-full max-w-[337px] h-[337px] bg-white rounded-full mr-2 "
          />
          <Flex vertical gap={14} justify="center" align="center">
            <Text className="text-2xl md:text-3xl lg:text-[40px]/[48px] font-bold">
              Your request has been rejected!
            </Text>
            <Text className="text-sm md:text-base lg:text-[18px]/[26px]">
              Please contact your teacher for support.
            </Text>
          </Flex>
          <Button
            type="primary"
            size="middle"
            className="text-1/4 md:text-1/5 lg:w-1/6 rounded-full !text-md py-4 mx-auto my-10"
            htmlType="button"
            onClick={handleClickBackHome}
          >
            Go back home
          </Button>
        </Flex>
      </Content>
    </Layout>
  );
};

export default RejectedRequestPage;
