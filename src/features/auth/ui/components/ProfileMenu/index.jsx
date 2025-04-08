import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "@app/providers/reducer/auth/authSlice";
import { useGetProfile } from "@features/auth/hooks";
import { Dropdown, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetProfile();

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        localStorage.clear();
        navigate("/login");
        dispatch(logout());
        break;
      default:
        navigate(key);
        break;
    }
  };
  const items = [
    {
      label: <div className="font-semibold py-2">Profile</div>,
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: <div className="font-semibold py-2">Logout</div>,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <>
      {data && (
        <Dropdown menu={{ items, onClick }} className="cursor-pointer">
          <a onClick={(e) => e.preventDefault()}>
            <Space className="font-semibold">
              {data.firstName + " " + data.lastName}
              <DownOutlined className="text-[14px]" />
            </Space>
          </a>
        </Dropdown>
      )}
    </>
  );
};
export default ProfileMenu;
