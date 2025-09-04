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
import { AddressInfo, DivisionProps, StepProps } from "@/types/biodataForm";
import { useLanguage } from "@/hooks/use-language";
import { biodataTranslation } from "@/dictionary/biodata";

import divisionsData from "../../../../../../public/division.json";
import districtsData from "../../../../../../public/district.json";
import upazilasData from "../../../../../../public/upzila.json";

export default function AddressStep({ data, updateData }: StepProps) {
  const [address, setAddress] = useState<AddressInfo>({
    permanent: {
      address: "",
      upazila: "",
      district: "",
      division: "",
    },
    present: {
      address: "",
      upazila: "",
      district: "",
      division: "",
    },
    grewUpAt: "",
    ...data.address,
  });

  const [districts, setDistricts] = useState<any[]>([]);
  const [upazilas, setUpazilas] = useState<any[]>([]);
  const [presentDistricts, setPresentDistricts] = useState<any[]>([]);
  const [presentUpazilas, setPresentUpazilas] = useState<any[]>([]);

  const { language } = useLanguage();
  const t = biodataTranslation[language];

  // ✅ Static data - no loading needed
  const divisions = divisionsData as DivisionProps[];

  // Update parent component when address changes
  useEffect(() => {
    updateData({ address });
  }, [address, updateData]);

  // Load districts when permanent division changes
  const handlePermanentDivisionChange = (divisionName: string) => {
    setAddress((prev) => ({
      ...prev,
      permanent: {
        ...prev.permanent,
        division: divisionName,
        district: "",
        upazila: "",
      },
    }));

    // Filter districts for this division
    const filteredDistricts = districtsData.filter(
      (d: any) => d.divisionName === divisionName
    );

    // Remove duplicates
    const uniqueDistricts = filteredDistricts.filter(
      (district: any, index: number, self: any[]) =>
        index ===
        self.findIndex((d) => d.districtsName === district.districtsName)
    );

    setDistricts(uniqueDistricts);
  };

  // Load upazilas when permanent district changes
  const handlePermanentDistrictChange = (districtName: string) => {
    setAddress((prev) => ({
      ...prev,
      permanent: { ...prev.permanent, district: districtName, upazila: "" },
    }));

    // Filter upazilas for this district
    const filteredUpazilas = upazilasData.filter(
      (u: any) => u.districtsName === districtName
    );

    setUpazilas(filteredUpazilas);
  };

  // Load districts when present division changes
  const handlePresentDivisionChange = (divisionName: string) => {
    setAddress((prev) => ({
      ...prev,
      present: {
        ...prev.present,
        division: divisionName,
        district: "",
        upazila: "",
      },
    }));

    // Filter districts for this division
    const filteredDistricts = districtsData.filter(
      (d: any) => d.divisionName === divisionName
    );

    // Remove duplicates
    const uniqueDistricts = filteredDistricts.filter(
      (district: any, index: number, self: any[]) =>
        index ===
        self.findIndex((d) => d.districtsName === district.districtsName)
    );

    setPresentDistricts(uniqueDistricts);
  };

  // Load upazilas when present district changes
  const handlePresentDistrictChange = (districtName: string) => {
    setAddress((prev) => ({
      ...prev,
      present: { ...prev.present, district: districtName, upazila: "" },
    }));

    // Filter upazilas for this district
    const filteredUpazilas = upazilasData.filter(
      (u: any) => u.districtsName === districtName
    );

    setPresentUpazilas(filteredUpazilas);
  };

  return (
    <div className="space-y-8">
      {/* Permanent Address */}
      <div>
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
          {t.address?.permanentAddress}
        </h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="permanent-address">{t.address?.address} *</Label>
            <Input
              id="permanent-address"
              value={address.permanent.address}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  permanent: { ...prev.permanent, address: e.target.value },
                }))
              }
              placeholder={t.address?.addressPlaceHolder}
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="space-y-3">
              <Label htmlFor="permanent-division">
                {t.address?.division} *
              </Label>
              <Select
                value={address.permanent.division}
                onValueChange={handlePermanentDivisionChange}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.division} />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((division: any) => (
                    <SelectItem
                      key={division.division_id}
                      value={division.divisionName}
                    >
                      {division.divisionName} ({division.bnDivisionName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="permanent-district">
                {t.address?.district} *
              </Label>
              <Select
                value={address.permanent.district}
                onValueChange={handlePermanentDistrictChange}
                disabled={!address.permanent.division}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.district} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district: any, index) => (
                    <SelectItem key={index} value={district.districtsName}>
                      {district.districtsName} ({district.bnDistrictsName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="permanent-upazila">{t.address?.upazila} *</Label>
              <Select
                value={address.permanent.upazila}
                onValueChange={(value) =>
                  setAddress((prev) => ({
                    ...prev,
                    permanent: { ...prev.permanent, upazila: value },
                  }))
                }
                disabled={!address.permanent.district}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.upazila} />
                </SelectTrigger>
                <SelectContent>
                  {upazilas.map((upazila: any, index) => (
                    <SelectItem key={index} value={upazila.subDistrictsName}>
                      {upazila.subDistrictsName} ({upazila.bnSubDistrictsName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Present Address */}
      <div>
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
          {t.address?.presentAddress}
        </h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="present-address">{t.address?.address} *</Label>
            <Input
              id="present-address"
              value={address.present.address}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  present: { ...prev.present, address: e.target.value },
                }))
              }
              placeholder={t.address?.addressPlaceHolder}
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label htmlFor="present-division">{t.address?.division} *</Label>
              <Select
                value={address.present.division}
                onValueChange={handlePresentDivisionChange}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.division} />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((division: any) => (
                    <SelectItem
                      key={division.division_id}
                      value={division.divisionName}
                    >
                      {division.divisionName} ({division.bnDivisionName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="present-district">{t.address?.district} *</Label>
              <Select
                value={address.present.district}
                onValueChange={handlePresentDistrictChange}
                disabled={!address.present.division}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.district} />
                </SelectTrigger>
                <SelectContent>
                  {presentDistricts.map((district: any, index) => (
                    <SelectItem key={index} value={district.districtsName}>
                      {district.districtsName} ({district.bnDistrictsName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="present-upazila">{t.address?.upazila} *</Label>
              <Select
                value={address.present.upazila}
                onValueChange={(value) =>
                  setAddress((prev) => ({
                    ...prev,
                    present: { ...prev.present, upazila: value },
                  }))
                }
                disabled={!address.present.district}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700 w-full">
                  <SelectValue placeholder={t.address?.upazila} />
                </SelectTrigger>
                <SelectContent>
                  {presentUpazilas.map((upazila: any, index) => (
                    <SelectItem key={index} value={upazila.subDistrictsName}>
                      {upazila.subDistrictsName} ({upazila.bnSubDistrictsName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Grew Up At */}
      <div className="space-y-3">
        <Label htmlFor="grewUpAt">{t.address?.whereDidYouGrow}</Label>
        <Input
          id="grewUpAt"
          value={address.grewUpAt}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, grewUpAt: e.target.value }))
          }
          placeholder={t.address?.whereDidYouGrowPlaceholder}
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>
    </div>
  );
}
