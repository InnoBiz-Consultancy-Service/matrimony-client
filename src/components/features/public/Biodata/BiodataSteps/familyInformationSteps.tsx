"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { FamilyInfo, StepProps } from "@/types/biodataForm"

export default function FamilyStep({ data, updateData }: StepProps) {
  const [family, setFamily] = useState<FamilyInfo>({
    fatherAlive: true,
    motherAlive: true,
    fatherProfession: "",
    motherProfession: "",
    brothers: 0,
    sisters: 0,
    sistersInfo: [],
    unclesProfession: [],
    financialStatus: "",
    financialDetails: "",
    religiousPractice: "",
    ...data.family,
  })

  useEffect(() => {
    updateData({ family })
  }, [family, updateData])

  const handleChange = (field: keyof FamilyInfo, value: string | boolean | number) => {
    setFamily((prev) => ({ ...prev, [field]: value }))
  }

  const addSisterInfo = () => {
    setFamily((prev) => ({
      ...prev,
      sistersInfo: [...prev.sistersInfo, ""],
    }))
  }

  const removeSisterInfo = (index: number) => {
    setFamily((prev) => ({
      ...prev,
      sistersInfo: prev.sistersInfo.filter((_, i) => i !== index),
    }))
  }

  const updateSisterInfo = (index: number, value: string) => {
    setFamily((prev) => ({
      ...prev,
      sistersInfo: prev.sistersInfo.map((item, i) => (i === index ? value : item)),
    }))
  }

  const addUncleProfession = () => {
    setFamily((prev) => ({
      ...prev,
      unclesProfession: [...prev.unclesProfession, ""],
    }))
  }

  const removeUncleProfession = (index: number) => {
    setFamily((prev) => ({
      ...prev,
      unclesProfession: prev.unclesProfession.filter((_, i) => i !== index),
    }))
  }

  const updateUncleProfession = (index: number, value: string) => {
    setFamily((prev) => ({
      ...prev,
      unclesProfession: prev.unclesProfession.map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleNumberChange = (field: "brothers" | "sisters", value: string) => {
    const numValue = Number.parseInt(value) || 0
    setFamily((prev) => ({ ...prev, [field]: numValue }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fatherAlive"
            checked={family.fatherAlive}
            onCheckedChange={(checked) => handleChange("fatherAlive", checked)}
          />
          <Label htmlFor="fatherAlive">Father is alive</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="motherAlive"
            checked={family.motherAlive}
            onCheckedChange={(checked) => handleChange("motherAlive", checked)}
          />
          <Label htmlFor="motherAlive">Mother is alive</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fatherProfession">Father's Profession</Label>
          <Input
            id="fatherProfession"
            value={family.fatherProfession}
            onChange={(e) => handleChange("fatherProfession", e.target.value)}
            placeholder="Enter father's profession"
            className="border-emerald-200 dark:border-emerald-700"
            disabled={!family.fatherAlive}
          />
        </div>

        <div>
          <Label htmlFor="motherProfession">Mother's Profession</Label>
          <Input
            id="motherProfession"
            value={family.motherProfession}
            onChange={(e) => handleChange("motherProfession", e.target.value)}
            placeholder="Enter mother's profession"
            className="border-emerald-200 dark:border-emerald-700"
            disabled={!family.motherAlive}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="brothers">Number of Brothers</Label>
          <Input
            id="brothers"
            type="number"
            min="0"
            value={family.brothers}
            onChange={(e) => handleNumberChange("brothers", e.target.value)}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="sisters">Number of Sisters</Label>
          <Input
            id="sisters"
            type="number"
            min="0"
            value={family.sisters}
            onChange={(e) => handleNumberChange("sisters", e.target.value)}
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>
      </div>

      {family.sisters > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Sisters Information</Label>
            <Button type="button" onClick={addSisterInfo} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Sister Info
            </Button>
          </div>
          <div className="space-y-2">
            {family.sistersInfo.map((info, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={info}
                  onChange={(e) => updateSisterInfo(index, e.target.value)}
                  placeholder="e.g., Housewife, Student, etc."
                  className="border-emerald-200 dark:border-emerald-700"
                />
                <Button type="button" onClick={() => removeSisterInfo(index)} size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <Label>Uncles' Profession</Label>
          <Button type="button" onClick={addUncleProfession} size="sm" className="bg-yellow-600 hover:bg-yellow-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Uncle
          </Button>
        </div>
        <div className="space-y-2">
          {family.unclesProfession.map((profession, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={profession}
                onChange={(e) => updateUncleProfession(index, e.target.value)}
                placeholder="Uncle's profession"
                className="border-emerald-200 dark:border-emerald-700"
              />
              <Button type="button" onClick={() => removeUncleProfession(index)} size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="financialStatus">Financial Status</Label>
        <Select value={family.financialStatus} onValueChange={(value) => handleChange("financialStatus", value)}>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
            <SelectValue placeholder="Select financial status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Poor">Poor</SelectItem>
            <SelectItem value="Lower middle class">Lower middle class</SelectItem>
            <SelectItem value="Middle class">Middle class</SelectItem>
            <SelectItem value="Upper middle class">Upper middle class</SelectItem>
            <SelectItem value="Rich">Rich</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="financialDetails">Financial Details</Label>
        <Textarea
          id="financialDetails"
          value={family.financialDetails}
          onChange={(e) => handleChange("financialDetails", e.target.value)}
          placeholder="Describe family's financial situation, income sources, assets, etc."
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div>
        <Label htmlFor="religiousPractice">Religious Practice</Label>
        <Textarea
          id="religiousPractice"
          value={family.religiousPractice}
          onChange={(e) => handleChange("religiousPractice", e.target.value)}
          placeholder="Describe family's religious practice"
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>
    </div>
  )
}
