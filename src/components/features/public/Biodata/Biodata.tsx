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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";

interface BiodataProps {
  preference: {
    height: string;
  };
  occupation: {
    current: string;
  };
  age: number;
  name: string;
}

export default function ProfessionalBiodatasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profiles, setProfiles] = React.useState<BiodataProps[]>([]);
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
        setShowFilters(false);

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
          (axiosError.response?.data &&
          typeof axiosError.response.data === "object" &&
          "message" in axiosError.response.data
            ? (axiosError.response.data as { message?: string }).message
            : undefined) || "Failed to fetch profiles. Please try again later."
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
  console.log(profiles);

  const { language } = useLanguage();
  const t = biodataTranslation[language];
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10">
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-7">
          {profiles.map((biodata) => {
            return (
              <Card className="flex items-start p-4 shadow-md rounded-xl">
                {/* Left side */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border border-purple-500">
                    <AvatarImage src="" alt="profile" />
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-purple-700">
                      {biodata?.name}
                    </h2>
                    <p className="text-sm text-gray-700">
                      {t.personalInformation?.age} - {biodata?.age}
                    </p>
                    <p className="text-sm text-gray-700">
                      {t.expectedLifePartner?.height} -{" "}
                      {biodata?.preference?.height}
                    </p>
                    <p className="text-sm text-gray-700">
                      {t.OccupationalInformation?.occupation} -{" "}
                      {biodata?.occupation?.current}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                  <Link href={`/biodatas/${biodata.userId?._id}`}>
                    <Button
                      variant="outline"
                      className="rounded-full text-pink-600 border-pink-500 hover:bg-pink-50"
                    >
                      {t.biodataBtn} →
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
