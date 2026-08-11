import type { Metadata } from "next";
import DigitalPortalHeader from "@/components/forms/digital/DigitalPortalHeader";
import DigitalPortalFooter from "@/components/forms/digital/DigitalPortalFooter";

export const metadata: Metadata = {
  title: "City Services",
  description:
    "Apply for permits, request documents, and track your applications online with the City Government of Imus.",
};

export default function FormsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <DigitalPortalHeader />
      <div className="flex-1">{children}</div>
      <DigitalPortalFooter />
    </div>
  );
}
