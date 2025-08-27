"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { EducationHistory, EducationInfo, StepProps } from "@/types/biodataForm"

export default function EducationStep({ data, updateData }: StepProps) {
  const [education, setEducation] = useState<EducationInfo>({
    method: "",
    history: [{ level: "", year: "", group: "", result: "", subject: "", institution: "" }],
    other: [],
    ...data.education,
  })

  useEffect(() => {
    updateData({ education })
  }, [education, updateData])

  const addEducationHistory = () => {
    setEducation((prev) => ({
      ...prev,
      history: [...prev.history, { level: "", year: "", group: "", result: "", subject: "", institution: "" }],
    }))
  }

  const removeEducationHistory = (index: number) => {
    setEducation((prev) => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== index),
    }))
  }

  const updateEducationHistory = (index: number, field: keyof EducationHistory, value: string) => {
    setEducation((prev) => ({
      ...prev,
      history: prev.history.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addOtherEducation = () => {
    setEducation((prev) => ({
      ...prev,
      other: [...prev.other, ""],
    }))
  }

  const removeOtherEducation = (index: number) => {
    setEducation((prev) => ({
      ...prev,
      other: prev.other.filter((_, i) => i !== index),
    }))
  }

  const updateOtherEducation = (index: number, value: string) => {
    setEducation((prev) => ({
      ...prev,
      other: prev.other.map((item, i) => (i === index ? value : item)),
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="method">Education Method *</Label>
        <Select
          value={education.method}
          onValueChange={(value) => setEducation((prev) => ({ ...prev, method: value }))}
        >
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
            <SelectValue placeholder="Select education method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Madrasa">Madrasa</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
            <SelectItem value="Mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">Education History</h3>
          <Button type="button" onClick={addEducationHistory} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {education.history.map((edu, index) => (
            <Card key={index} className="border-emerald-200 dark:border-emerald-700">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {education.history.length > 1 && (
                    <Button type="button" onClick={() => removeEducationHistory(index)} size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Level *</Label>
                    <Select value={edu.level} onValueChange={(value) => updateEducationHistory(index, "level", value)}>
                      <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SSC">SSC</SelectItem>
                        <SelectItem value="HSC">HSC</SelectItem>
                        <SelectItem value="Graduation">Graduation</SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Year *</Label>
                    <Input
                      type="number"
                      value={edu.year}
                      onChange={(e) => updateEducationHistory(index, "year", e.target.value)}
                      placeholder="e.g., 2020"
                      className="border-emerald-200 dark:border-emerald-700"
                    />
                  </div>

                  <div>
                    <Label>Group/Subject</Label>
                    <Input
                      value={edu.group || edu.subject}
                      onChange={(e) =>
                        updateEducationHistory(
                          index,
                          edu.level === "Graduation" || edu.level === "Masters" || edu.level === "PhD"
                            ? "subject"
                            : "group",
                          e.target.value,
                        )
                      }
                      placeholder={
                        edu.level === "Graduation" || edu.level === "Masters" || edu.level === "PhD"
                          ? "Subject"
                          : "Group"
                      }
                      className="border-emerald-200 dark:border-emerald-700"
                    />
                  </div>

                  <div>
                    <Label>Result</Label>
                    <Input
                      value={edu.result}
                      onChange={(e) => updateEducationHistory(index, "result", e.target.value)}
                      placeholder="e.g., A, A+, 3.5, etc."
                      className="border-emerald-200 dark:border-emerald-700"
                    />
                  </div>

                  {(edu.level === "Graduation" || edu.level === "Masters" || edu.level === "PhD") && (
                    <div className="md:col-span-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducationHistory(index, "institution", e.target.value)}
                        placeholder="Institution name"
                        className="border-emerald-200 dark:border-emerald-700"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">Other Education</h3>
          <Button type="button" onClick={addOtherEducation} size="sm" className="bg-yellow-600 hover:bg-yellow-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Other
          </Button>
        </div>

        <div className="space-y-2">
          {education.other.map((other, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={other}
                onChange={(e) => updateOtherEducation(index, e.target.value)}
                placeholder="e.g., Quran learning, Hadith learning"
                className="border-emerald-200 dark:border-emerald-700"
              />
              <Button type="button" onClick={() => removeOtherEducation(index)} size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
