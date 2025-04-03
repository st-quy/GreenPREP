import React from "react";
import PropTypes from 'prop-types';

const Details = ({ userData, loading, error }) => {
  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div>
          <div className="mb-6">
            <div className="text-gray-500 text-sm mb-1">Student name</div>
            <div className="text-gray-900 font-medium">
              {userData.fullName || 'Not provided'}
            </div>
          </div>
          <div className="mb-6">
            <div className="text-gray-500 text-sm mb-1">Student ID</div>
            <div className="text-gray-900 font-medium">
              {userData.studentCode || 'Not provided'}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Class name</div>
            <div className="text-gray-900 font-medium">
              {userData.class || 'Not provided'}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-6">
            <div className="text-gray-500 text-sm mb-1">Email</div>
            <div className="text-gray-900 font-medium">
              {userData.email || 'Not provided'}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">Phone</div>
            <div className="text-gray-900 font-medium">
              {userData.phoneNumber || 'Not provided'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  userData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    studentCode: PropTypes.string,
    phoneNumber: PropTypes.string,
    class: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default Details;