import GovernmentExploreSidebar from "@/components/government/GovernmentExploreSidebar";

interface GovernmentPageLayoutProps {
  activeId: string;
  children: React.ReactNode;
  sidebarVariant?: "default" | "mayor";
}

export default function GovernmentPageLayout({
  activeId,
  children,
  sidebarVariant = "default",
}: GovernmentPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
        <GovernmentExploreSidebar activeId={activeId} variant={sidebarVariant} />
        <main className="min-w-0 max-w-full">{children}</main>
      </div>
    </div>
  );
}
