import React from 'react';

const ComponentButton = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 ${className}`}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {label}
  </button>
);

export default ComponentButton;