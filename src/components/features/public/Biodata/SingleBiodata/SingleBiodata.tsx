"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Profile } from "@/types/bioData";
import { useAuth } from "@/app/(auth)/context/auth-context";
import femaleAvatar from "../../../../../../public/men_avatar.webp";
import maleAvatar from "../../../../../../public/female_avatar.jpg";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Heart,
  MapPin,
  Target,
  User,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BiodataType } from "@/types/publicBiodata";

export default function Biodata({ id }: { id: string }) {
  const [biodata, setBiodata] = React.useState<BiodataType | undefined>();
  // Translation function
  const { language } = useLanguage();
  const t = biodataTranslation[language];

  const { user } = useAuth();
  React.useEffect(() => {
    const getbiodata = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/biodata/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setBiodata(response.data?.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getbiodata();
  }, [id]);
  const handleSendInterest = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/interest/send`,
        {
          sender: user?.userId,
          receiverId: biodata?.userId?._id,
          status: "sent",
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Interest sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending interest:", error);
    }
  };

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
    icon: React.ElementType;
    children: React.ReactNode;
    className?: string;
  }) => (
    <Card
      className={`border-emerald-100 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Icon className="h-5 w-5 mr-2 text-emerald-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );

  console.log(biodata);

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
                          : maleAvatar.src
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

                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-600 dark:text-gray-300">
                        {t.singleBiodata?.typesOfBiodata}
                      </TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-100">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                        >
                          {biodata?.gender === "male"
                            ? t.singleBiodata?.maleBiodata
                            : t.singleBiodata?.femaleBiodata}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-600 dark:text-gray-300">
                        {t.personalInformation?.age}
                      </TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-100">
                        {biodata?.age}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-600 dark:text-gray-300">
                        {t.expectedLifePartner?.complexion}
                      </TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.complexion}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-600 dark:text-gray-300">
                        {t.singleBiodata?.nationality}
                      </TableCell>
                      <TableCell className="text-right text-gray-800 dark:text-gray-100">
                        {biodata?.address?.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              <Heart className="w-4 h-4 mr-2" />
              {t.sendInterest}
            </Button>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.address?.permanentAddress}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.address?.permanent?.division},{" "}
                        {biodata?.address?.permanent?.district},{" "}
                        {biodata?.address?.permanent?.upazila},{" "}
                        {t.address?.address}:{" "}
                        {biodata?.address?.permanent?.address}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.address?.presentAddress}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.address?.present?.division},{" "}
                        {biodata?.address?.present?.district},{" "}
                        {biodata?.address?.present?.upazila},{" "}
                        {t.address?.address}:{" "}
                        {biodata?.address?.present?.address}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.address?.whereDidYouGrow}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.address?.grewUpAt}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.educationalQualification?.educationMethod}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.education?.method}
                      </TableCell>
                    </TableRow>
                    {biodata?.education?.history.map((edu, idx) => (
                      <TableRow
                        key={idx}
                        className="border-gray-200 dark:border-gray-700"
                      >
                        <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                          {edu.level === "SSC"
                            ? t.educationalQualification?.sscDakhilEqulalent
                            : edu.level === "HSC"
                            ? t.educationalQualification?.hscAlimEquivalent
                            : t.educationalQualification?.graduation}
                          :
                        </TableCell>
                        <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                          {edu.group} ({edu.year})
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.educationalQualification?.othersEducation}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.education?.other.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.fatherProfession}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.family?.fatherProfession}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.fatherAlive}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        <Badge
                          variant={
                            biodata?.family?.fatherAlive
                              ? "default"
                              : "destructive"
                          }
                        >
                          {biodata?.family?.fatherAlive ? "জীবিত" : "মৃত"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.motherAlive}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        <Badge
                          variant={
                            biodata?.family.motherAlive
                              ? "default"
                              : "destructive"
                          }
                        >
                          {biodata?.family?.motherAlive ? "জীবিত" : "মৃত"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.brother}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.family?.brothers}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.sister}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.family?.sisters} -{" "}
                        {biodata?.family?.sistersInfo.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.familyInformation?.familyStatus}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.family?.financialStatus}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.OccupationalInformation?.occupation}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.occupation?.current}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.OccupationalInformation?.profession}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.occupation?.description}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.OccupationalInformation?.income}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.occupation?.income.amount}{" "}
                        {biodata?.occupation?.income.currency}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.dressUp}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.dress}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.pray5times}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.prayerHabit}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.quranReading}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.quranReading}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.favoriteBooks}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.favoriteBooks.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.hobbies}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.hobbies.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.specialSkills}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.specialSkills}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.personalInformation?.diseases}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.personal?.healthIssues}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.marriageRelatedInformation?.guardiansAgree}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        <Badge
                          variant={
                            biodata?.marriage?.guardiansAgree
                              ? "default"
                              : "destructive"
                          }
                        >
                          {biodata?.marriage?.guardiansAgree ? "আছে" : "নেই"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.marriageRelatedInformation?.jobContinue}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.marriage?.jobStatus}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.marriageRelatedInformation?.studyContinue}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.marriage?.studyContinue}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.marriageRelatedInformation?.reason}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.marriage?.reason}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.age}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.ageRange} বছর
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.height}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.height}"
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.educationQualification}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.education}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.maritalStatus}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.maritalStatus}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.financialCondition}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.financialCondition}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.profession}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.profession}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.district}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.location}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.expectedLifePartner?.qualities}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.preference?.qualities.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Contact Information Section */}
            <Card className="border-gray-300 dark:border-gray-600">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl text-gray-800 dark:text-gray-100">
                  <FileText className="w-6 h-6 mr-2 text-emerald-600" />
                  {t.contactInfo?.contactInformation}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.contactInfo?.email}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.userId?.email}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableCell className="w-1/2 font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                        {t.contactInfo?.phone}:
                      </TableCell>
                      <TableCell className="w-1/2 text-gray-800 dark:text-gray-100">
                        {biodata?.userId?.phone}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
