"use client";

import * as React from "react";
import { Search, Filter, X, Heart, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import divisions from "../../../../../../public/division.json";
import districts from "../../../../../../public/district.json";
import upazilas from "../../../../../../public/upzila.json";
import { District, Upazila } from "@/types/filterForm";
import { FilterParams } from "@/types/filters";
import { generateSearchParams } from "@/utils/searchParams";
import { useRouter } from "next/navigation";

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

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];

const maritalStatuses = ["Never Married", "Divorced", "Widowed"];

const incomeRanges = [
  "Below $25,000",
  "$25,000 - $50,000",
  "$50,000 - $75,000",
  "$75,000 - $100,000",
  "Above $100,000",
];

// Zod schema for form validation
const filterSchema = z.object({
  lookingFor: z.enum(["male", "female", ""]).optional(),
  ageRange: z.tuple([z.number(), z.number()]),
  division: z.string().optional(),
  district: z.string().optional(),
  upazila: z.string().optional(),
  profession: z.string().optional(),
  education: z.string().optional(),
  maritalStatus: z.string().optional(),
  incomeRange: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

export default function SearchFilters() {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedDivision, setSelectedDivision] = React.useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("");

  const router = useRouter();

  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      lookingFor: "",
      ageRange: [18, 40],
      division: "",
      district: "",
      upazila: "",
      profession: "",
      education: "",
      maritalStatus: "",
      incomeRange: "",
    },
  });

  const watchedValues = form.watch();

  // Get unique districts for the selected division
  const filteredDistricts = React.useMemo(() => {
    if (!selectedDivision) return [];
    return districts
      .filter((d) => d.division_id === selectedDivision)
      .reduce((unique: District[], district) => {
        if (!unique.some((d) => d.districtsName === district.districtsName)) {
          unique.push(district);
        }
        return unique;
      }, []);
  }, [selectedDivision]);

  // Get unique upazilas for the selected district
  const filteredUpazilas = React.useMemo(() => {
    if (!selectedDistrict) return [];
    return upazilas
      .filter((u) => u.districtsName === selectedDistrict)
      .reduce((unique: Upazila[], upazila) => {
        if (
          !unique.some((u) => u.subDistrictsName === upazila.subDistrictsName)
        ) {
          unique.push(upazila);
        }
        return unique;
      }, []);
  }, [selectedDistrict]);

  const handleSearch = async (filters: FilterParams) => {
    setIsSearching(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const params = generateSearchParams(filters);
      router.push(`/biodatas?${params.toString()}`, { scroll: false });
    } finally {
      setIsSearching(false);
    }
  };

  const clearFilters = () => {
    form.reset({
      lookingFor: "",
      ageRange: [18, 40],
      division: "",
      district: "",
      upazila: "",
      profession: "",
      education: "",
      maritalStatus: "",
      incomeRange: "",
    });
    setSelectedDivision("");
    setSelectedDistrict("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (watchedValues.lookingFor) count++;
    if (watchedValues.division) count++;
    if (watchedValues.district) count++;
    if (watchedValues.upazila) count++;
    if (watchedValues.profession) count++;
    if (watchedValues.education) count++;
    if (watchedValues.maritalStatus) count++;
    if (watchedValues.incomeRange) count++;
    if (watchedValues.ageRange[0] !== 18 || watchedValues.ageRange[1] !== 40)
      count++;
    return count;
  };

  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value);
    setSelectedDistrict("");
    form.setValue("division", value);
    form.setValue("district", "");
    form.setValue("upazila", "");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    form.setValue("district", value);
    form.setValue("upazila", "");
  };

  return (
    <section className="bg-gradient-to-r from-white to-rose-50/30 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-rose-500 fill-current" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Find Your Perfect Match
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Use our advanced filters to discover compatible profiles that match
            your preferences and values
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8 md:p-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSearch)}
                className="space-y-8"
              >
                {/* Main Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Looking For */}
                  <FormField
                    control={form.control}
                    name="lookingFor"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                          <Users className="h-4 w-4 mr-2 text-rose-500" />
                          Looking For
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0"
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Division */}
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-rose-500" />
                          Division
                        </FormLabel>
                        <Select
                          onValueChange={handleDivisionChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                              <SelectValue placeholder="Select Division" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions.map((div) => (
                              <SelectItem
                                key={div.division_id}
                                value={div.division_id}
                              >
                                {div.divisionName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* District */}
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          District
                        </FormLabel>
                        <Select
                          onValueChange={handleDistrictChange}
                          value={field.value}
                          disabled={!selectedDivision}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredDistricts.map((dis) => (
                              <SelectItem
                                key={dis.districtsName}
                                value={dis.districtsName}
                              >
                                {dis.districtsName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Upazila */}
                  <FormField
                    control={form.control}
                    name="upazila"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Upazila
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedDistrict}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                              <SelectValue placeholder="Select Upazila" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredUpazilas.map((upa) => (
                              <SelectItem
                                key={upa.subDistrictsName}
                                value={upa.subDistrictsName}
                              >
                                {upa.subDistrictsName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Profession and Marital Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Profession
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                              <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {professions.map((profession) => (
                              <SelectItem
                                key={profession}
                                value={profession
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                              >
                                {profession}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Marital Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {maritalStatuses.map((status) => (
                              <SelectItem
                                key={status}
                                value={status
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}
                              >
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Age Range */}
                <FormField
                  control={form.control}
                  name="ageRange"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Age Range: {field.value[0]} - {field.value[1]} years
                      </FormLabel>
                      <FormControl>
                        <div className="px-6">
                          <Slider
                            value={field.value}
                            onValueChange={field.onChange}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Advanced Filters Toggle */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium text-base px-6 py-3"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    {showAdvanced ? "Hide" : "Show"} Advanced Filters
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showAdvanced && (
                  <div className="border-t border-rose-100 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Education */}
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                              Education
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                                  <SelectValue placeholder="Select education" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {educationLevels.map((education) => (
                                  <SelectItem
                                    key={education}
                                    value={education
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}
                                  >
                                    {education}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Income Range */}
                      <FormField
                        control={form.control}
                        name="incomeRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">
                              Income Range
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-200 focus:border-rose-400 h-12 w-full">
                                  <SelectValue placeholder="Select income" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {incomeRanges.map((income) => (
                                  <SelectItem
                                    key={income}
                                    value={income
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}
                                  >
                                    {income}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Active Filters */}
                {getActiveFiltersCount() > 0 && (
                  <div className="bg-rose-50/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold text-gray-700">
                        Active Filters ({getActiveFiltersCount()})
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-100 font-medium"
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {watchedValues.lookingFor && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Looking for: {watchedValues.lookingFor}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => form.setValue("lookingFor", "")}
                          />
                        </Badge>
                      )}
                      {watchedValues.division && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Division:{" "}
                          {
                            divisions.find(
                              (d) => d.division_id === watchedValues.division
                            )?.divisionName
                          }
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => {
                              form.setValue("division", "");
                              setSelectedDivision("");
                            }}
                          />
                        </Badge>
                      )}
                      {watchedValues.district && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          District: {watchedValues.district}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => {
                              form.setValue("district", "");
                              setSelectedDistrict("");
                            }}
                          />
                        </Badge>
                      )}
                      {watchedValues.upazila && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Upazila: {watchedValues.upazila}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => form.setValue("upazila", "")}
                          />
                        </Badge>
                      )}
                      {watchedValues.profession && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Profession:{" "}
                          {professions.find(
                            (p) =>
                              p.toLowerCase().replace(/\s+/g, "-") ===
                              watchedValues.profession
                          )}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => form.setValue("profession", "")}
                          />
                        </Badge>
                      )}
                      {watchedValues.maritalStatus && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Status:{" "}
                          {maritalStatuses.find(
                            (m) =>
                              m.toLowerCase().replace(/\s+/g, "-") ===
                              watchedValues.maritalStatus
                          )}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => form.setValue("maritalStatus", "")}
                          />
                        </Badge>
                      )}
                      {(watchedValues.ageRange[0] !== 18 ||
                        watchedValues.ageRange[1] !== 40) && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 text-sm py-1.5 px-3"
                        >
                          Age: {watchedValues.ageRange[0]}-
                          {watchedValues.ageRange[1]}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer"
                            onClick={() => form.setValue("ageRange", [18, 40])}
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Separator className="my-8" />

                {/* Search Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-12 py-4 rounded-lg font-semibold transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
                  >
                    {isSearching ? (
                      <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <>
                        <Search className="mr-3 h-5 w-5" />
                        Search Matches (
                        {getActiveFiltersCount() > 0 ? "Filtered" : "All"})
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
