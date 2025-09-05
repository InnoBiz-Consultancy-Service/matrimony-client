"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { BiodataFormData } from "@/types/biodataForm";
import PersonalInfoStep from "../Biodata/BiodataSteps/personalInformation";
import AddressStep from "../Biodata/BiodataSteps/addressStep";
import EducationStep from "../Biodata/BiodataSteps/EducationSteps";
import FamilyStep from "../Biodata/BiodataSteps/familyInformationSteps";
import OccupationStep from "../Biodata/BiodataSteps/occupationStep";
import MarriageStep from "../Biodata/BiodataSteps/marriageStep";
import PreferenceStep from "../Biodata/BiodataSteps/preferenceStep";
import PledgeStep from "../Biodata/BiodataSteps/pledgeStep";
import { setCookie } from "@/app/(auth)/login/page";
import { useAuth } from "@/app/(auth)/context/auth-context";
import axios from "axios";
import { toast } from "sonner";

const STORAGE_KEY = "biodata-form-data";
const STEP_KEY = "biodata-current-step";

const steps = [
  { id: 1, title: "Personal Info", component: PersonalInfoStep },
  { id: 2, title: "Address", component: AddressStep },
  { id: 3, title: "Education", component: EducationStep },
  { id: 4, title: "Family", component: FamilyStep },
  { id: 5, title: "Occupation", component: OccupationStep },
  { id: 6, title: "Marriage", component: MarriageStep },
  { id: 7, title: "Preference", component: PreferenceStep },
  { id: 8, title: "Pledge", component: PledgeStep },
];

export default function BiodataForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BiodataFormData>({});
  const [mounted, setMounted] = useState(false);

  const { user } = useAuth();
  // Load data from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_KEY);

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }

    if (savedStep) {
      setCurrentStep(safeParseInt(savedStep));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (mounted && Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, mounted]);

  // Save current step to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STEP_KEY, currentStep.toString());
    }
  }, [currentStep, mounted]);

  const updateFormData = useCallback((stepData: Partial<BiodataFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
      }

      // Add user information to payload
      const payload = {
        ...formData,
        email: user?.userEmail,
        name: user?.name,
        userId: user?.userId,
        age: formData?.personal?.age,
        gender: user?.gender
      };
      console.log(payload)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/biodata`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      // console.log("Profile update successful:", response.data);
      toast.success("Profile post successfully!");

      return response.data;
    } catch (error: unknown) {
      console.error("Profile post failed:", error);

      let errorMessage = "Failed to post profile. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      throw error;
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  const safeParseInt = (value: string): number => {
    const parsed = Number.parseInt(value);
    return isNaN(parsed) ? 1 : parsed;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-yellow-50 dark:from-emerald-950 dark:to-yellow-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">
            Biodata Form
          </h1>
        </div>

        {/* Progress */}
        <Card className="mb-6 border-emerald-200 dark:border-emerald-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-emerald-100 dark:bg-emerald-900"
            />
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-xs px-2 py-1 rounded ${
                    step.id === currentStep
                      ? "bg-emerald-500 text-white"
                      : step.id < currentStep
                      ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-200"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Step */}
        <Card className="border-emerald-200 dark:border-emerald-700">
          <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20">
            <CardTitle className="text-emerald-800 dark:text-emerald-200">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CurrentStepComponent data={formData} updateData={updateFormData} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-emerald-200 dark:border-emerald-700 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Submit Form
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
