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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ProfileSkeleton } from "@/components/common/Loader";
// import { useSearchParams } from "next/navigation";
// import { useSearchFilters } from "@/hooks/useSearchFilters";
import axios from "axios";
import { FilterState, Profile } from "@/types/bioData";

const religions = [
  "Islam",
  "Christianity",
  "Hinduism",
  "Buddhism",
  "Judaism",
  "Sikhism",
  "Other",
  "No Preference",
];

// const professions = [
//   "Doctor",
//   "Engineer",
//   "Teacher",
//   "Business Owner",
//   "Software Developer",
//   "Lawyer",
//   "Accountant",
//   "Nurse",
//   "Architect",
//   "Designer",
//   "Marketing Professional",
//   "Sales Professional",
//   "Government Employee",
//   "Student",
//   "Other",
//   "Any Profession",
// ];

export default function ProfessionalBiodatasPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    lookingFor: "",
    ageRange: [18, 40],
    religion: "",
    profession: "",
    location: "",
    keyword: "",
    sortBy: "newest",
  });

  const [showFilters, setShowFilters] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = React.useState<Profile[]>([]);
  const [savedProfiles, setSavedProfiles] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");

  // const filter = useSearchFilters();

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Frontend filtering function
  const applyFilters = () => {
    let filtered = [...profiles];

    // Age filter
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 40) {
      filtered = filtered.filter((profile) => {
        const age = profile.age || 0;
        return age >= filters.ageRange[0] && age <= filters.ageRange[1];
      });
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (profile) =>
          profile.address.present
            .toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          profile.address.country
            .toLowerCase()
            .includes(filters.location.toLowerCase())
      );
    }

    // Profession filter (checking father's occupation as profession)
    if (filters.profession) {
      filtered = filtered.filter((profile) =>
        profile.familyInfo.fatherOccupation
          .toLowerCase()
          .includes(filters.profession.toLowerCase())
      );
    }

    // Keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(keyword) ||
          profile.description.toLowerCase().includes(keyword) ||
          profile.education.honours.toLowerCase().includes(keyword) ||
          profile.familyInfo.fatherOccupation.toLowerCase().includes(keyword)
      );
    }

    // Sort by
    if (filters.sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filters.sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFilteredProfiles(filtered);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const clearFilters = () => {
    setFilters({
      lookingFor: "",
      ageRange: [18, 40],
      religion: "",
      profession: "",
      location: "",
      keyword: "",
      sortBy: "newest",
    });
    setFilteredProfiles(profiles);
  };

  const toggleSaveProfile = (profileId: string) => {
    setSavedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.lookingFor) count++;
    if (filters.religion) count++;
    if (filters.profession) count++;
    if (filters.location) count++;
    if (filters.keyword) count++;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 40) count++;
    return count;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getProfileColor = (name: string) => {
    const colors = [
      "from-rose-400 to-rose-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-amber-400 to-amber-600",
      "from-teal-400 to-teal-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getAllBioData = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/biodata`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // console.log("Biodata fetched:", response.data);

      if (response.data && response.data.data) {
        setProfiles(response.data.data);
        setFilteredProfiles(response.data.data);
      } else {
        setProfiles([]);
        setFilteredProfiles([]);
      }
    } catch (error) {
      // console.error("Failed to fetch biodata:", error);
      setError(`You are not authorized to view this page. Please login first.`);
      setProfiles([]);
      setFilteredProfiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getAllBioData();
  }, []);

  // Apply filters whenever filters change
  React.useEffect(() => {
    applyFilters();
  }, [filters, profiles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-rose-100">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters{" "}
                {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-rose-100 shadow-lg">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <Card className="border-rose-100">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Looking For */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-rose-500" />
                      Looking For
                    </Label>
                    <RadioGroup
                      value={filters.lookingFor}
                      onValueChange={(value) =>
                        handleFilterChange("lookingFor", value)
                      }
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="border-2 border-gray-300 text-rose-600"
                        />
                        <Label
                          htmlFor="male"
                          className="cursor-pointer font-medium"
                        >
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="female"
                          className="border-2 border-gray-300 text-rose-600"
                        />
                        <Label
                          htmlFor="female"
                          className="cursor-pointer font-medium"
                        >
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Religion */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Religion
                    </Label>
                    <Select
                      value={filters.religion}
                      onValueChange={(value) =>
                        handleFilterChange("religion", value)
                      }
                    >
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {religions.map((religion) => (
                          <SelectItem
                            key={religion}
                            value={religion.toLowerCase()}
                          >
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profession */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Profession
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter profession"
                      value={filters.profession}
                      onChange={(e) =>
                        handleFilterChange("profession", e.target.value)
                      }
                      className="border-2 w-full border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-sm"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-rose-500" />
                      Location
                    </Label>
                    <Input
                      type="text"
                      placeholder="City, State, Country"
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      className="border-2 w-full border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-sm"
                    />
                  </div>
                </div>

                {/* Keyword Search */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Search Keywords
                  </Label>
                  <Input
                    type="text"
                    placeholder="Search by name, description, education..."
                    value={filters.keyword}
                    onChange={(e) =>
                      handleFilterChange("keyword", e.target.value)
                    }
                    className="border-2 w-full border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-sm"
                  />
                </div>

                {/* Age Range */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                    Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}{" "}
                    years
                  </Label>
                  <div className="px-4">
                    <Slider
                      value={filters.ageRange}
                      onValueChange={(value) =>
                        handleFilterChange("ageRange", value)
                      }
                      max={70}
                      min={18}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>18</span>
                      <span>70</span>
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    Clear All Filters
                  </Button>
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <ProfileSkeleton key={i} />
            ))}
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-24 w-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-rose-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              You are not authorized to view this page. Please login first.
            </h3>
            <p className="text-gray-600 mb-6">
              {error &&
                "Please login to view view profiles or try again later."}
            </p>
            <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white">
              <Link href="/login" className="flex items-center">
                Login to View Profiles
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProfiles.length} of {profiles.length}{" "}
                {filteredProfiles.length === 1 ? "profile" : "profiles"}
                {getActiveFiltersCount() > 0 && " (filtered)"}
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
                      {/* Profile Avatar with Initials */}
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-16 w-16 rounded-full bg-gradient-to-br ${getProfileColor(
                            profile.name
                          )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {getInitials(profile.name)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-800">
                              {profile.name}
                            </h3>
                          </div>
                          <p className="text-gray-600 font-medium">
                            {profile.age
                              ? `${profile.age} years`
                              : "Age not specified"}{" "}
                            •{" "}
                            {profile.physicalInfo.height ||
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
                        {profile.familyInfo.fatherOccupation && (
                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                Father: {profile.familyInfo.fatherOccupation}
                              </p>
                            </div>
                          </div>
                        )}

                        {profile.education.honours && (
                          <div className="flex items-center text-gray-600">
                            <GraduationCap className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {profile.education.honours}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {profile.address.present},{" "}
                              {profile.address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Physical Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {profile.physicalInfo.weight && (
                          <p className="text-gray-600">
                            Weight: {profile.physicalInfo.weight}
                          </p>
                        )}
                        {profile.physicalInfo.bloodGroup && (
                          <p className="text-gray-600">
                            Blood: {profile.physicalInfo.bloodGroup}
                          </p>
                        )}
                        {profile.physicalInfo.bodyColor && (
                          <p className="text-gray-600">
                            Complexion: {profile.physicalInfo.bodyColor}
                          </p>
                        )}
                        {profile.maritalInfo.maritalStatus && (
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
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleSaveProfile(profile._id)}
                        className={`border-rose-200 hover:bg-rose-50 ${
                          savedProfiles.includes(profile._id)
                            ? "bg-rose-50 text-rose-700"
                            : "text-rose-700"
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
                        className="border-rose-200 text-rose-700 hover:bg-rose-50 bg-transparent"
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
                className="border-rose-200 text-rose-700 hover:bg-rose-50 px-8 py-3 bg-transparent"
                onClick={() => getAllBioData()}
              >
                Refresh Profiles
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
