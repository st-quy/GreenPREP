import { useGetProfile } from "@features/auth/hooks";
import { Spin } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuth, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);

  const { isPending } = useGetProfile();

  if (isPending) {
    return (
      <div className="flex justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return <Outlet />;
};
