import React from "react";

const InputProfile = ({ label, required, type = "text", placeholder = "", register, children = null, error }) => {
  return (
    <div className="w-[516px] max-w-full">
      <label className="block text-sm font-medium text-[#637381] mb-2">
        {label} {required && <span className="text-[#FF0000]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-[46px] px-3 text-base border rounded-lg outline-none placeholder:text-[#919EAB] bg-white ${
          error ? 'border-[#FF0000]' : 'border-[#111928]'
        }`}
        {...register}
        required={required}
        onInvalid={(e) => {
          e.preventDefault();
        }}
      />
      {error && (
        <p className="mt-1 text-sm text-[#FF0000]">{error}</p>
      )}
      {children}
    </div>
  );
};

export default InputProfile; 