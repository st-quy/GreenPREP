import React from "react";
import { Input } from "antd";

const SearchInput = ({ onSearchChange, placeholder = "Search...", className = "" }) => {
  const searchIcon = (
    <svg 
      width="14" 
      height="14" 
      fill="none" 
      stroke="#6B7280" 
      viewBox="0 0 24 24"
      style={{ marginRight: '4px' }}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  return (
    <div className="w-[250px]">
      <Input
        placeholder={placeholder}
        onChange={onSearchChange}
        suffix={searchIcon}
        className={className}
        style={{
          height: '36px',
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#6B7280'
        }}
      />
    </div>
  );
};

export default SearchInput;