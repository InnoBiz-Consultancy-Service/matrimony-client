"use client";
import { formatDate } from "@/utils/formatDate";
import {
  Calendar,
  Clock,
  Download,
  Edit3,
  Filter,
  Gift,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const SpecialOffersPage = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("post");
  const [offers, setOffers] = useState(mockOffers);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    validTill: "",
  });

  const handleSubmitOffer = async () => {
    if (!formData.title || !formData.description || !formData.validTill) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newOffer = {
        id: offers.length + 1,
        ...formData,
        createdAt: new Date().toISOString(),
        status: "active",
      };

      setOffers([newOffer, ...offers]);
      setFormData({ title: "", description: "", validTill: "" });
      setActiveTab("get");

      // Success notification
      alert("Special offer posted successfully!");
    } catch (error) {
      alert("Failed to post offer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setOffers(offers.filter((offer) => offer.id !== id));
        alert("Offer deleted successfully!");
      } catch (error) {
        alert("Failed to delete offer. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isOfferExpired = (validTill: any) => {
    return new Date(validTill) < new Date();
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Special Offers Management
        </h2>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab("post")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "post"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Post Special Offer
          </button>
          <button
            onClick={() => setActiveTab("get")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "get"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Gift className="w-4 h-4 inline mr-2" />
            All Special Offers
          </button>
        </div>

        {/* Post Offer Tab */}
        {activeTab === "post" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Offer Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter offer title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Valid Till
                </label>
                <input
                  type="datetime-local"
                  value={formData.validTill}
                  onChange={(e) =>
                    setFormData({ ...formData, validTill: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter offer description"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              onClick={handleSubmitOffer}
              disabled={
                loading ||
                !formData.title ||
                !formData.description ||
                !formData.validTill
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Post Offer
                </>
              )}
            </button>
          </div>
        )}

        {/* Get All Offers Tab */}
        {activeTab === "get" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Total Offers:{" "}
                <span className="font-semibold">{offers.length}</span>
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {offer.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isOfferExpired(offer.validTill)
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isOfferExpired(offer.validTill)
                            ? "Expired"
                            : "Active"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{offer.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Valid till: {formatDate(offer.validTill)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Created: {formatDate(offer.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SpecialOffersPage;

const mockOffers = [
  {
    id: 1,
    title: "November Premium Discount",
    description:
      "Get 30% off on all premium packages until the end of November!",
    validTill: "2025-11-30T23:59:59.000Z",
    createdAt: "2025-01-15T10:30:00.000Z",
    status: "active",
  },
  {
    id: 2,
    title: "Wedding Season Special",
    description:
      "50% off for couples getting married this year. Limited time offer!",
    validTill: "2025-12-31T23:59:59.000Z",
    createdAt: "2025-01-10T14:20:00.000Z",
    status: "active",
  },
];
