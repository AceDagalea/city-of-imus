import type { Metadata } from "next";
import DigitalPortalHeader from "@/components/forms/digital/DigitalPortalHeader";
import DigitalPortalFooter from "@/components/forms/digital/DigitalPortalFooter";

export const metadata: Metadata = {
  title: "Digital Services",
  description:
    "Access City of Imus government services online — apply for permits, certificates, and more.",
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
