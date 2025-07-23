// "use client";

// import * as React from "react";
// import {
//   Heart,
//   Users,
//   MapPin,
//   Star,
//   Eye,
//   Bookmark,
//   SlidersHorizontal,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import { ProfileSkeleton } from "@/components/common/Loader";
// import Image from "next/image";
// import Link from "next/link";

// interface FilterState {
//   lookingFor: "male" | "female" | "";
//   ageRange: [number, number];
//   religion: string;
//   profession: string;
//   location: string;
//   keyword: string;
//   sortBy: string;
// }

// interface Profile {
//   id: string;
//   name: string;
//   age: number;
//   gender: "male" | "female";
//   religion: string;
//   profession: string;
//   location: string;
//   education: string;
//   height: string;
//   image: string;
//   isOnline: boolean;
//   lastSeen: string;
//   verified: boolean;
//   premium: boolean;
//   bio: string;
//   interests: string[];
// }

// const religions = [
//   "Islam",
//   "Christianity",
//   "Hinduism",
//   "Buddhism",
//   "Judaism",
//   "Sikhism",
//   "Other",
//   "No Preference",
// ];

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

// // Mock data
// const mockProfiles: Profile[] = [
//   {
//     id: "1",
//     name: "Sarah Ahmed",
//     age: 28,
//     gender: "female",
//     religion: "Islam",
//     profession: "Doctor",
//     location: "New York, USA",
//     education: "MBBS",
//     height: "5'6\"",
//     image:
//       "https://images.squarespace-cdn.com/content/5b43ad2bf407b4a036d27f06/1636679004181-1O3LZ2E4GQGRKPUX69R8/myPicture%2B%25283%2529.jpg?format=1500w&content-type=image%2Fjpeg",
//     isOnline: true,
//     lastSeen: "Online now",
//     verified: true,
//     premium: true,
//     bio: "Looking for a life partner who shares similar values and dreams of building a beautiful family together.",
//     interests: ["Reading", "Travel", "Cooking", "Fitness"],
//   },
//   {
//     id: "2",
//     name: "Michael Johnson",
//     age: 32,
//     gender: "male",
//     religion: "Christianity",
//     profession: "Engineer",
//     location: "London, UK",
//     education: "Masters in Engineering",
//     height: "6'0\"",
//     image:
//       "https://www.sportspro.com/wp-content/uploads/2024/07/Michael-Johnson-3.jpg",
//     isOnline: false,
//     lastSeen: "2 hours ago",
//     verified: true,
//     premium: false,
//     bio: "Family-oriented person seeking a genuine connection with someone who values honesty and kindness.",
//     interests: ["Technology", "Sports", "Music", "Photography"],
//   },
//   {
//     id: "3",
//     name: "Priya Sharma",
//     age: 26,
//     gender: "female",
//     religion: "Hinduism",
//     profession: "Software Developer",
//     location: "Mumbai, India",
//     education: "B.Tech Computer Science",
//     height: "5'4\"",
//     image:
//       "https://k2infra.com/wp-content/uploads/2024/01/IMG-20240827-WA0013-e1736920112712-551x700.jpg",
//     isOnline: true,
//     lastSeen: "Online now",
//     verified: true,
//     premium: true,
//     bio: "Passionate about technology and life. Looking for someone who appreciates both tradition and modernity.",
//     interests: ["Coding", "Dance", "Movies", "Art"],
//   },
//   {
//     id: "4",
//     name: "David Wilson",
//     age: 30,
//     gender: "male",
//     religion: "Christianity",
//     profession: "Teacher",
//     location: "Toronto, Canada",
//     education: "Masters in Education",
//     height: "5'10\"",
//     image:
//       "https://www.barrowneuro.org/wp-content/uploads/Wilson_David-600x600.jpg",
//     isOnline: false,
//     lastSeen: "1 day ago",
//     verified: false,
//     premium: false,
//     bio: "Educator by profession, learner by nature. Seeking a partner who values education and personal growth.",
//     interests: ["Teaching", "Books", "Hiking", "Volunteering"],
//   },
//   {
//     id: "5",
//     name: "Fatima Al-Zahra",
//     age: 25,
//     gender: "female",
//     religion: "Islam",
//     profession: "Nurse",
//     location: "Dubai, UAE",
//     education: "Bachelor of Nursing",
//     height: "5'5\"",
//     image: "https://live.staticflickr.com/65535/52094686172_9b570aa58d_h.jpg",
//     isOnline: true,
//     lastSeen: "Online now",
//     verified: true,
//     premium: true,
//     bio: "Caring healthcare professional looking for a compassionate life partner to share life's journey.",
//     interests: ["Healthcare", "Charity", "Nature", "Family"],
//   },
//   {
//     id: "6",
//     name: "James Rodriguez",
//     age: 29,
//     gender: "male",
//     religion: "Christianity",
//     profession: "Business Owner",
//     location: "Madrid, Spain",
//     education: "MBA",
//     height: "5'11\"",
//     image:
//       "https://www.churchofjesuschrist.org/imgs/61468aca9ee4761249ee3aeb10152e2f539cb18d/full/!1280%2C1600/0/default",
//     isOnline: false,
//     lastSeen: "3 hours ago",
//     verified: true,
//     premium: false,
//     bio: "Entrepreneur with a passion for innovation. Looking for a supportive partner to build dreams together.",
//     interests: ["Business", "Travel", "Food", "Innovation"],
//   },
// ];

