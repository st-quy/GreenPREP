import React from 'react';

const ProfileNav = () => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 text-[#003087]">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="font-medium">Profile</span>
      </div>
    </div>
  );
};

export default ProfileNav; 