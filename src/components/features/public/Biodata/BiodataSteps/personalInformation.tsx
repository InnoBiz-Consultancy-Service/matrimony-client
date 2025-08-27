"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PersonalInfo, StepProps } from "@/types/biodataForm"

export default function PersonalInfoStep({ data, updateData }: StepProps) {
  const [personal, setPersonal] = useState<PersonalInfo>({
    name: "",
    gender: "",
    dress: "",
    prayerHabit: "",
    maintainMahram: false,
    quranReading: false,
    fiqh: "",
    entertainment: false,
    healthIssues: false,
    specialSkills: "",
    favoriteBooks: "",
    hobbies: "",
    ...data.personal,
  })

  useEffect(() => {
    updateData({ personal })
  }, [personal, updateData])

  const handleChange = (field: keyof PersonalInfo, value: string | boolean) => {
    setPersonal((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={personal.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your full name"
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Select value={personal.gender} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dress">Dress Style</Label>
          <Input
            id="dress"
            value={personal.dress}
            onChange={(e) => handleChange("dress", e.target.value)}
            placeholder="e.g., Shirt & Pant, Sari, etc."
            className="border-emerald-200 dark:border-emerald-700"
          />
        </div>

        <div>
          <Label htmlFor="prayerHabit">Prayer Habit</Label>
          <Select value={personal.prayerHabit} onValueChange={(value) => handleChange("prayerHabit", value)}>
            <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
              <SelectValue placeholder="Select prayer habit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regularly">Regularly</SelectItem>
              <SelectItem value="sometimes">Sometimes</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="fiqh">Fiqh</Label>
        <Select value={personal.fiqh} onValueChange={(value) => handleChange("fiqh", value)}>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
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

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintainMahram"
            checked={personal.maintainMahram}
            onCheckedChange={(checked) => handleChange("maintainMahram", checked)}
          />
          <Label htmlFor="maintainMahram">Maintain Mahram</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="quranReading"
            checked={personal.quranReading}
            onCheckedChange={(checked) => handleChange("quranReading", checked)}
          />
          <Label htmlFor="quranReading">Can Read Quran</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="entertainment"
            checked={personal.entertainment}
            onCheckedChange={(checked) => handleChange("entertainment", checked)}
          />
          <Label htmlFor="entertainment">Entertainment</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="healthIssues"
            checked={personal.healthIssues}
            onCheckedChange={(checked) => handleChange("healthIssues", checked)}
          />
          <Label htmlFor="healthIssues">Health Issues</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="specialSkills">Special Skills</Label>
        <Textarea
          id="specialSkills"
          value={personal.specialSkills}
          onChange={(e) => handleChange("specialSkills", e.target.value)}
          placeholder="Describe your special skills"
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div>
        <Label htmlFor="favoriteBooks">Favorite Books</Label>
        <Input
          id="favoriteBooks"
          value={personal.favoriteBooks}
          onChange={(e) => handleChange("favoriteBooks", e.target.value)}
          placeholder="List your favorite books (comma separated)"
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div>
        <Label htmlFor="hobbies">Hobbies</Label>
        <Input
          id="hobbies"
          value={personal.hobbies}
          onChange={(e) => handleChange("hobbies", e.target.value)}
          placeholder="List your hobbies (comma separated)"
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>
    </div>
  )
}
