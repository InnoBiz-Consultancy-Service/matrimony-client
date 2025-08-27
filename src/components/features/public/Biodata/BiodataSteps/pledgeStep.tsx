"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PledgeInfo, StepProps } from "@/types/biodataForm";

export default function PledgeStep({ data, updateData }: StepProps) {
  const [pledge, setPledge] = useState<PledgeInfo>({
    parentsAware: false,
    informationAccurate: false,
    nikahResponsibility: false,
    ...data.pledge,
  });

  useEffect(() => {
    updateData({ pledge });
  }, [pledge, updateData]);

  const handleChange = (field: keyof PledgeInfo, value: boolean) => {
    setPledge((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
          Final Pledge
        </h2>
        <p className="text-muted-foreground">
          Please read and confirm the following statements before submitting
          your biodata.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-3 p-4 border border-emerald-200 dark:border-emerald-700 rounded-lg">
          <Checkbox
            id="parentsAware"
            checked={pledge.parentsAware}
            onCheckedChange={(checked: boolean) =>
              handleChange("parentsAware", checked)
            }
            className="mt-1"
          />
          <div>
            <Label
              htmlFor="parentsAware"
              className="text-base font-medium cursor-pointer"
            >
              Parents/Guardians Awareness
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              I confirm that my parents/guardians are aware of my intention to
              get married and I have their consent for this biodata submission.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 border border-emerald-200 dark:border-emerald-700 rounded-lg">
          <Checkbox
            id="informationAccurate"
            checked={pledge.informationAccurate}
            onCheckedChange={(checked: boolean) =>
              handleChange("informationAccurate", checked)
            }
            className="mt-1"
          />
          <div>
            <Label
              htmlFor="informationAccurate"
              className="text-base font-medium cursor-pointer"
            >
              Information Accuracy
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              I declare that all the information provided in this biodata is
              true and accurate to the best of my knowledge. I understand that
              any false information may lead to rejection of my proposal.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 border border-emerald-200 dark:border-emerald-700 rounded-lg">
          <Checkbox
            id="nikahResponsibility"
            checked={pledge.nikahResponsibility}
            onCheckedChange={(checked: boolean) =>
              handleChange("nikahResponsibility", checked)
            }
            className="mt-1"
          />
          <div>
            <Label
              htmlFor="nikahResponsibility"
              className="text-base font-medium cursor-pointer"
            >
              Marriage Responsibility
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              I understand the responsibilities of marriage in Islam and am
              committed to fulfilling my duties as a spouse according to Islamic
              principles.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">
          Important Reminders
        </h3>
        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
          <li>
            • Marriage is a sacred bond in Islam that requires commitment and
            responsibility
          </li>
          <li>
            • Always involve your parents/guardians in the marriage process
          </li>
          <li>• Be honest and transparent in all communications</li>
          <li>• Pray Istikhara before making any final decisions</li>
          <li>• Focus on character and deen over worldly matters</li>
        </ul>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          By checking all the boxes above and submitting this form, you agree to
          our terms and conditions for biodata matching services.
        </p>
      </div>
    </div>
  );
}
