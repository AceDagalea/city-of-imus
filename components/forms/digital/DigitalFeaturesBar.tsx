import { Shield, Zap, Leaf, Eye } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Secure",
    description: "Your data is protected with government-grade security standards.",
  },
  {
    icon: Zap,
    title: "Fast & Convenient",
    description: "Apply from anywhere — no need to visit City Hall for simple transactions.",
  },
  {
    icon: Leaf,
    title: "Paperless",
    description: "Submit documents digitally and reduce paper waste.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Track your application status and view processing timelines.",
  },
];

export default function DigitalFeaturesBar() {
  return (
    <section className="bg-imus-sky py-12 md:py-14" aria-label="Platform features">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-imus-navy sm:mx-0">
                  <Icon className="h-5 w-5 text-imus-navy" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-imus-navy">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
