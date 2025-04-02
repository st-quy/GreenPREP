import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export const PublicLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-6 flex-1">
        <Outlet />
      </Content>
    </Layout>
  );
};
