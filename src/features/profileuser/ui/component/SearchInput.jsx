import React from "react";
import { Input } from "antd";

const SearchInput = ({ onSearchChange, placeholder = "Search...", className = "" }) => {
  return (
    <div className="relative w-[250px]">
      <Input
        placeholder={placeholder}
        onChange={onSearchChange}
        className={`w-full pl-3 pr-10 py-2 ${className}`}
        style={{
          height: '36px',
          backgroundColor: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#6B7280'
        }}
      />
      <div 
        className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
        style={{ color: '#6B7280' }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;