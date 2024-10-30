import React from 'react';

const TestTailwind = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Test Component
            </div>
            <p className="mt-2 text-slate-500">
              Testing Tailwind CSS Installation
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;