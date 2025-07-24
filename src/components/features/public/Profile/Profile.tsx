"use client";

import * as React from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Facebook,
  GraduationCap,
  Users,
  Heart,
  Shield,
  Edit,
  Camera,
  Star,
  Crown,
  Activity,
  BookOpen,
  MessageCircle,
  Share2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { IBiodata } from "@/types/bioData";
import Link from "next/link";
// import { Label } from "@/components/ui/label"
// import type { IBiodata } from "@/types/biodata"

// Add this to the top of the component after the imports
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Mock data based on the interface
const mockProfile: IBiodata = {
  _id: "507f1f77bcf86cd799439011",
  userId: "507f1f77bcf86cd799439012" as any,
  name: "Sarah Ahmed",
  description:
    "A dedicated healthcare professional seeking a life partner who values family, faith, and personal growth. I believe in maintaining a balance between career aspirations and traditional values.",

  address: {
    present: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
      details: "House 15, Road 7, Dhanmondi R/A",
    },
    permanent: {
      division: "Chittagong",
      district: "Chittagong",
      upazila: "Kotwali",
      details: "Village: Halishahar, Post: Chittagong",
    },
    country: "Bangladesh",
  },

  education: {
    sscYear: "2015",
    sscGroup: "Science",
    sscResult: "GPA 5.00",
    hscYear: "2017",
    hscGroup: "Science",
    hscResult: "GPA 5.00",
    honours: "MBBS from Dhaka Medical College",
  },

  familyInfo: {
    fatherAlive: "Yes",
    fatherOccupation: "Business Owner",
    motherAlive: "Yes",
    motherOccupation: "Teacher",
    brothers: "1",
    sisters: "1",
    siblingsDetails: "1 elder brother (married), 1 younger sister (student)",
  },

  personalInfo: {
    beard: "N/A",
    salat: "Regular",
    mahramTravel: "Yes",
    health: "Excellent",
    disability: "None",
  },

  physicalInfo: {
    height: "5'6\"",
    bodyColor: "Fair",
    bloodGroup: "O+",
    weight: "58 kg",
  },

  maritalInfo: {
    maritalStatus: "Never Married",
    childAllow: "Yes",
    whyWantToMarry:
      "To complete half of my deen and build a beautiful family together",
    futurePlan:
      "Continue medical practice while raising a family with Islamic values",
  },

  contactInfo: {
    phone: "+880 1712-345678",
    email: "sarah.ahmed@email.com",
    facebook: "sarah.ahmed.official",
  },

  preference: {
    ageRange: "28-35 years",
    educationLevel: "Graduate or higher",
    maritalStatus: "Never married preferred",
    religiousPractice: "Practicing Muslim",
    physicalAppearance: "Average height, healthy",
    additionalQualities: "Family-oriented, honest, and career-minded",
  },

  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-20"),
};

export default function Profile() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const profileCompleteness = 92;
  const profileViews = 1247;
  const interests = 45;

  // Add this style injection
  //   React.useEffect(() => {
  //     const style = document.createElement("style")
  //     style.textContent = `
  //       .scrollbar-hide {
  //         -ms-overflow-style: none;
  //         scrollbar-width: none;
  //       }
  //       .scrollbar-hide::-webkit-scrollbar {
  //         display: none;
  //       }
  //     `
  //     document.head.appendChild(style)
  //     return () => document.head.removeChild(style)
  //   }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const InfoCard = ({
    title,
    icon: Icon,
    children,
    className = "",
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
    className?: string;
  }) => (
    <Card
      className={`border-rose-100 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Icon className="h-5 w-5 mr-2 text-rose-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );

  const InfoRow = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string | undefined;
    icon?: any;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-100 last:border-b-0 space-y-1 sm:space-y-0">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span className="text-gray-600 font-medium text-sm sm:text-base">
          {label}:
        </span>
      </div>
      <span className="text-gray-800 font-semibold text-sm sm:text-base break-words">
        {value || "Not specified"}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-rose-100">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-rose-600 hover:bg-rose-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              {/* <div className="flex items-center space-x-2">
                <Label htmlFor="profile-visibility" className="text-sm font-medium">
                  Profile Visible
                </Label>
                <Switch id="profile-visibility" checked={profileVisibility} onCheckedChange={setProfileVisibility} />
              </div> */}
              <Link href={"/profile/update"}>
                <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 cursor-pointer text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-rose-100 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-32 w-32 rounded-2xl shadow-lg ring-4 ring-rose-100">
                    <AvatarImage
                      src="/placeholder.svg?height=128&width=128"
                      alt={mockProfile.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-rose-500 to-rose-600 text-white text-2xl font-bold rounded-2xl">
                      {getInitials(mockProfile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                    {mockProfile.name}
                    <Shield className="h-5 w-5 ml-2 text-blue-500" />
                    <Crown className="h-5 w-5 ml-1 text-amber-500" />
                  </h1>
                  <p className="text-gray-600">
                    {mockProfile.education?.honours}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {mockProfile.address?.present?.district},{" "}
                      {mockProfile.address?.country}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-2 mb-4">
                  <Badge className="bg-green-100 text-green-700">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                  <Badge className="bg-amber-100 text-amber-700">Premium</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-600">
                      {profileViews}
                    </div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">
                      {interests}
                    </div>
                    <div className="text-sm text-gray-600">Interests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completeness */}
            <Card className="border-rose-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      Profile Completeness
                    </h3>
                    <span className="text-2xl font-bold text-rose-600">
                      {profileCompleteness}%
                    </span>
                  </div>
                  <Progress value={profileCompleteness} className="h-3" />
                  <p className="text-sm text-gray-600">
                    Complete your profile to get more visibility and better
                    matches.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-rose-100">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <Button
                  variant="outline"
                  className="w-full justify-start border-rose-200 hover:bg-rose-50 bg-transparent"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View Messages
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-rose-200 hover:bg-rose-50 bg-transparent"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  My Interests
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-rose-200 hover:bg-rose-50 bg-transparent"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="w-full">
              {/* Mobile Tab Navigation - Horizontal Scroll */}
              <div className="block md:hidden mb-6">
                <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
                  {[
                    { value: "overview", label: "Overview", icon: User },
                    { value: "personal", label: "Personal", icon: BookOpen },
                    { value: "family", label: "Family", icon: Users },
                    {
                      value: "education",
                      label: "Education",
                      icon: GraduationCap,
                    },
                    { value: "contact", label: "Contact", icon: Phone },
                    { value: "preferences", label: "Preferences", icon: Heart },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.value
                          ? "bg-rose-600 text-white shadow-lg"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Tab Navigation */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="hidden md:grid w-full grid-cols-6 bg-rose-50 mb-8">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="personal"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="family"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Family
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Contact
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                  >
                    Preferences
                  </TabsTrigger>
                </TabsList>

                {/* Tab Content - Same for both mobile and desktop */}
                <div className="space-y-6 overflow-x-auto">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {/* About Me */}
                      <Card className="border-rose-100">
                        <CardHeader>
                          <CardTitle className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                            <User className="h-5 w-5 mr-2 text-rose-600" />
                            About Me
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                            {mockProfile.description}
                          </p>
                        </CardContent>
                      </Card>

                      {/* Key Information Grid */}
                      <div className="grid grid-cols-1 gap-6">
                        <InfoCard title="Physical Information" icon={Activity}>
                          <div className="grid grid-cols-2 gap-4">
                            <InfoRow
                              label="Height"
                              value={mockProfile.physicalInfo?.height}
                            />
                            <InfoRow
                              label="Weight"
                              value={mockProfile.physicalInfo?.weight}
                            />
                            <InfoRow
                              label="Body Color"
                              value={mockProfile.physicalInfo?.bodyColor}
                            />
                            <InfoRow
                              label="Blood Group"
                              value={mockProfile.physicalInfo?.bloodGroup}
                            />
                          </div>
                        </InfoCard>

                        <InfoCard title="Marital Status" icon={Heart}>
                          <InfoRow
                            label="Status"
                            value={mockProfile.maritalInfo?.maritalStatus}
                          />
                          <InfoRow
                            label="Children Allowed"
                            value={mockProfile.maritalInfo?.childAllow}
                          />
                          <div className="pt-3">
                            <p className="text-sm text-gray-600 font-medium mb-2">
                              Why want to marry:
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {mockProfile.maritalInfo?.whyWantToMarry}
                            </p>
                          </div>
                        </InfoCard>
                      </div>

                      {/* Address Information */}
                      <InfoCard title="Address Information" icon={MapPin}>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">
                              Present Address
                            </h4>
                            <div className="space-y-2">
                              <InfoRow
                                label="Division"
                                value={mockProfile.address?.present?.division}
                              />
                              <InfoRow
                                label="District"
                                value={mockProfile.address?.present?.district}
                              />
                              <InfoRow
                                label="Upazila"
                                value={mockProfile.address?.present?.upazila}
                              />
                              <InfoRow
                                label="Details"
                                value={mockProfile.address?.present?.details}
                              />
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">
                              Permanent Address
                            </h4>
                            <div className="space-y-2">
                              <InfoRow
                                label="Division"
                                value={mockProfile.address?.permanent?.division}
                              />
                              <InfoRow
                                label="District"
                                value={mockProfile.address?.permanent?.district}
                              />
                              <InfoRow
                                label="Upazila"
                                value={mockProfile.address?.permanent?.upazila}
                              />
                              <InfoRow
                                label="Details"
                                value={mockProfile.address?.permanent?.details}
                              />
                            </div>
                          </div>
                        </div>
                      </InfoCard>
                    </div>
                  )}

                  {/* Personal Tab */}
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <InfoCard title="Religious Practice" icon={BookOpen}>
                          <InfoRow
                            label="Salat"
                            value={mockProfile.personalInfo?.salat}
                          />
                          <InfoRow
                            label="Mahram Travel"
                            value={mockProfile.personalInfo?.mahramTravel}
                          />
                          <InfoRow
                            label="Beard"
                            value={mockProfile.personalInfo?.beard}
                          />
                        </InfoCard>

                        <InfoCard title="Health Information" icon={Activity}>
                          <InfoRow
                            label="Health Status"
                            value={mockProfile.personalInfo?.health}
                          />
                          <InfoRow
                            label="Disability"
                            value={mockProfile.personalInfo?.disability}
                          />
                        </InfoCard>
                      </div>

                      <InfoCard title="Future Plans" icon={Star}>
                        <div className="bg-rose-50 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">
                            {mockProfile.maritalInfo?.futurePlan}
                          </p>
                        </div>
                      </InfoCard>
                    </div>
                  )}

                  {/* Family Tab */}
                  {activeTab === "family" && (
                    <div className="space-y-6">
                      <InfoCard title="Family Information" icon={Users}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <InfoRow
                                label="Father Status"
                                value={mockProfile.familyInfo?.fatherAlive}
                              />
                              <InfoRow
                                label="Father's Occupation"
                                value={mockProfile.familyInfo?.fatherOccupation}
                              />
                              <InfoRow
                                label="Mother Status"
                                value={mockProfile.familyInfo?.motherAlive}
                              />
                              <InfoRow
                                label="Mother's Occupation"
                                value={mockProfile.familyInfo?.motherOccupation}
                              />
                            </div>
                            <div className="space-y-3">
                              <InfoRow
                                label="Brothers"
                                value={mockProfile.familyInfo?.brothers}
                              />
                              <InfoRow
                                label="Sisters"
                                value={mockProfile.familyInfo?.sisters}
                              />
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">
                              Siblings Details
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-700">
                                {mockProfile.familyInfo?.siblingsDetails}
                              </p>
                            </div>
                          </div>
                        </div>
                      </InfoCard>
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === "education" && (
                    <div className="space-y-6">
                      <InfoCard
                        title="Educational Background"
                        icon={GraduationCap}
                      >
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-800 mb-3">
                                SSC
                              </h4>
                              <div className="space-y-2">
                                <InfoRow
                                  label="Year"
                                  value={mockProfile.education?.sscYear}
                                />
                                <InfoRow
                                  label="Group"
                                  value={mockProfile.education?.sscGroup}
                                />
                                <InfoRow
                                  label="Result"
                                  value={mockProfile.education?.sscResult}
                                />
                              </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                              <h4 className="font-semibold text-green-800 mb-3">
                                HSC
                              </h4>
                              <div className="space-y-2">
                                <InfoRow
                                  label="Year"
                                  value={mockProfile.education?.hscYear}
                                />
                                <InfoRow
                                  label="Group"
                                  value={mockProfile.education?.hscGroup}
                                />
                                <InfoRow
                                  label="Result"
                                  value={mockProfile.education?.hscResult}
                                />
                              </div>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-4">
                              <h4 className="font-semibold text-purple-800 mb-3">
                                Higher Education
                              </h4>
                              <p className="text-purple-700 font-medium">
                                {mockProfile.education?.honours}
                              </p>
                            </div>
                          </div>
                        </div>
                      </InfoCard>
                    </div>
                  )}

                  {/* Contact Tab */}
                  {activeTab === "contact" && (
                    <div className="space-y-6">
                      <InfoCard title="Contact Information" icon={Phone}>
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-green-50 rounded-lg space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                              <Phone className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-gray-800">
                                  Phone Number
                                </p>
                                <p className="text-green-700 font-semibold">
                                  {mockProfile.contactInfo.phone}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                            >
                              Call Now
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-blue-50 rounded-lg space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium text-gray-800">
                                  Email Address
                                </p>
                                <p className="text-blue-700 font-semibold break-all">
                                  {mockProfile.contactInfo.email}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
                            >
                              Send Email
                            </Button>
                          </div>

                          {mockProfile.contactInfo.facebook && (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-indigo-50 rounded-lg space-y-3 sm:space-y-0">
                              <div className="flex items-center space-x-3">
                                <Facebook className="h-5 w-5 text-indigo-600" />
                                <div>
                                  <p className="font-medium text-gray-800">
                                    Facebook
                                  </p>
                                  <p className="text-indigo-700 font-semibold break-all">
                                    {mockProfile.contactInfo.facebook}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-transparent w-full sm:w-auto"
                              >
                                Visit Profile
                              </Button>
                            </div>
                          )}
                        </div>
                      </InfoCard>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <InfoCard title="Partner Preferences" icon={Heart}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-3">
                              <InfoRow
                                label="Age Range"
                                value={mockProfile.preference?.ageRange}
                              />
                              <InfoRow
                                label="Education Level"
                                value={mockProfile.preference?.educationLevel}
                              />
                              <InfoRow
                                label="Marital Status"
                                value={mockProfile.preference?.maritalStatus}
                              />
                              <InfoRow
                                label="Religious Practice"
                                value={
                                  mockProfile.preference?.religiousPractice
                                }
                              />
                              <InfoRow
                                label="Physical Appearance"
                                value={
                                  mockProfile.preference?.physicalAppearance
                                }
                              />
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">
                              Additional Qualities
                            </h4>
                            <div className="bg-rose-50 rounded-lg p-4">
                              <p className="text-gray-700 leading-relaxed">
                                {mockProfile.preference?.additionalQualities}
                              </p>
                            </div>
                          </div>
                        </div>
                      </InfoCard>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