// export default function BiodatasPage() {
//   const [filters, setFilters] = React.useState<FilterState>({
//     lookingFor: "",
//     ageRange: [18, 40],
//     religion: "",
//     profession: "",
//     location: "",
//     keyword: "",
//     sortBy: "newest",
//   });

//   const [showFilters, setShowFilters] = React.useState(false);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [profiles, setProfiles] = React.useState<Profile[]>(mockProfiles);
//   const [savedProfiles, setSavedProfiles] = React.useState<string[]>([]);

//   const handleFilterChange = (key: keyof FilterState, value: unknown) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSearch = async () => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     // Filter profiles based on criteria
//     const filteredProfiles = mockProfiles.filter((profile) => {
//       if (filters.lookingFor && profile.gender !== filters.lookingFor)
//         return false;
//       if (
//         profile.age < filters.ageRange[0] ||
//         profile.age > filters.ageRange[1]
//       )
//         return false;
//       if (
//         filters.religion &&
//         profile.religion.toLowerCase() !== filters.religion
//       )
//         return false;
//       if (
//         filters.profession &&
//         profile.profession.toLowerCase().replace(/\s+/g, "-") !==
//           filters.profession
//       )
//         return false;
//       if (
//         filters.location &&
//         !profile.location.toLowerCase().includes(filters.location.toLowerCase())
//       )
//         return false;
//       if (
//         filters.keyword &&
//         !profile.name.toLowerCase().includes(filters.keyword.toLowerCase()) &&
//         !profile.profession
//           .toLowerCase()
//           .includes(filters.keyword.toLowerCase())
//       )
//         return false;
//       return true;
//     });

//     // Sort profiles
//     filteredProfiles.sort((a, b) => {
//       switch (filters.sortBy) {
//         case "age-asc":
//           return a.age - b.age;
//         case "age-desc":
//           return b.age - a.age;
//         case "active":
//           return a.isOnline ? -1 : 1;
//         case "premium":
//           return a.premium ? -1 : 1;
//         default:
//           return 0;
//       }
//     });

//     setProfiles(filteredProfiles);
//     setIsLoading(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       lookingFor: "",
//       ageRange: [18, 40],
//       religion: "",
//       profession: "",
//       location: "",
//       keyword: "",
//       sortBy: "newest",
//     });
//     setProfiles(mockProfiles);
//   };

//   const toggleSaveProfile = (profileId: string) => {
//     setSavedProfiles((prev) =>
//       prev.includes(profileId)
//         ? prev.filter((id) => id !== profileId)
//         : [...prev, profileId]
//     );
//   };

//   const getActiveFiltersCount = () => {
//     let count = 0;
//     if (filters.lookingFor) count++;
//     if (filters.religion) count++;
//     if (filters.profession) count++;
//     if (filters.location) count++;
//     if (filters.keyword) count++;
//     if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 40) count++;
//     return count;
//   };

