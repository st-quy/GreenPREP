import React from "react";

const Details = () => {
  // Mock data - replace with API data later
  const studentInfo = {
    studentName: "Xavier Maverick",
    studentId: "GBD210410",
    className: "CLASS01",
    email: "xavier.mar@gmail.com",
    phone: "0935 030 337"
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <div className="flex">
        {/* Left column */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="text-gray-500 text-sm mb-1">Student name</div>
            <div className="text-gray-900 font-medium">{studentInfo.studentName}</div>
          </div>
          <div className="mb-8">
            <div className="text-gray-500 text-sm mb-1">Student ID</div>
            <div className="text-gray-900 font-medium">{studentInfo.studentId}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Class name</div>
            <div className="text-gray-900 font-medium">{studentInfo.className}</div>
          </div>
        </div>

        {/* Vertical line */}
        <div className="w-px bg-gray-200 mx-16"></div>

        {/* Right column */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="text-gray-500 text-sm mb-1">Email</div>
            <div className="text-gray-900 font-medium">{studentInfo.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Phone</div>
            <div className="text-gray-900 font-medium">{studentInfo.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;