import { Suspense } from "react";
import BiodatasPage from "@/components/features/public/Biodata/Biodata";

export default function BiodataPage() {
  return (
    <Suspense
      fallback={<div className="p-4 text-center">Loading biodata...</div>}
    >
      <BiodatasPage />
    </Suspense>
  );
}
