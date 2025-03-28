import React from "react";
import { Outlet } from "react-router-dom";

const StudentProfile = () => {
  return (
    <div className="student-profile-container">
      <Outlet />
    </div>
  );
};

export default StudentProfile;