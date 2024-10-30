import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteButton = ({ onClick, size = "w-4 h-4" }) => (
  <button 
    onClick={onClick}
    className="text-red-500 hover:text-red-600"
  >
    <Trash2 className={size} />
  </button>
);

export default DeleteButton;