//   React.useEffect(() => {
//     handleSearch();
//   }, [filters.sortBy]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
//       {/* Header */}
//       <div className="bg-white border-b border-rose-100 top-0">
//         <div className="container mx-auto px-4 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {/* Filter Toggle */}
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="border-rose-200 text-rose-700 hover:bg-rose-50"
//               >
//                 <SlidersHorizontal className="h-4 w-4 mr-2" />
//                 Filters{" "}
//                 {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters Panel */}
//       {showFilters && (
//         <div className="bg-white border-b border-rose-100 shadow-lg">
//           <div className="container mx-auto px-4 lg:px-8 py-6">
//             <Card className="border-rose-100">
//               <CardContent className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                   {/* Looking For */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-700 flex items-center">
//                       <Users className="h-4 w-4 mr-2 text-rose-500" />
//                       Looking For
//                     </Label>
//                     <RadioGroup
//                       value={filters.lookingFor}
//                       onValueChange={(value) =>
//                         handleFilterChange("lookingFor", value)
//                       }
//                       className="flex space-x-6"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="male"
//                           id="male"
//                           className="border-2 border-gray-300 text-rose-600"
//                         />
//                         <Label
//                           htmlFor="male"
//                           className="cursor-pointer font-medium"
//                         >
//                           Male
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="female"
//                           id="female"
//                           className="border-2 border-gray-300 text-rose-600"
//                         />
//                         <Label
//                           htmlFor="female"
//                           className="cursor-pointer font-medium"
//                         >
//                           Female
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {/* Religion */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-700">
//                       Religion
//                     </Label>
//                     <Select
//                       value={filters.religion}
//                       onValueChange={(value) =>
//                         handleFilterChange("religion", value)
//                       }
//                     >
//                       <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
//                         <SelectValue placeholder="Select religion" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {religions.map((religion) => (
//                           <SelectItem
//                             key={religion}
//                             value={religion.toLowerCase()}
//                           >
//                             {religion}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Profession */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-700">
//                       Profession
//                     </Label>
//                     <Select
//                       value={filters.profession}
//                       onValueChange={(value) =>
//                         handleFilterChange("profession", value)
//                       }
//                     >
//                       <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
//                         <SelectValue placeholder="Select profession" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {professions.map((profession) => (
//                           <SelectItem
//                             key={profession}
//                             value={profession
//                               .toLowerCase()
//                               .replace(/\s+/g, "-")}
//                           >
//                             {profession}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Location */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-700 flex items-center">
//                       <MapPin className="h-4 w-4 mr-2 text-rose-500" />
//                       Location
//                     </Label>
//                     <Input
//                       type="text"
//                       placeholder="City, State, Country"
//                       value={filters.location}
//                       onChange={(e) =>
//                         handleFilterChange("location", e.target.value)
//                       }
//                       className="border-2 w-full border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Age Range */}
//                 <div className="mb-6">
//                   <Label className="text-sm font-semibold text-gray-700 mb-4 block">
//                     Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}{" "}
//                     years
//                   </Label>
//                   <div className="px-4">
//                     <Slider
//                       value={filters.ageRange}
//                       onValueChange={(value) =>
//                         handleFilterChange("ageRange", value)
//                       }
//                       max={70}
//                       min={18}
//                       step={1}
//                       className="w-full"
//                     />
//                     <div className="flex justify-between text-sm text-gray-500 mt-2">
//                       <span>18</span>
//                       <span>70</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Filter Actions */}
//                 <div className="flex justify-between items-center">
//                   <Button
//                     variant="ghost"
//                     onClick={clearFilters}
//                     className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
//                   >
//                     Clear All Filters
//                   </Button>
//                   <Button
//                     onClick={handleSearch}
//                     className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-8"
//                   >
//                     Apply Filters
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       )}

//       {/* Results */}
//       <div className="container mx-auto px-4 lg:px-8 py-8">
//         {isLoading ? (
//           <div
//             className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
//           >
//             {[...Array(6)].map((_, i) => (
//               <ProfileSkeleton key={i} />
//             ))}
//           </div>
//         ) : profiles.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="h-24 w-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Users className="h-12 w-12 text-rose-500" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">
//               No Profiles Found
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your filters to see more results
//             </p>
//             <Button
//               onClick={clearFilters}
//               className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
//             >
//               Clear Filters
//             </Button>
//           </div>
//         ) : (
//           <>
//             {/* Results Header */}
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-gray-600">
//                 Showing {profiles.length}{" "}
//                 {profiles.length === 1 ? "profile" : "profiles"}
//                 {getActiveFiltersCount() > 0 && " (filtered)"}
//               </p>
//               <div className="flex items-center space-x-2">
//                 <Badge
//                   variant="secondary"
//                   className="bg-rose-100 text-rose-700"
//                 >
//                   {profiles.filter((p) => p.isOnline).length} Online
//                 </Badge>
//                 <Badge
//                   variant="secondary"
//                   className="bg-amber-100 text-amber-700"
//                 >
//                   {profiles.filter((p) => p.premium).length} Premium
//                 </Badge>
//               </div>
//             </div>

