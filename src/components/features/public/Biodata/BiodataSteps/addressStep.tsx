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
import { AddressInfo, LocationData, StepProps } from "@/types/biodataForm";

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

  const [divisions, setDivisions] = useState<LocationData[]>([]);
  const [districts, setDistricts] = useState<LocationData[]>([]);
  const [upazilas, setUpazilas] = useState<LocationData[]>([]);
  const [presentDistricts, setPresentDistricts] = useState<LocationData[]>([]);
  const [presentUpazilas, setPresentUpazilas] = useState<LocationData[]>([]);

  // Load location data
  useEffect(() => {
    // Load divisions
    fetch("../../../../../../public/division.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data))
      .catch(() => {
        // // Fallback data
        // setDivisions([
        //   { division_id: "1", divisionName: "Chattagram", bnDivisionName: "চট্টগ্রাম" },
        //   { division_id: "2", divisionName: "Rajshahi", bnDivisionName: "রাজশাহী" },
        //   { division_id: "3", divisionName: "Khulna", bnDivisionName: "খুলনা" },
        //   { division_id: "4", divisionName: "Barisal", bnDivisionName: "বরিশাল" },
        //   { division_id: "5", divisionName: "Sylhet", bnDivisionName: "সিলেট" },
        //   { division_id: "6", divisionName: "Dhaka", bnDivisionName: "ঢাকা" },
        //   { division_id: "7", divisionName: "Rangpur", bnDivisionName: "রংপুর" },
        //   { division_id: "8", divisionName: "Mymensingh", bnDivisionName: "ময়মনসিংহ" },
        // ])
        console.log("have some problems");
      });
  }, []);
  console.log(divisions);

  useEffect(() => {
    updateData({ address });
  }, [address, updateData]);

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

    // Load districts for this division
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data: LocationData[]) => {
        const filteredDistricts = data.filter(
          (d) => d.divisionName === divisionName
        );
        setDistricts(filteredDistricts);
      })
      .catch(() => setDistricts([]));
  };

  const handlePermanentDistrictChange = (districtName: string) => {
    setAddress((prev) => ({
      ...prev,
      permanent: { ...prev.permanent, district: districtName, upazila: "" },
    }));

    // Load upazilas for this district
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data: LocationData[]) => {
        const filteredUpazilas = data.filter(
          (u) => u.districtsName === districtName
        );
        setUpazilas(filteredUpazilas);
      })
      .catch(() => setUpazilas([]));
  };

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

    // Load districts for this division
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data: LocationData[]) => {
        const filteredDistricts = data.filter(
          (d) => d.divisionName === divisionName
        );
        setPresentDistricts(filteredDistricts);
      })
      .catch(() => setPresentDistricts([]));
  };

  const handlePresentDistrictChange = (districtName: string) => {
    setAddress((prev) => ({
      ...prev,
      present: { ...prev.present, district: districtName, upazila: "" },
    }));

    // Load upazilas for this district
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data: LocationData[]) => {
        const filteredUpazilas = data.filter(
          (u) => u.districtsName === districtName
        );
        setPresentUpazilas(filteredUpazilas);
      })
      .catch(() => setPresentUpazilas([]));
  };

  return (
    <div className="space-y-8">
      {/* Permanent Address */}
      <div>
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
          Permanent Address
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="permanent-address">Address *</Label>
            <Input
              id="permanent-address"
              value={address.permanent.address}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  permanent: { ...prev.permanent, address: e.target.value },
                }))
              }
              placeholder="Enter your permanent address"
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="permanent-division">Division *</Label>
              <Select
                value={address.permanent.division}
                onValueChange={handlePermanentDivisionChange}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select division" />
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

            <div>
              <Label htmlFor="permanent-district">District *</Label>
              <Select
                value={address.permanent.district}
                onValueChange={handlePermanentDistrictChange}
                disabled={!address.permanent.division}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select district" />
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

            <div>
              <Label htmlFor="permanent-upazila">Upazila *</Label>
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
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select upazila" />
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
          Present Address
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="present-address">Address *</Label>
            <Input
              id="present-address"
              value={address.present.address}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  present: { ...prev.present, address: e.target.value },
                }))
              }
              placeholder="Enter your present address"
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="present-division">Division *</Label>
              <Select
                value={address.present.division}
                onValueChange={handlePresentDivisionChange}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select division" />
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

            <div>
              <Label htmlFor="present-district">District *</Label>
              <Select
                value={address.present.district}
                onValueChange={handlePresentDistrictChange}
                disabled={!address.present.division}
              >
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select district" />
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

            <div>
              <Label htmlFor="present-upazila">Upazila *</Label>
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
                <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                  <SelectValue placeholder="Select upazila" />
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
      <div>
        <Label htmlFor="grewUpAt">Grew Up At</Label>
        <Input
          id="grewUpAt"
          value={address.grewUpAt}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, grewUpAt: e.target.value }))
          }
          placeholder="e.g., Father's home, Mother's home, etc."
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>
    </div>
  );
}
