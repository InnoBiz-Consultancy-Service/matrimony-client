import { Download, Eye, Filter, Search } from "lucide-react";

const PaymentPage = () => {
  const mockPayments = [
    {
      id: 1,
      user: "Ahmed Hassan",
      amount: 199,
      plan: "Premium",
      date: "2025-01-15",
      status: "completed",
    },
    {
      id: 2,
      user: "Fatima Khan",
      amount: 399,
      plan: "Gold",
      date: "2025-01-14",
      status: "pending",
    },
    {
      id: 3,
      user: "Omar Ali",
      amount: 99,
      plan: "Basic",
      date: "2025-01-13",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Payment Management
        </h2>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <button className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  User
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Plan
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{payment.user}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">
                    ${payment.amount}
                  </td>
                  <td className="py-3 px-4">{payment.plan}</td>
                  <td className="py-3 px-4">{payment.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded mr-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-emerald-600 hover:bg-emerald-50 p-2 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
