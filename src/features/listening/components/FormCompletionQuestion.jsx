import React from 'react';

const FormCompletionQuestion = ({ fields }) => {
  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </div>
  );
};

export default FormCompletionQuestion; 