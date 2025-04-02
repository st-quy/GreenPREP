import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getDataFromApi } from "../lib/utils/auth";
import { AuthApi } from "../../features/auth/api";

const DropdownList = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decodedUser = getUserFromToken();
        if (!decodedUser?.userId) {
          throw new Error('No user ID found in token');
        }

        const response = await getDataFromApi(decodedUser.userId);
        const formattedName = `${response.firstName || ''} ${response.lastName || ''}`.trim();
        setFullName(formattedName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onLogout = () => {
    AuthApi.logout();
    console.log(AuthApi.logout());
    navigate("/login");
  };

  const items = [
    {
      key: "profile",
      label: (
        <div className="flex items-center gap-2 px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M20 21a8 8 0 1 0-16 0"/>
          </svg>
          Profile
        </div>
      ),
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2 px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log out
        </div>
      ),
      onClick: onLogout,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click']}
      overlayClassName="min-w-[150px]"
    >
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg box-shadow-md border-none bg-transparent">
        <span className="text-sm font-medium">{fullName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </Dropdown>
  );
};

export default DropdownList;
