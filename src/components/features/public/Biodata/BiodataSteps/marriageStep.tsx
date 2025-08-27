"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MarriageInfo, StepProps } from "@/types/biodataForm"

export default function MarriageStep({ data, updateData }: StepProps) {
  const [marriage, setMarriage] = useState<MarriageInfo>({
    guardiansAgree: false,
    studyContinue: "not_decided",
    reason: "",
    jobStatus: "",
    ...data.marriage,
  })

  useEffect(() => {
    updateData({ marriage })
  }, [marriage, updateData])

  const handleChange = (field: keyof MarriageInfo, value: string | boolean) => {
    setMarriage((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="guardiansAgree"
          checked={marriage.guardiansAgree}
          onCheckedChange={(checked) => handleChange("guardiansAgree", checked)}
        />
        <Label htmlFor="guardiansAgree">Do your guardians agree to your marriage decision?</Label>
      </div>

      <div>
        <Label htmlFor="studyContinue">Will you continue your studies after marriage?</Label>
        <Select
          value={marriage.studyContinue || "not_decided"}
          onValueChange={(value) => handleChange("studyContinue", value === "" ? "not_decided" : value)}
        >
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
            <SelectItem value="not_decided">Not decided yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="reason">Reason for Marriage *</Label>
        <Select value={marriage.reason} onValueChange={(value) => handleChange("reason", value)}>
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal choice</SelectItem>
            <SelectItem value="family">Family decision</SelectItem>
            <SelectItem value="religious">Religious obligation</SelectItem>
            <SelectItem value="social">Social pressure</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="jobStatus">Job Status After Marriage</Label>
        <Select
          value={marriage.jobStatus || "not_decided"}
          onValueChange={(value) => handleChange("jobStatus", value === "" ? "not_decided" : value)}
        >
          <SelectTrigger className="border-emerald-200 dark:border-emerald-700">
            <SelectValue placeholder="Select job status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="continue">Will continue current job</SelectItem>
            <SelectItem value="change">Will change job</SelectItem>
            <SelectItem value="quit">Will quit job</SelectItem>
            <SelectItem value="start">Will start working</SelectItem>
            <SelectItem value="not_decided">Not decided yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Important Note</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Please discuss these matters with your family and potential spouse. Clear communication about expectations is
          essential for a successful marriage.
        </p>
      </div>
    </div>
  )
}
