import { Suspense } from "react";
import FormsPageContent from "@/components/forms/digital/FormsPageContent";

export default function FormsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse bg-tenant-gray" />}>
      <FormsPageContent />
    </Suspense>
  );
}
