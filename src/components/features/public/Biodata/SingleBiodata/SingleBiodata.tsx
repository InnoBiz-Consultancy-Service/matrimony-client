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
  Camera,
  Star,
  Crown,
  Activity,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Profile } from "@/types/bioData";
import { useAuth } from "@/app/(auth)/context/auth-context";
import femaleAvatar from "../../../../../../public/men_avatar.webp";
import maleAvatar from "../../../../../../public/female_avatar.jpg";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";

export default function Biodata({ id }: { id: string }) {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [biodata, setBiodata] = React.useState<Profile | undefined>();

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
  // console.log(biodata?.userId?._id)
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
  const biodataViews = 1247;
  const interests = 45;

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

  const InfoRow = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string | undefined;
    icon?: React.ElementType;
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

  console.log(biodata);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 ">
      <div className="flex container mx-auto px-4">
        <div className="w-[30%]">
          <div className="border bg-yellow-500/10 p-6 my-4">
            <div className="flex justify-center items-center">
              <Avatar className="h-40 w-40 rounded-full ring-white dark:ring-gray-800 shadow-md mt-12">
                <AvatarImage
                  src={
                    biodata?.gender === "male"
                      ? maleAvatar.src
                      : femaleAvatar.src
                  }
                  alt={biodata?.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold">
                  {getInitials(user?.name || "")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-center">
                {biodata?.name}
              </h2>
            </div>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-left">
                      {t.singleBiodata?.typesOfBiodata}:
                    </TableCell>
                    {biodata?.gender === "male" ? (
                      <TableCell className="text-right">
                        {t.singleBiodata?.maleBiodata}
                      </TableCell>
                    ) : (
                      <TableCell className="text-right">
                        {t.singleBiodata?.femaleBiodata}
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left">
                      {t.singleBiodata?.age}:
                    </TableCell>
                    <TableCell className="text-right">{biodata?.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left">
                      {t.singleBiodata?.complexion}:
                    </TableCell>
                    <TableCell className="text-right">
                      {biodata?.preference?.complexion}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left">
                      {t.singleBiodata?.nationality}:
                    </TableCell>
                    <TableCell className="text-right">
                      {t.singleBiodata?.bangladeshi}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full">Send Interest</Button>
          </div>
        </div>
        <div className="w-[70%]">right side</div>
      </div>
    </div>
  );
}
