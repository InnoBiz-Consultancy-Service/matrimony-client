"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { OccupationInfo, StepProps } from "@/types/biodataForm"

export default function OccupationStep({ data, updateData }: StepProps) {
  const [occupation, setOccupation] = useState<OccupationInfo>({
    current: "",
    description: "",
    income: {
      amount: 0,
      currency: "BDT",
    },
    ...data.occupation,
  })

  useEffect(() => {
    updateData({ occupation })
  }, [occupation, updateData])

  const handleChange = (field: keyof OccupationInfo, value: string) => {
    setOccupation((prev) => ({ ...prev, [field]: value }))
  }

  const handleIncomeChange = (field: keyof OccupationInfo["income"], value: string | number) => {
    setOccupation((prev) => ({
      ...prev,
      income: { ...prev.income, [field]: value },
    }))
  }

  const handleIncomeAmountChange = (value: string) => {
    const numValue = Number.parseInt(value) || 0
    handleIncomeChange("amount", numValue)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="current">Current Occupation *</Label>
        <Input
          id="current"
          value={occupation.current}
          onChange={(e) => handleChange("current", e.target.value)}
          placeholder="e.g., Student, Engineer, Teacher, etc."
          className="border-emerald-200 dark:border-emerald-700"
        />
      </div>

      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={occupation.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe your current job or occupation"
          className="border-emerald-200 dark:border-emerald-700"
          rows={4}
        />
      </div>

      <div>
        <Label className="text-base font-semibold text-emerald-800 dark:text-emerald-200">Income Information</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <Label htmlFor="amount">Monthly Income Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              value={occupation.income.amount}
              onChange={(e) => handleIncomeAmountChange(e.target.value)}
              placeholder="Enter monthly income"
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={occupation.income.currency}
              onChange={(e) => handleIncomeChange("currency", e.target.value)}
              placeholder="e.g., BDT, USD, etc."
              className="border-emerald-200 dark:border-emerald-700"
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Note</h3>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Please provide accurate information about your occupation and income. This information will be used for
          matching purposes and should reflect your current situation.
        </p>
      </div>
    </div>
  )
}
