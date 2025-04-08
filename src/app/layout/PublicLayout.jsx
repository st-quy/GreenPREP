import { Logo } from "@assets/images";
import ProfileMenu from "@features/auth/ui/components/ProfileMenu";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export const PublicLayout = () => {
  return (
    <Layout className="bg-[#f3f4f6]">
      <Header className="flex items-center h-[7rem] bg-[#f3f4f6]">
        <img src={Logo} className="max-w-44" />
      </Header>
      <Content className="px-6 flex-1">
        <Outlet />
      </Content>
    </Layout>
  );
};
