import { message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const SessionLayout = () => {
  const navigate = useNavigate();
  const { participantID } = useSelector((state) => state.session);
  useEffect(() => {
    if (!participantID) {
      navigate("/");
      message.error("Session not found. Please join a new session.");
    }
  }, [participantID, navigate]);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SessionLayout;
