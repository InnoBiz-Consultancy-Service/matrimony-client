"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo, StepProps } from "@/types/biodataForm";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";

export default function PersonalInfoStep({ data, updateData }: StepProps) {
  const [personal, setPersonal] = useState<PersonalInfo>({
    name: "",
    gender: "",
    dress: "",
    prayerHabit: "",
    maintainMahram: "",
    quranReading: "",
    fiqh: "",
    entertainment: "",
    healthIssues: "",
    specialSkills: "",
    favoriteBooks: "",
    hobbies: "",
    ...data.personal,
  });

  const { language } = useLanguage();
  const t = biodataTranslation[language];

  useEffect(() => {
    updateData({ personal });
  }, [personal, updateData]);

  const handleChange = (field: keyof PersonalInfo, value: string | boolean) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="name">{t.personalInformation?.name} *</Label>
          <Input
            id="name"
            value={personal.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t.personalInformation?.name}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="gender">{t.personalInformation?.gender} *</Label>
          <Select
            value={personal.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">
                {t.personalInformation?.male}
              </SelectItem>
              <SelectItem value="Female">
                {t.personalInformation?.female}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="dress">{t.personalInformation?.dressUp}</Label>
          <Input
            id="dress"
            value={personal.dress}
            onChange={(e) => handleChange("dress", e.target.value)}
            placeholder={t.personalInformation?.dressUp}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="prayerHabit">
            {t.personalInformation?.pray5times}
          </Label>
          <Input
            id="prayerHabit"
            value={personal.prayerHabit}
            onChange={(e) => handleChange("prayerHabit", e.target.value)}
            placeholder={t.personalInformation?.pray5times}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="fiqh">{t.personalInformation?.fiqh}</Label>
        <Select
          value={personal.fiqh}
          onValueChange={(value) => handleChange("fiqh", value)}
        >
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
            <SelectValue placeholder="Select fiqh" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hanafi">Hanafi</SelectItem>
            <SelectItem value="Shafi">Shafi</SelectItem>
            <SelectItem value="Maliki">Maliki</SelectItem>
            <SelectItem value="Hanbali">Hanbali</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="maintainMahram">
            {t.personalInformation?.mahram}
          </Label>
          <Input
            id="maintainMahram"
            value={personal.maintainMahram}
            onChange={(e) => handleChange("maintainMahram", e.target.value)}
            placeholder={t.personalInformation?.mahram}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="quranReading">
            {t.personalInformation?.quranReading}
          </Label>
          <Input
            id="quranReading"
            value={personal.quranReading}
            onChange={(e) => handleChange("quranReading", e.target.value)}
            placeholder={t.personalInformation?.quranReading}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="entertainment">
            {t.personalInformation?.entertainment}
          </Label>
          <Input
            id="entertainment"
            value={personal.entertainment}
            onChange={(e) => handleChange("entertainment", e.target.value)}
            placeholder={t.personalInformation?.entertainment}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="healthIssues">
            {t.personalInformation?.diseases}
          </Label>
          <Input
            id="healthIssues"
            value={personal.healthIssues}
            onChange={(e) => handleChange("healthIssues", e.target.value)}
            placeholder={t.personalInformation?.diseases}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="specialSkills">
          {t.personalInformation?.specialSkills}
        </Label>
        <Textarea
          id="specialSkills"
          value={personal.specialSkills}
          onChange={(e) => handleChange("specialSkills", e.target.value)}
          placeholder={t.personalInformation?.specialSkills}
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="favoriteBooks">
          {t.personalInformation?.favoriteBooks}
        </Label>
        <Input
          id="favoriteBooks"
          value={personal.favoriteBooks}
          onChange={(e) => handleChange("favoriteBooks", e.target.value)}
          placeholder={t.personalInformation?.favoriteBooks}
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="hobbies">{t.personalInformation?.hobbies}</Label>
        <Input
          id="hobbies"
          value={personal.hobbies}
          onChange={(e) => handleChange("hobbies", e.target.value)}
          placeholder={t.personalInformation?.hobbies}
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import type { PersonalInfo, StepProps } from "@/types/biodataForm";
// import { useLanguage } from "@/hooks/use-language";
// import { biodataTranslation } from "@/dictionary/biodata";
// import { User, Heart, Book, Gamepad2, Stethoscope, Star } from "lucide-react";

// export default function PersonalInfoStep({ data, updateData }: StepProps) {
//   const [personal, setPersonal] = useState<PersonalInfo>({
//     name: "",
//     gender: "",
//     dress: "",
//     prayerHabit: "",
//     maintainMahram: "",
//     quranReading: "",
//     fiqh: "",
//     entertainment: "",
//     healthIssues: "",
//     specialSkills: "",
//     favoriteBooks: "",
//     hobbies: "",
//     ...data.personal,
//   });

//   const { language } = useLanguage();
//   const t = biodataTranslation[language];

//   useEffect(() => {
//     updateData({ personal });
//   }, [personal]);

//   const handleChange = (field: keyof PersonalInfo, value: string | boolean) => {
//     setPersonal((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       <div className="text-center space-y-2 mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
//           Personal Information
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400">
//           Please provide your personal details
//         </p>
//       </div>

//       {/* Basic Information Section */}
//       <Card className="border-emerald-100 dark:border-emerald-800 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
//             <User className="w-5 h-5" />
//             Basic Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="name"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.name} *
//               </Label>
//               <Input
//                 id="name"
//                 value={personal.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 placeholder={t.personalInformation?.name}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="gender"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.gender} *
//               </Label>
//               <Select
//                 value={personal.gender}
//                 onValueChange={(value) => handleChange("gender", value)}
//               >
//                 <SelectTrigger className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors">
//                   <SelectValue placeholder="Select gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Male">
//                     {t.personalInformation?.male}
//                   </SelectItem>
//                   <SelectItem value="Female">
//                     {t.personalInformation?.female}
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="dress"
//               className="text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               {t.personalInformation?.dressUp}
//             </Label>
//             <Input
//               id="dress"
//               value={personal.dress}
//               onChange={(e) => handleChange("dress", e.target.value)}
//               placeholder={t.personalInformation?.dressUp}
//               className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Religious Information Section */}
//       <Card className="border-emerald-100 dark:border-emerald-800 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
//             <Heart className="w-5 h-5" />
//             Religious Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="prayerHabit"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.pray5times}
//               </Label>
//               <Input
//                 id="prayerHabit"
//                 value={personal.prayerHabit}
//                 onChange={(e) => handleChange("prayerHabit", e.target.value)}
//                 placeholder={t.personalInformation?.pray5times}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="quranReading"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.quranReading}
//               </Label>
//               <Input
//                 id="quranReading"
//                 value={personal.quranReading}
//                 onChange={(e) => handleChange("quranReading", e.target.value)}
//                 placeholder={t.personalInformation?.quranReading}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="fiqh"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.fiqh}
//               </Label>
//               <Select
//                 value={personal.fiqh}
//                 onValueChange={(value) => handleChange("fiqh", value)}
//               >
//                 <SelectTrigger className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors">
//                   <SelectValue placeholder="Select fiqh" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Hanafi">Hanafi</SelectItem>
//                   <SelectItem value="Shafi">Shafi</SelectItem>
//                   <SelectItem value="Maliki">Maliki</SelectItem>
//                   <SelectItem value="Hanbali">Hanbali</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="maintainMahram"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.mahram}
//               </Label>
//               <Input
//                 id="maintainMahram"
//                 value={personal.maintainMahram}
//                 onChange={(e) => handleChange("maintainMahram", e.target.value)}
//                 placeholder={t.personalInformation?.mahram}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Lifestyle & Health Section */}
//       <Card className="border-emerald-100 dark:border-emerald-800 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
//             <Stethoscope className="w-5 h-5" />
//             Lifestyle & Health
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="entertainment"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.entertainment}
//               </Label>
//               <Input
//                 id="entertainment"
//                 value={personal.entertainment}
//                 onChange={(e) => handleChange("entertainment", e.target.value)}
//                 placeholder={t.personalInformation?.entertainment}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="healthIssues"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {t.personalInformation?.diseases}
//               </Label>
//               <Input
//                 id="healthIssues"
//                 value={personal.healthIssues}
//                 onChange={(e) => handleChange("healthIssues", e.target.value)}
//                 placeholder={t.personalInformation?.diseases}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Interests & Skills Section */}
//       <Card className="border-emerald-100 dark:border-emerald-800 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
//             <Star className="w-5 h-5" />
//             Interests & Skills
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label
//               htmlFor="specialSkills"
//               className="text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               {t.personalInformation?.specialSkills}
//             </Label>
//             <Textarea
//               id="specialSkills"
//               value={personal.specialSkills}
//               onChange={(e) => handleChange("specialSkills", e.target.value)}
//               placeholder={t.personalInformation?.specialSkills}
//               className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors min-h-[100px] resize-none"
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="favoriteBooks"
//                 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 <Book className="w-4 h-4" />
//                 {t.personalInformation?.favoriteBooks}
//               </Label>
//               <Input
//                 id="favoriteBooks"
//                 value={personal.favoriteBooks}
//                 onChange={(e) => handleChange("favoriteBooks", e.target.value)}
//                 placeholder={t.personalInformation?.favoriteBooks}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="hobbies"
//                 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 <Gamepad2 className="w-4 h-4" />
//                 {t.personalInformation?.hobbies}
//               </Label>
//               <Input
//                 id="hobbies"
//                 value={personal.hobbies}
//                 onChange={(e) => handleChange("hobbies", e.target.value)}
//                 placeholder={t.personalInformation?.hobbies}
//                 className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400 transition-colors"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
