import React, { useState } from 'react';

const HTMLEditor = ({ initialCode, onUpdate }) => {
  const [code, setCode] = useState(initialCode);
  const [viewMode, setViewMode] = useState('formatted');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    onUpdate(newCode);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('formatted')}
            className={`px-4 py-2 rounded ${
              viewMode === 'formatted' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Formatted View
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-4 py-2 rounded ${
              viewMode === 'raw'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Raw View
          </button>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-sm"
        >
          Copy Code
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        className="w-full h-[600px] font-mono text-sm p-4 bg-gray-50 border rounded"
        spellCheck="false"
      />
    </div>
  );
};

export default HTMLEditor;