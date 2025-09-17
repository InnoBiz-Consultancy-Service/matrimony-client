import { CheckCircle, Eye, Star, X } from "lucide-react";
const mockReviews = [
  {
    id: 1,
    user: "Sarah Ahmed",
    rating: 5,
    comment: "Found my perfect match! Excellent platform.",
    date: "2025-01-14",
    status: "approved",
  },
  {
    id: 2,
    user: "Khalid Rahman",
    rating: 4,
    comment: "Good experience overall, helpful customer service.",
    date: "2025-01-13",
    status: "pending",
  },
  {
    id: 3,
    user: "Aisha Patel",
    rating: 5,
    comment: "Amazing service and genuine profiles. Highly recommended!",
    date: "2025-01-12",
    status: "approved",
  },
];
const ReviewPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Review Management
        </h2>

        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {review.user}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {review.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex gap-2 ml-4">
                  {review.status === "pending" && (
                    <>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReviewPage;
