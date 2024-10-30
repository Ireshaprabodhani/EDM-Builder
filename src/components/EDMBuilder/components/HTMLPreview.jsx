import React from 'react';

const HTMLPreview = ({ html }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Generated HTML</h3>
    <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
      <code>{html}</code>
    </pre>
  </div>
);

export default HTMLPreview;