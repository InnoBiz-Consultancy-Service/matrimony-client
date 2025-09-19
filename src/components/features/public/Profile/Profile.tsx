"use client";

import * as React from "react";
import {
  User,
  MapPin,
  GraduationCap,
  Users,
  Heart,
  Briefcase,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { BiodataType } from "@/types/publicBiodata";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";
import femaleAvatar from "../../../../../public/female_avatar.jpg";
import maleAvatar from "../../../../../public/men_avatar.webp";
import { PageLoader } from "@/components/common/Loader";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Profile() {
  const [biodata, setBiodata] = React.useState<BiodataType | undefined>();
  const [loading, setLoading] = React.useState(false);
  console.log(biodata);
  const { token, user } = useAuth();
  console.log(user);
  // Translation function
  const { language } = useLanguage();
  const t = biodataTranslation[language];

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/biodata/my-biodata`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        console.log(response);
        setBiodata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Profile Summary */}
          <div className="lg:w-1/3">
            <Card className="bg-yellow-500/10 dark:bg-yellow-500/5 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-40 w-40 ring-4 ring-white dark:ring-gray-700 shadow-lg">
                    <AvatarImage
                      src={
                        biodata?.gender === "male"
                          ? maleAvatar.src
                          : femaleAvatar.src
                      }
                      alt={biodata?.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white text-2xl font-bold">
                      {getInitials("asda")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                  {biodata?.name}
                </h2>

                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-3">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0">
                      {t.singleBiodata?.typesOfBiodata}
                    </div>
                    <div className="flex-1 text-right text-gray-800 dark:text-gray-100">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 whitespace-nowrap"
                      >
                        {biodata?.gender === "male"
                          ? t.singleBiodata?.maleBiodata
                          : t.singleBiodata?.femaleBiodata}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-3">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0">
                      {t.personalInformation?.age}
                    </div>
                    <div className="flex-1 text-right text-gray-800 dark:text-gray-100 break-words leading-relaxed">
                      {biodata?.age}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-3">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0">
                      {t.expectedLifePartner?.complexion}
                    </div>
                    <div className="flex-1 text-right text-gray-800 dark:text-gray-100 break-words leading-relaxed">
                      {biodata?.preference?.complexion}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-3">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0">
                      {t.singleBiodata?.nationality}
                    </div>
                    <div className="flex-1 text-right text-gray-800 dark:text-gray-100 break-words leading-relaxed">
                      {biodata?.address?.country}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href={"/profile/interest-request"}>
              <Button className="w-full mt-4 bg-emerald-600 dark:text-gray-100 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 cursor-pointer">
                Interest Request
              </Button>
            </Link>
            <div className="flex items-center space-x-7 mt-6 justify-center">
              <Link href={"/profile/my-sent-interest"}>
                <Button
                  className="cursor-pointer border-green-400"
                  variant="outline"
                >
                  My interest
                </Button>
              </Link>
              <Link href={"/profile/block-list"}>
                <Button
                  className="cursor-pointer border-red-400"
                  variant="outline"
                >
                  Block list
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Detailed Information */}
          <div className="lg:w-2/3 space-y-6">
            {/* Address Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <MapPin className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.address?.address}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.address?.permanentAddress}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.address?.permanent?.division},{" "}
                      {biodata?.address?.permanent?.district},{" "}
                      {biodata?.address?.permanent?.upazila},{" "}
                      {t.address?.address}:{" "}
                      {biodata?.address?.permanent?.address}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.address?.presentAddress}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.address?.present?.division},{" "}
                      {biodata?.address?.present?.district},{" "}
                      {biodata?.address?.present?.upazila}, {t.address?.address}
                      : {biodata?.address?.present?.address}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.address?.whereDidYouGrow}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.address?.grewUpAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <GraduationCap className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.educationalQualification?.educationalQualification}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.educationalQualification?.educationMethod}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.education?.method}
                    </div>
                  </div>
                  {biodata?.education?.history.map((edu, idx) => (
                    <div
                      key={idx}
                      className="flex border-b border-gray-200 dark:border-gray-700 py-4"
                    >
                      <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                        {edu.level === "SSC"
                          ? t.educationalQualification?.sscDakhilEqulalent
                          : edu.level === "HSC"
                          ? t.educationalQualification?.hscAlimEquivalent
                          : edu.level === "Graduation"
                          ? t.educationalQualification?.graduation
                          : edu.level === "Masters"
                          ? t.educationalQualification?.masters
                          : edu.level === "PhD"
                          ? t.educationalQualification?.phd
                          : "Prefer not say"}
                        :
                      </div>
                      <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                        {edu.level === "SSC" || edu.level === "HSC" ? (
                          <span>
                            {edu.group} ({edu.year})
                          </span>
                        ) : edu.level === "Graduation" ||
                          edu.level === "Masters" ||
                          edu.level === "PhD" ? (
                          <span className="flex flex-col">
                            {edu.subject} ({edu.year})
                            <small>({edu.institution})</small>
                          </span>
                        ) : (
                          <span>
                            {edu.level} ({edu.year})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.educationalQualification?.othersEducation}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.education?.other.join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <Users className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.familyInformation?.familyInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.fatherProfession}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.family?.fatherProfession}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.fatherAlive}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 pl-2">
                      <Badge
                        variant={
                          biodata?.family?.fatherAlive
                            ? "default"
                            : "destructive"
                        }
                        className="whitespace-nowrap"
                      >
                        {biodata?.family?.fatherAlive ? "জীবিত" : "মৃত"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.motherAlive}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 pl-2">
                      <Badge
                        variant={
                          biodata?.family.motherAlive
                            ? "default"
                            : "destructive"
                        }
                        className="whitespace-nowrap"
                      >
                        {biodata?.family?.motherAlive ? "জীবিত" : "মৃত"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.brother}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.family?.brothers}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.sister}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.family?.sisters} -{" "}
                      {biodata?.family?.sistersInfo.join(", ")}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.familyInformation?.familyStatus}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.family?.financialStatus}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Occupation Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <Briefcase className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.OccupationalInformation?.occupation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.OccupationalInformation?.occupation}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.occupation?.current}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.OccupationalInformation?.profession}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.occupation?.description}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.OccupationalInformation?.income}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.occupation?.income.amount}{" "}
                      {biodata?.occupation?.income.currency}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <User className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.personalInformation?.personalInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.dressUp}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.dress}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.pray5times}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.prayerHabit}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.quranReading}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.quranReading}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.favoriteBooks}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.favoriteBooks.join(", ")}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.hobbies}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.hobbies.join(", ")}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.specialSkills}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.specialSkills}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.personalInformation?.diseases}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.personal?.healthIssues}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marriage Information Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <Heart className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.marriageRelatedInformation?.marriageInfo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.marriageRelatedInformation?.guardiansAgree}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 pl-2">
                      <Badge
                        variant={
                          biodata?.marriage?.guardiansAgree
                            ? "default"
                            : "destructive"
                        }
                        className="whitespace-nowrap"
                      >
                        {biodata?.marriage?.guardiansAgree ? "আছে" : "নেই"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.marriageRelatedInformation?.jobContinue}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.marriage?.jobStatus}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.marriageRelatedInformation?.studyContinue}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.marriage?.studyContinue}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.marriageRelatedInformation?.reason}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.marriage?.reason}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preference Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <Target className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.expectedLifePartner?.expectedPartner}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.age}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.ageRange} বছর
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.height}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.height}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.educationQualification}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.education}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.maritalStatus}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.maritalStatus}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.financialCondition}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.financialCondition}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.profession}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.profession}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.district}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.location}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.expectedLifePartner?.qualities}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.preference?.qualities.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mt-6">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.contactInfo?.email}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.userId?.email}
                    </div>
                  </div>
                  <div className="flex border-b border-gray-200 dark:border-gray-700 py-4">
                    <div className="w-2/5 font-medium text-gray-600 dark:text-gray-300 pr-4 flex-shrink-0 leading-relaxed border-r border-gray-200 dark:border-gray-700">
                      {t.contactInfo?.phone}:
                    </div>
                    <div className="flex-1 text-gray-800 dark:text-gray-100 break-words leading-relaxed pl-2">
                      {biodata?.userId?.phone}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
