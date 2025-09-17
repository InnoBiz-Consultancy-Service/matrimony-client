import { Eye } from "lucide-react";
const mockSubscriptions = [
  { id: 1, plan: "Basic", users: 1234, revenue: 49800, color: "bg-blue-500" },
  {
    id: 2,
    plan: "Premium",
    users: 856,
    revenue: 171200,
    color: "bg-emerald-500",
  },
  { id: 3, plan: "Gold", users: 432, revenue: 172800, color: "bg-yellow-500" },
];
const SubscriptionPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Subscription Management
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mockSubscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {sub.plan}
                </h3>
                <div className={`w-3 h-3 rounded-full ${sub.color}`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Users:</span>
                  <span className="font-semibold">
                    {sub.users.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-emerald-600">
                    ${sub.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Plan
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Active Users
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Monthly Revenue
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{sub.plan}</td>
                  <td className="py-3 px-4">{sub.users.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-600 font-semibold">
                    ${sub.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                      <Eye className="w-4 h-4" />
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
export default SubscriptionPage;
