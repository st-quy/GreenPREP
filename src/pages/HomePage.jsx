import React from "react";
import { Layout, Menu, Input, Button, Typography, Dropdown, Form } from "antd";
import { DownOutlined, HeartOutlined } from "@ant-design/icons";
import * as Yup from "yup"; // Import Yup for validation

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/signout">Sign Out</a>
    </Menu.Item>
  </Menu>
);

const sessionKeySchema = Yup.object().shape({
  sessionKey: Yup.string().required("Session key is required!"),
});

const HomePage = () => {
  const [form] = Form.useForm();

  const handleStart = async (values) => {
    try {
      await sessionKeySchema.validate(values);
      // Proceed with the session key
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center bg-[#01033D] !p-10 !shadow-xl">
        <Title level={2} className="!text-white !m-0 justify-center flex">
          <img
            src="public/assets/images/GreenPREP_logo.png"
            className="w-10 bg-white rounded-full mr-2 "
          />
          GreenPREP
        </Title>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Text className="text-white">Hi, </Text> 
            <Text className="text-[#f26f21] hover:text-[#e87a39] font-bold">
              Student name
            </Text>
            <DownOutlined className="!pl-1 text-white !text-[0.8rem]" />
          </a>
        </Dropdown>
      </Header>
      <Content className="p-12 text-center">
        <Title>Welcome to GreenPREP!</Title>
        <Text>
          Good Luck <HeartOutlined className="text-red-500" />
        </Text>
        <div className="mt-5">
          <Form
            form={form}
            onFinish={handleStart}
            initialValues={{ sessionKey: "" }}
          >
            <Form.Item
              name="sessionKey"
              rules={[{ required: true, message: "Session key is required!" }]}
            >
              <Input placeholder="Session key" className="w-72 mb-2 p-2" />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="w-72 bg-[#01033D] hover:!bg-[#131663]"
              htmlType="submit"
            >
              Start
            </Button>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
