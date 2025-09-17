"use client";
import { Send } from "lucide-react";
import { useState } from "react";

const SendMailPage = () => {
  const [mailData, setMailData] = useState({
    recipients: "all",
    subject: "",
    message: "",
  });

  const handleSendMail = () => {
    if (!mailData.subject || !mailData.message) {
      alert("Please fill all required fields");
      return;
    }
    alert("Email sent successfully to " + mailData.recipients + " users!");
    setMailData({ recipients: "all", subject: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Send Mail to Users
        </h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Recipients
              </label>
              <select
                value={mailData.recipients}
                onChange={(e) =>
                  setMailData({ ...mailData, recipients: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Users</option>
                <option value="premium">Premium Users</option>
                <option value="basic">Basic Users</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={mailData.subject}
                onChange={(e) =>
                  setMailData({ ...mailData, subject: e.target.value })
                }
                placeholder="Enter email subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={mailData.message}
              onChange={(e) =>
                setMailData({ ...mailData, message: e.target.value })
              }
              placeholder="Enter your message..."
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSendMail}
              disabled={!mailData.subject || !mailData.message}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </button>
            <button
              onClick={() => alert("Draft saved successfully!")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendMailPage;
