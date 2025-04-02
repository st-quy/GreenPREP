import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProfileDropdownModal = ({ isOpen, onClose, fullName }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleProfile = () => {
    navigate('/profile');
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
    onClose();
  };

  return (
    <div className="relative">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-900 truncate">
            {fullName}
          </div>
        </div>
        <button
          onClick={handleProfile}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-3" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-3" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
};

ProfileDropdownModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired
};

export default ProfileDropdownModal; 