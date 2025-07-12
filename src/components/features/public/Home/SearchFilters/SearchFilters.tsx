"use client";

import * as React from "react";
import { Search, Filter, X, Heart, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FilterState {
  lookingFor: "male" | "female" | "";
  ageRange: [number, number];
  religion: string;
  profession: string;
}

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
];

export default function SearchFilters() {
  const [filters, setFilters] = React.useState<FilterState>({
    lookingFor: "",
    ageRange: [18, 40],
    religion: "",
    profession: "",
  });

  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Search filters:", filters);
    setIsSearching(false);
  };

  const clearFilters = () => {
    setFilters({
      lookingFor: "",
      ageRange: [18, 40],
      religion: "",
      profession: "",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.lookingFor) count++;
    if (filters.religion) count++;
    if (filters.profession) count++;
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 40) count++;
    return count;
  };

  return (
    <section className="bg-gradient-to-r from-white to-rose-50/30 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-rose-500 fill-current" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Find Your Perfect Match
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use our advanced filters to discover compatible profiles that match
            your preferences and values
          </p>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">
            {/* Main Filters */}
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
                      <SelectItem key={religion} value={religion.toLowerCase()}>
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
                <Select
                  value={filters.profession}
                  onValueChange={(value) =>
                    handleFilterChange("profession", value)
                  }
                >
                  <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {professions.map((profession) => (
                      <SelectItem
                        key={profession}
                        value={profession.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            {/* Advanced Filters Toggle */}
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium cursor-pointer"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showAdvanced ? "Hide" : "Show"} Advanced Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="border-t border-rose-100 pt-6 mb-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Education
                    </Label>
                    <Select>
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelors">
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 w-full">
                    <Label className="text-sm font-semibold text-gray-700">
                      Marital Status
                    </Label>
                    <Select>
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never-married">
                          Never Married
                        </SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Income Range
                    </Label>
                    <Select>
                      <SelectTrigger className="border-2 w-full border-gray-200 focus:border-rose-400 rounded-sm">
                        <SelectValue placeholder="Select income" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-25k">Below $25,000</SelectItem>
                        <SelectItem value="25k-50k">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k-75k">
                          $50,000 - $75,000
                        </SelectItem>
                        <SelectItem value="75k-100k">
                          $75,000 - $100,000
                        </SelectItem>
                        <SelectItem value="above-100k">
                          Above $100,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    Active Filters ({getActiveFiltersCount()})
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.lookingFor && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      Looking for: {filters.lookingFor}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => handleFilterChange("lookingFor", "")}
                      />
                    </Badge>
                  )}
                  {filters.religion && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      Religion:{" "}
                      {religions.find(
                        (r) => r.toLowerCase() === filters.religion
                      )}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => handleFilterChange("religion", "")}
                      />
                    </Badge>
                  )}
                  {filters.profession && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      Profession:{" "}
                      {professions.find(
                        (p) =>
                          p.toLowerCase().replace(/\s+/g, "-") ===
                          filters.profession
                      )}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => handleFilterChange("profession", "")}
                      />
                    </Badge>
                  )}
                  {(filters.ageRange[0] !== 18 ||
                    filters.ageRange[1] !== 40) && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 text-rose-700 hover:bg-rose-200"
                    >
                      Age: {filters.ageRange[0]}-{filters.ageRange[1]}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => handleFilterChange("ageRange", [18, 40])}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <Separator className="mb-6" />

            {/* Search Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="primary-btn"
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Search Matches (
                    {getActiveFiltersCount() > 0 ? "Filtered" : "All"})
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
