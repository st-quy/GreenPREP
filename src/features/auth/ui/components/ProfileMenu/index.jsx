import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "@app/providers/reducer/auth/authSlice";
import { Dropdown, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onClick = ({ key }) => {
    switch (key) {
      case "Logout":
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
      key: "Profile",
      icon: <UserOutlined />,
    },
    {
      label: <div className="font-semibold py-2">Logout</div>,
      key: "Logout",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <>
      {user && (
        <Dropdown menu={{ items, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="font-semibold">
              {user.firstName + " " + user.lastName}
              <DownOutlined className="text-[14px]" />
            </Space>
          </a>
        </Dropdown>
      )}
    </>
  );
};
export default ProfileMenu;
