"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  MapPin,
  Eye,
  Bookmark,
  SlidersHorizontal,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileSkeleton } from "@/components/common/Loader";
import axios, { AxiosError } from "axios";
import { Profile } from "@/types/bioData";
import { useSearchParams, useRouter } from "next/navigation";
import SearchFilters from "../Home/SearchFilters/SearchFilters";

export default function ProfessionalBiodatasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = React.useState<Profile[]>([]);
  const [savedProfiles, setSavedProfiles] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");

  const toggleSaveProfile = (profileId: string) => {
    setSavedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const getInitials = (name: string) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getProfileColor = (name: string) => {
    const colors = [
      "from-emerald-400 to-emerald-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-amber-400 to-amber-600",
      "from-teal-400 to-teal-600",
    ];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };
  const divisionMap: Record<string, string> = {
    "1": "Chattagram",
    "2": "Rajshahi",
    "3": "Khulna",
    "4": "Barisal",
    "5": "Sylhet",
    "6": "Dhaka",
    "7": "Rangpur",
    "8": "Mymensingh",
  };
  const getAllBioData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login first.");
        router.push("/login");
        return;
      }

      // Get search parameters from URL
      const lookingFor = searchParams.get("lookingFor") || "";
      const minAge = searchParams.get("minAge");
      const maxAge = searchParams.get("maxAge");
      const division = searchParams.get("division") || "";
      const district = searchParams.get("district") || "";
      const upazila = searchParams.get("upazila") || "";
      const profession = searchParams.get("profession") || "";
      const education = searchParams.get("education") || "";
      const maritalStatus = searchParams.get("maritalStatus") || "";
      const incomeRange = searchParams.get("incomeRange") || "";

      // Build query parameters
      const queryParams: Record<string, string | number> = {};

      if (lookingFor) queryParams.lookingFor = lookingFor;
      if (minAge) queryParams.minAge = minAge;
      if (maxAge) queryParams.maxAge = maxAge;
      if (division) {
        const divisionName = divisionMap[division];
        if (divisionName) {
          queryParams["address.present.division"] = divisionName;
        }
      }
      if (district) queryParams["address.present.district"] = district;
      if (upazila) queryParams["address.present.upazila"] = upazila;
      if (profession) queryParams.profession = profession;
      if (education) queryParams.education = education;
      if (maritalStatus)
        queryParams["maritalInfo.maritalStatus"] = maritalStatus;
      if (incomeRange) queryParams.incomeRange = incomeRange;

      console.log("Frontend sending these params:", queryParams);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/biodata`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          params: queryParams,
          timeout: 10000,
        }
      );

      // console.log("Backend response:", response.data);

      if (response.data?.success || response.data?.data) {
        const profilesData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);

        if (profilesData.length === 0) {
          setError("No profiles found matching your criteria.");
        }
      } else {
        setError("No profiles found or invalid response format.");
        setProfiles([]);
        setFilteredProfiles([]);
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);

      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        setError("You are not authorized. Please login first.");
        router.push("/login");
      } else if (axiosError.response?.status === 403) {
        setError("Access denied. You don't have permission to view profiles.");
      } else if (axiosError.response?.status === 404) {
        setError("Biodata service not found. Please contact support.");
      } else if (axiosError.code === "ECONNABORTED") {
        setError(
          "Request timeout. Please check your internet connection and try again."
        );
      } else if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else {
        setError(
          (axiosError.response?.data && typeof axiosError.response.data === "object" && "message" in axiosError.response.data
            ? (axiosError.response.data as { message?: string }).message
            : undefined) ||
            "Failed to fetch profiles. Please try again later."
        );
      }

      setProfiles([]);
      setFilteredProfiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllBioData();
  }, [searchParams]); 

  const handleRetry = () => {
    setError("");
    getAllBioData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters{" "}
              </Button>

              {error && (
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <>
          <SearchFilters />
        </>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError("")}
              className="text-red-700 hover:text-red-800"
            >
              ✕
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <ProfileSkeleton key={i} />
            ))}
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {error ? "Unable to Load Profiles" : "No Profiles Found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {error
                ? "Please check your connection and try again."
                : "Try adjusting your search filters or check back later."}
            </p>
            <div className="space-x-4">
              {error && (
                <Button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                >
                  Try Again
                </Button>
              )}
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProfiles.length} of {profiles.length}{" "}
                {filteredProfiles.length === 1 ? "profile" : "profiles"}
              </p>
            </div>

            {/* Professional Profiles Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile) => (
                <Card
                  key={profile._id}
                  className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden relative"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-16 w-16 rounded-full bg-gradient-to-br ${getProfileColor(
                            profile.name || ""
                          )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {getInitials(profile.name || "")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-800">
                              {profile.name || "Name not provided"}
                            </h3>
                          </div>
                          <p className="text-gray-600 font-medium">
                            {profile.age
                              ? `${profile.age} years`
                              : "Age not specified"}{" "}
                            •{" "}
                            {profile.physicalInfo?.height ||
                              "Height not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Professional Details */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        {profile.familyInfo?.fatherOccupation && (
                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                Father: {profile.familyInfo.fatherOccupation}
                              </p>
                            </div>
                          </div>
                        )}

                        {profile.education?.honours && (
                          <div className="flex items-center text-gray-600">
                            <GraduationCap className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {profile.education.honours}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {profile.address?.present ||
                                "Location not specified"}
                              ,{" "}
                              {profile.address?.country ||
                                "Country not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Physical Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {profile.physicalInfo?.weight && (
                          <p className="text-gray-600">
                            Weight: {profile.physicalInfo.weight}
                          </p>
                        )}
                        {profile.physicalInfo?.bloodGroup && (
                          <p className="text-gray-600">
                            Blood: {profile.physicalInfo.bloodGroup}
                          </p>
                        )}
                        {profile.physicalInfo?.bodyColor && (
                          <p className="text-gray-600">
                            Complexion: {profile.physicalInfo.bodyColor}
                          </p>
                        )}
                        {profile.maritalInfo?.maritalStatus && (
                          <p className="text-gray-600">
                            Status: {profile.maritalInfo.maritalStatus}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    {profile.description && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                          {profile.description}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <Link
                        href={`/biodatas/${profile._id}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleSaveProfile(profile._id)}
                        className={`border-emerald-200 hover:bg-emerald-50 ${
                          savedProfiles.includes(profile._id)
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-emerald-700"
                        }`}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            savedProfiles.includes(profile._id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-3 bg-transparent"
                onClick={handleRetry}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Refresh Profiles"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
