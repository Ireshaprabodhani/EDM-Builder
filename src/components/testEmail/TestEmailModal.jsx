import React, { useState } from 'react';
import { X } from 'lucide-react';

const TestEmailModal = ({ isOpen, onClose, onSend, isSending }) => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: 'Test Email from EDM Builder'
  });

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailData.to) {
      alert('Please enter a recipient email address');
      return;
    }
    onSend(emailData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Send Test Email</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Test Recipient Email*
              </label>
              <input
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full p-2 border rounded"
                required
                placeholder="recipient@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full p-2 border rounded"
                placeholder="Test Email Subject"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestEmailModal;