"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Star,
  Shield,
  Camera,
  Globe,
  BookOpen,
  Music,
  Dumbbell,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/types/user";
import Image from "next/image";

// Mock profile data
const mockProfile: ProfileData = {
  id: "1",
  name: "Sarah Ahmed",
  age: 28,
  gender: "female",
  profileImage:
    "https://images.squarespace-cdn.com/content/v1/5b43ad2bf407b4a036d27f06/1667281317685-4HFC3N3NIYQMK25PM6P0/Nourhan+Ali.jpg",
  gallery: [
    "https://images.pexels.com/photos/19250805/pexels-photo-19250805/free-photo-of-dark-photo-of-a-muslim-girl-covering-her-eye-with-a-hand.jpeg",
    "https://static.vecteezy.com/system/resources/thumbnails/024/844/089/small_2x/beautiful-muslim-woman-wearing-hijab-stands-in-a-city-street-generative-ai-photo.jpg",
    "https://media.istockphoto.com/id/1196190943/photo/young-muslim-modern-woman-portrait.jpg?s=612x612&w=0&k=20&c=V6Kx9iAqy1_-u6rcuQpAxj7OkkbL_JtotxceuF3_RqI=",
    "https://plus.unsplash.com/premium_photo-1681492164528-71e8a8fdd51b?fm=jpg",
  ],
  isOnline: true,
  lastSeen: "Online now",
  verified: true,
  premium: true,
  profileViews: 1247,

  // Basic Information
  dateOfBirth: "March 15, 1996",
  height: "5'6\" (168 cm)",
  weight: "58 kg",
  bodyType: "Slim",
  complexion: "Fair",
  bloodGroup: "O+",
  physicalStatus: "Normal",

  // Location
  currentLocation: "New York, USA",
  hometown: "Cairo, Egypt",
  nationality: "American",

  // Education & Career
  education: "Master's Degree",
  educationDetails: "MD in Internal Medicine from Harvard Medical School",
  profession: "Doctor",
  workingWith: "Private Hospital",
  designation: "Senior Resident",
  annualIncome: "$120,000 - $150,000",
  workLocation: "Manhattan, New York",

  // Family
  familyType: "Nuclear Family",
  fatherOccupation: "Business Owner",
  motherOccupation: "Teacher",
  siblings: "1 Brother, 1 Sister",
  familyLocation: "Cairo, Egypt",
  familyValues: "Traditional yet Modern",

  // Religious & Cultural
  religion: "Islam",
  caste: "Not Specified",
  subCaste: "Not Specified",
  motherTongue: "Arabic",
  knownLanguages: ["Arabic", "English", "French"],

  // Lifestyle
  diet: "Halal",
  smoking: "Never",
  drinking: "Never",

  // Partner Preferences
  partnerAgeRange: "28 - 35 years",
  partnerHeight: "5'8\" - 6'2\"",
  partnerEducation: "Graduate or Higher",
  partnerProfession: "Doctor, Engineer, or Business",
  partnerLocation: "USA, Canada, or Middle East",
  partnerIncome: "$100,000+",

  // Personal
  bio: "I'm a dedicated healthcare professional who believes in balancing career ambitions with family values. I love traveling, reading, and spending quality time with loved ones. Looking for a life partner who shares similar values and dreams of building a beautiful family together.",
  interests: ["Reading", "Travel", "Cooking", "Photography", "Volunteering"],
  hobbies: ["Painting", "Yoga", "Hiking", "Learning Languages"],

  // Contact
  contactNumber: "+1 (555) 123-4567",
  email: "sarah.ahmed@email.com",
  socialMedia: {
    instagram: "@sarah_ahmed",
    linkedin: "sarah-ahmed-md",
  },

  // Additional
  createdBy: "Self",
  joinedDate: "January 2024",
  lastActive: "2 hours ago",
};

export default function SingleBiodata() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockProfile.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + mockProfile.gallery.length) % mockProfile.gallery.length
    );
  };

  const getInterestIcon = (interest: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Reading: <BookOpen className="h-4 w-4" />,
      Travel: <Globe className="h-4 w-4" />,
      Cooking: <Coffee className="h-4 w-4" />,
      Photography: <Camera className="h-4 w-4" />,
      Music: <Music className="h-4 w-4" />,
      Fitness: <Dumbbell className="h-4 w-4" />,
      Yoga: <Dumbbell className="h-4 w-4" />,
      Hiking: <Dumbbell className="h-4 w-4" />,
    };
    return iconMap[interest] || <Star className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/biodatas">
              <Button
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Profiles
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-rose-600 hover:bg-rose-50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Image & Gallery */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Image */}
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    src={
                      mockProfile.gallery[currentImageIndex] ||
                      mockProfile.profileImage
                    }
                    alt={mockProfile.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Arrows */}
                  {mockProfile.gallery.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {mockProfile.gallery.length}
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {mockProfile.isOnline && (
                      <Badge className="bg-green-500 text-white border-0">
                        <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></div>
                        Online
                      </Badge>
                    )}
                    {mockProfile.premium && (
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  {/* Verification Badge */}
                  {mockProfile.verified && (
                    <div className="absolute top-4 right-4">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Gallery Thumbnails */}
            {mockProfile.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {mockProfile.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-rose-500"
                        : "border-gray-200 hover:border-rose-300"
                    }`}
                  >
                    <Image
                      width={500}
                      height={500}
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg py-3">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`border-rose-200 hover:bg-rose-50 ${
                    isLiked
                      ? "bg-rose-50 text-rose-700 border-rose-300"
                      : "text-rose-700"
                  }`}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`border-rose-200 hover:bg-rose-50 ${
                    isSaved
                      ? "bg-rose-50 text-rose-700 border-rose-300"
                      : "text-rose-700"
                  }`}
                >
                  <Star
                    className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            {/* Profile Stats */}
            <Card className="border-rose-100">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-600">
                      {mockProfile.profileViews}
                    </div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">
                      <Eye className="h-5 w-5 inline mr-1" />
                      {mockProfile.isOnline ? "Online" : "Offline"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {mockProfile.lastSeen}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-rose-100">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                      {mockProfile.name}
                      {mockProfile.verified && (
                        <Shield className="ml-2 h-6 w-6 text-blue-500" />
                      )}
                    </h1>
                    <p className="text-lg text-gray-600 mt-1">
                      {mockProfile.age} years • {mockProfile.height}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      Profile ID: {mockProfile.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined: {mockProfile.joinedDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-rose-500" />
                    {mockProfile.currentLocation}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2 text-rose-500" />
                    {mockProfile.profession}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-2 text-rose-500" />
                    {mockProfile.education}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-rose-500" />
                    {mockProfile.religion}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {mockProfile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card className="border-rose-100">
              <Tabs defaultValue="basic" className="w-full">
                <CardHeader className="pb-4">
                  <TabsList className="grid w-full grid-cols-5 bg-rose-50">
                    <TabsTrigger
                      value="basic"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Basic
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="family"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Family
                    </TabsTrigger>
                    <TabsTrigger
                      value="lifestyle"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Lifestyle
                    </TabsTrigger>
                    <TabsTrigger
                      value="preferences"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Preferences
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  {/* Basic Information */}
                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Personal Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Date of Birth:
                            </span>
                            <span className="font-medium">
                              {mockProfile.dateOfBirth}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Height:</span>
                            <span className="font-medium">
                              {mockProfile.height}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight:</span>
                            <span className="font-medium">
                              {mockProfile.weight}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Body Type:</span>
                            <span className="font-medium">
                              {mockProfile.bodyType}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Complexion:</span>
                            <span className="font-medium">
                              {mockProfile.complexion}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Blood Group:</span>
                            <span className="font-medium">
                              {mockProfile.bloodGroup}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Location & Culture
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Current Location:
                            </span>
                            <span className="font-medium">
                              {mockProfile.currentLocation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hometown:</span>
                            <span className="font-medium">
                              {mockProfile.hometown}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nationality:</span>
                            <span className="font-medium">
                              {mockProfile.nationality}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Religion:</span>
                            <span className="font-medium">
                              {mockProfile.religion}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Mother Tongue:
                            </span>
                            <span className="font-medium">
                              {mockProfile.motherTongue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Languages:</span>
                            <span className="font-medium">
                              {mockProfile.knownLanguages.join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Education & Career */}
                  <TabsContent value="education" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Education
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Highest Education:
                            </span>
                            <span className="font-medium">
                              {mockProfile.education}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Details:</span>
                            <p className="font-medium mt-1">
                              {mockProfile.educationDetails}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Career
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profession:</span>
                            <span className="font-medium">
                              {mockProfile.profession}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Working With:</span>
                            <span className="font-medium">
                              {mockProfile.workingWith}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Designation:</span>
                            <span className="font-medium">
                              {mockProfile.designation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Annual Income:
                            </span>
                            <span className="font-medium">
                              {mockProfile.annualIncome}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Work Location:
                            </span>
                            <span className="font-medium">
                              {mockProfile.workLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Family Information */}
                  <TabsContent value="family" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                        Family Background
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Family Type:</span>
                            <span className="font-medium">
                              {mockProfile.familyType}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Father&apos;s Occupation:
                            </span>
                            <span className="font-medium">
                              {mockProfile.fatherOccupation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Mother&apos;s Occupation:
                            </span>
                            <span className="font-medium">
                              {mockProfile.motherOccupation}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Siblings:</span>
                            <span className="font-medium">
                              {mockProfile.siblings}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Family Location:
                            </span>
                            <span className="font-medium">
                              {mockProfile.familyLocation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Family Values:
                            </span>
                            <span className="font-medium">
                              {mockProfile.familyValues}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Lifestyle */}
                  <TabsContent value="lifestyle" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Lifestyle Choices
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Diet:</span>
                            <span className="font-medium">
                              {mockProfile.diet}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Smoking:</span>
                            <span className="font-medium">
                              {mockProfile.smoking}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Drinking:</span>
                            <span className="font-medium">
                              {mockProfile.drinking}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                          Interests & Hobbies
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <span className="text-gray-600 block mb-2">
                              Interests:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {mockProfile.interests.map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="secondary"
                                  className="bg-rose-100 text-rose-700"
                                >
                                  {getInterestIcon(interest)}
                                  <span className="ml-1">{interest}</span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 block mb-2">
                              Hobbies:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {mockProfile.hobbies.map((hobby) => (
                                <Badge
                                  key={hobby}
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-700"
                                >
                                  {getInterestIcon(hobby)}
                                  <span className="ml-1">{hobby}</span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Partner Preferences */}
                  <TabsContent value="preferences" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 border-b border-rose-100 pb-2">
                        Partner Preferences
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age Range:</span>
                            <span className="font-medium">
                              {mockProfile.partnerAgeRange}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Height:</span>
                            <span className="font-medium">
                              {mockProfile.partnerHeight}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Education:</span>
                            <span className="font-medium">
                              {mockProfile.partnerEducation}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profession:</span>
                            <span className="font-medium">
                              {mockProfile.partnerProfession}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">
                              {mockProfile.partnerLocation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Income:</span>
                            <span className="font-medium">
                              {mockProfile.partnerIncome}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
