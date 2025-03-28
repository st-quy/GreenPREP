import React from "react";
import { Outlet } from "react-router-dom";

const StudentProfile = () => {
  return (
    <div className="student-profile-container">
      {/* Header or Sidebar for the profile can be added here */}
      <Outlet />
    </div>
  );
};

export default StudentProfile;