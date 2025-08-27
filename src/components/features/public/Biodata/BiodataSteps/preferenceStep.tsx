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
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { PreferenceInfo, StepProps } from "@/types/biodataForm";

export default function PreferenceStep({ data, updateData }: StepProps) {
  const [preference, setPreference] = useState<PreferenceInfo>({
    ageRange: "",
    complexion: "",
    height: "",
    education: "",
    location: "",
    maritalStatus: "",
    profession: "",
    financialCondition: "",
    qualities: [],
    ...data.preference,
  });

  useEffect(() => {
    updateData({ preference });
  }, [preference, updateData]);

  const handleChange = (field: keyof PreferenceInfo, value: string) => {
    setPreference((prev) => ({ ...prev, [field]: value }));
  };

  const addQuality = () => {
    setPreference((prev) => ({
      ...prev,
      qualities: [...prev.qualities, ""],
    }));
  };

  const removeQuality = (index: number) => {
    setPreference((prev) => ({
      ...prev,
      qualities: prev.qualities.filter((_, i) => i !== index),
    }));
  };

  const updateQuality = (index: number, value: string) => {
    setPreference((prev) => ({
      ...prev,
      qualities: prev.qualities.map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ageRange">Preferred Age Range</Label>
          <Input
            id="ageRange"
            value={preference.ageRange}
            onChange={(e) => handleChange("ageRange", e.target.value)}
            placeholder="e.g., 20-25, 25-30"
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="complexion">Preferred Complexion</Label>
          <Select
            value={preference.complexion}
            onValueChange={(value) => handleChange("complexion", value)}
          >
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select complexion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
              <SelectItem value="Any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Preferred Height</Label>
          <Input
            id="height"
            value={preference.height}
            onChange={(e) => handleChange("height", e.target.value)}
            placeholder="e.g., 5.5+, 5.0-5.5"
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="education">Minimum Education</Label>
          <Select
            value={preference.education}
            onValueChange={(value) => handleChange("education", value)}
          >
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select education" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SSC">SSC</SelectItem>
              <SelectItem value="HSC">HSC</SelectItem>
              <SelectItem value="Graduation">Graduation</SelectItem>
              <SelectItem value="Masters">Masters</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
              <SelectItem value="Any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Preferred Location</Label>
          <Input
            id="location"
            value={preference.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g., Dhaka, Chittagong, Any"
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select
            value={preference.maritalStatus}
            onValueChange={(value) => handleChange("maritalStatus", value)}
          >
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Never married">Never married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
              <SelectItem value="Any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profession">Preferred Profession</Label>
          <Input
            id="profession"
            value={preference.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
            placeholder="e.g., Doctor, Engineer, Any"
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="financialCondition">Financial Condition</Label>
          <Select
            value={preference.financialCondition}
            onValueChange={(value) => handleChange("financialCondition", value)}
          >
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select financial condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Poor">Poor</SelectItem>
              <SelectItem value="Lower middle class">
                Lower middle class
              </SelectItem>
              <SelectItem value="Middle class">Middle class</SelectItem>
              <SelectItem value="Upper middle class">
                Upper middle class
              </SelectItem>
              <SelectItem value="Rich">Rich</SelectItem>
              <SelectItem value="Any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Desired Qualities</Label>
          <Button
            type="button"
            onClick={addQuality}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quality
          </Button>
        </div>
        <div className="space-y-2">
          {preference.qualities.map((quality, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={quality}
                onChange={(e) => updateQuality(index, e.target.value)}
                placeholder="e.g., Good mindset, Religious, Kind"
                className="border-emerald-200 dark:border-emerald-700"
              />
              <Button
                type="button"
                onClick={() => removeQuality(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
          Preference Guidelines
        </h3>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Remember that preferences are guidelines, not strict requirements.
          Focus on character and compatibility over superficial qualities for a
          successful marriage.
        </p>
      </div>
    </div>
  );
}
