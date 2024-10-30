const TestEmailModal = ({ isOpen, onClose, onSend, isSending }) => {
    const [emailData, setEmailData] = useState({
      to: '',
      subject: 'Test Email',
      fromName: '',
      fromEmail: ''
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Email Address*
                </label>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="recipient@example.com"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject*
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Test Email Subject"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Name*
                </label>
                <input
                  type="text"
                  value={emailData.fromName}
                  onChange={(e) => setEmailData(prev => ({ ...prev, fromName: e.target.value }))}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Sender Name"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Email*
                </label>
                <input
                  type="email"
                  value={emailData.fromEmail}
                  onChange={(e) => setEmailData(prev => ({ ...prev, fromEmail: e.target.value }))}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="sender@example.com"
                />
              </div>
            </div>
  
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {isSending ? (
                  <>
                    <span className="animate-spin">⌛</span>
                    Sending...
                  </>
                ) : (
                  'Send Test Email'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Add this to your EDMBuilder component
  const SendTestEmailButton = ({ onSend }) => (
    <button
      onClick={onSend}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      <Mail className="w-4 h-4" />
      Send Test Email
    </button>
  );
  