//             {/* Profiles Grid/List */}
//             <div
//               className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
//             >
//               {profiles.map((profile) => (
//                 <Card
//                   key={profile.id}
//                   className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
//                 >
//                   <div className="relative">
//                     {/* Profile Image */}
//                     <div className="relative h-64 overflow-hidden">
//                       <Image
//                         src={profile.image || "/placeholder.svg"}
//                         alt={profile.name}
//                         height={500}
//                         width={500}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />

//                       {/* Online Status */}
//                       {profile.isOnline && (
//                         <div className="absolute top-4 left-4">
//                           <Badge className="bg-green-500 text-white border-0">
//                             <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></div>
//                             Online
//                           </Badge>
//                         </div>
//                       )}

//                       {/* Premium Badge */}
//                       {profile.premium && (
//                         <div className="absolute top-4 right-4">
//                           <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0">
//                             <Star className="h-3 w-3 mr-1 fill-current" />
//                             Premium
//                           </Badge>
//                         </div>
//                       )}

//                       {/* Save Button */}
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => toggleSaveProfile(profile.id)}
//                         className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-rose-600 rounded-full"
//                       >
//                         <Bookmark
//                           className={`h-4 w-4 ${
//                             savedProfiles.includes(profile.id)
//                               ? "fill-current text-rose-600"
//                               : ""
//                           }`}
//                         />
//                       </Button>
//                     </div>

//                     <CardContent className="p-6">
//                       {/* Profile Header */}
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                           <div>
//                             <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                               {profile.name}
//                               {profile.verified && (
//                                 <div className="ml-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
//                                   <div className="h-2 w-2 bg-white rounded-full"></div>
//                                 </div>
//                               )}
//                             </h3>
//                             <p className="text-gray-600">
//                               {profile.age} years • {profile.height}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Profile Details */}
//                       <div className="space-y-3 mb-4">
//                         <div className="flex items-center text-gray-600">
//                           <MapPin className="h-4 w-4 mr-2 text-rose-500" />
//                           {profile.location}
//                         </div>
//                         <div className="flex items-center text-gray-600">
//                           <Users className="h-4 w-4 mr-2 text-rose-500" />
//                           {profile.profession} • {profile.education}
//                         </div>
//                         <div className="text-gray-600">
//                           <span className="font-medium">Religion:</span>{" "}
//                           {profile.religion}
//                         </div>
//                       </div>

//                       {/* Bio */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {profile.bio}
//                       </p>

//                       {/* Interests */}
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {profile.interests.slice(0, 3).map((interest) => (
//                           <Badge
//                             key={interest}
//                             variant="secondary"
//                             className="bg-rose-100 text-rose-700 text-xs"
//                           >
//                             {interest}
//                           </Badge>
//                         ))}
//                         {profile.interests.length > 3 && (
//                           <Badge
//                             variant="secondary"
//                             className="bg-gray-100 text-gray-600 text-xs"
//                           >
//                             +{profile.interests.length - 3} more
//                           </Badge>
//                         )}
//                       </div>

//                       {/* Last Seen */}
//                       <p className="text-xs text-gray-500 mb-4">
//                         {profile.lastSeen}
//                       </p>

//                       {/* Action Buttons */}
//                       <div className="flex space-x-2">
//                         <Link
//                           href={`/biodatas/${profile.id}`}
//                           className="flex-1"
//                         >
//                           <Button className="flex-1 primary-btn w-full">
//                             <Eye className="h-4 w-4 mr-2" />
//                             View Profile
//                           </Button>
//                         </Link>
//                         <Button
//                           variant="outline"
//                           className="border-rose-200 text-rose-700 hover:bg-rose-50 bg-transparent"
//                         >
//                           <Heart className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </div>
//                 </Card>
//               ))}
//             </div>

//             {/* Load More */}
//             <div className="text-center mt-12">
//               <Button
//                 variant="outline"
//                 className="border-rose-200 text-rose-700 hover:bg-rose-50 px-8 py-3 bg-transparent"
//               >
//                 Load More Profiles
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"use client"

import * as React from "react"
import Link from "next/link"
import {
  Heart,
  Users,
  MapPin,
  Eye,
  Bookmark,
  SlidersHorizontal,
  Briefcase,
  GraduationCap,
  Shield,
  Crown,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ProfileSkeleton } from "@/components/common/Loader"

interface FilterState {
  lookingFor: "male" | "female" | ""
  ageRange: [number, number]
  religion: string
  profession: string
  location: string
  keyword: string
  sortBy: string
}

interface Profile {
  id: string
  name: string
  age: number
  gender: "male" | "female"
  religion: string
  profession: string
  location: string
  education: string
  height: string
  isOnline: boolean
  lastSeen: string
  verified: boolean
  premium: boolean
  bio: string
  interests: string[]
  income: string
  familyType: string
  motherTongue: string
  profileCompleteness: number
  joinedDate: string
  responseRate: number
}

const religions = ["Islam", "Christianity", "Hinduism", "Buddhism", "Judaism", "Sikhism", "Other", "No Preference"]

const professions = [
  "Doctor",
  "Engineer",
  "Teacher",
  "Business Owner",
  "Software Developer",
  "Lawyer",
  "Accountant",
  "Nurse",
  "Architect",
  "Designer",
  "Marketing Professional",
  "Sales Professional",
  "Government Employee",
  "Student",
  "Other",
  "Any Profession",
]

// Mock data with enhanced professional details
const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    age: 28,
    gender: "female",
    religion: "Islam",
    profession: "Doctor",
    location: "New York, USA",
    education: "MBBS, MD",
    height: "5'6\"",
    isOnline: true,
    lastSeen: "Online now",
    verified: true,
    premium: true,
    bio: "Dedicated healthcare professional seeking a life partner who values family, faith, and personal growth.",
    interests: ["Reading", "Travel", "Cooking", "Photography"],
    income: "$120,000 - $150,000",
    familyType: "Nuclear Family",
    motherTongue: "Arabic",
    profileCompleteness: 95,
    joinedDate: "Jan 2024",
    responseRate: 85,
  },
  {
    id: "2",
    name: "Michael Johnson",
    age: 32,
    gender: "male",
    religion: "Christianity",
    profession: "Software Engineer",
    location: "London, UK",
    education: "Masters in Computer Science",
    height: "6'0\"",
    isOnline: false,
    lastSeen: "2 hours ago",
    verified: true,
    premium: false,
    bio: "Tech enthusiast and family-oriented person looking for a genuine connection with shared values.",
    interests: ["Technology", "Sports", "Music", "Photography"],
    income: "$80,000 - $100,000",
    familyType: "Joint Family",
    motherTongue: "English",
    profileCompleteness: 88,
    joinedDate: "Dec 2023",
    responseRate: 72,
  },
    {
    id: "2",
    name: "Michael Johnson",
    age: 32,
    gender: "male",
    religion: "Christianity",
    profession: "Software Engineer",
    location: "London, UK",
    education: "Masters in Computer Science",
    height: "6'0\"",
    isOnline: false,
    lastSeen: "2 hours ago",
    verified: true,
    premium: false,
    bio: "Tech enthusiast and family-oriented person looking for a genuine connection with shared values.",
    interests: ["Technology", "Sports", "Music", "Photography"],
    income: "$80,000 - $100,000",
    familyType: "Joint Family",
    motherTongue: "English",
    profileCompleteness: 88,
    joinedDate: "Dec 2023",
    responseRate: 72,
  },
  {
    id: "3",
    name: "Priya Sharma",
    age: 26,
    gender: "female",
    religion: "Hinduism",
    profession: "Software Developer",
    location: "Mumbai, India",
    education: "B.Tech Computer Science",
    height: "5'4\"",
    isOnline: true,
    lastSeen: "Online now",
    verified: true,
    premium: true,
    bio: "Passionate about technology and traditional values. Seeking a partner who appreciates both innovation and culture.",
    interests: ["Coding", "Dance", "Movies", "Art"],
    income: "$40,000 - $60,000",
    familyType: "Nuclear Family",
    motherTongue: "Hindi",
    profileCompleteness: 92,
    joinedDate: "Feb 2024",
    responseRate: 90,
  },
]

export default function ProfessionalBiodatasPage() {
  const [filters, setFilters] = React.useState<FilterState>({
    lookingFor: "",
    ageRange: [18, 40],
    religion: "",
    profession: "",
    location: "",
    keyword: "",
    sortBy: "newest",
  })

  const [showFilters, setShowFilters] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [profiles, setProfiles] = React.useState<Profile[]>(mockProfiles)
  const [savedProfiles, setSavedProfiles] = React.useState<string[]>([])

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const clearFilters = () => {
    setFilters({
      lookingFor: "",
      ageRange: [18, 40],
      religion: "",
      profession: "",
      location: "",
      keyword: "",
      sortBy: "newest",
    })
    setProfiles(mockProfiles)
  }

  const toggleSaveProfile = (profileId: string) => {
    setSavedProfiles((prev) =>
      prev.includes(profileId) ? prev.filter((id) => id !== profileId) : [...prev, profileId],
    )
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.lookingFor) count++
    if (filters.religion) count++
    if (filters.profession) count++
    if (filters.location) count++
    if (filters.keyword) count++
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 40) count++
    return count
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getProfileColor = (name: string) => {
    const colors = [
      "from-rose-400 to-rose-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-amber-400 to-amber-600",
      "from-teal-400 to-teal-600",
    ]
    const index = name.length % colors.length
    return colors[index]
  }

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
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
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
                      onValueChange={(value) => handleFilterChange("lookingFor", value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" className="border-2 border-gray-300 text-rose-600" />
                        <Label htmlFor="male" className="cursor-pointer font-medium">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" className="border-2 border-gray-300 text-rose-600" />
                        <Label htmlFor="female" className="cursor-pointer font-medium">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Religion */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Religion</Label>
                    <Select value={filters.religion} onValueChange={(value) => handleFilterChange("religion", value)}>
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {religions.map((religion) => (
                          <SelectItem key={religion} value={religion.toLowerCase()}>
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profession */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Profession</Label>
                    <Select
                      value={filters.profession}
                      onValueChange={(value) => handleFilterChange("profession", value)}
                    >
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select profession" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem key={profession} value={profession.toLowerCase().replace(/\s+/g, "-")}>
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="border-2 w-full border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-sm"
                    />
                  </div>
                </div>

                {/* Age Range */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                    Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years
                  </Label>
                  <div className="px-4">
                    <Slider
                      value={filters.ageRange}
                      onValueChange={(value) => handleFilterChange("ageRange", value)}
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
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <ProfileSkeleton key={i} />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-24 w-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-rose-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Profiles Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <Button
              onClick={clearFilters}
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {profiles.length} {profiles.length === 1 ? "profile" : "profiles"}
                {getActiveFiltersCount() > 0 && " (filtered)"}
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-rose-100 text-rose-700">
                  {profiles.filter((p) => p.isOnline).length} Online
                </Badge>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {profiles.filter((p) => p.premium).length} Premium
                </Badge>
              </div>
            </div>

            {/* Professional Profiles Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile) => (
                <Card
                  key={profile.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg overflow-hidden relative"
                >
                  {/* Premium Ribbon */}
                  {profile.premium && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                        <Crown className="h-3 w-3 inline mr-1" />
                        PREMIUM
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      {/* Profile Avatar with Initials */}
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-16 w-16 rounded-full bg-gradient-to-br ${getProfileColor(
                            profile.name,
                          )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {getInitials(profile.name)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
                            {profile.verified && (
                              <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Shield className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">
                            {profile.age} years • {profile.height}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Professional Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{profile.profession}</p>
                            <p className="text-xs text-gray-500">{profile.income}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{profile.education}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{profile.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-rose-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800">{profile.religion}</p>
                            <p className="text-xs text-gray-500">{profile.motherTongue}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{profile.bio}</p>
                    </div>
                    {/* Interests */}
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="secondary" className="bg-rose-100 text-rose-700 text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                          +{profile.interests.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <Link href={`/biodata/${profile.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleSaveProfile(profile.id)}
                        className={`border-rose-200 hover:bg-rose-50 ${
                          savedProfiles.includes(profile.id) ? "bg-rose-50 text-rose-700" : "text-rose-700"
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${savedProfiles.includes(profile.id) ? "fill-current" : ""}`} />
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
              >
                Load More Profiles
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
