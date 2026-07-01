interface FormStepperProps {
  steps: { title: string }[];
  currentStep: number;
}

export default function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-card md:p-6">
      <div className="flex items-start justify-between gap-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.title} className={`flex flex-1 items-start ${isLast ? "" : "min-w-0"}`}>
              <div className="flex w-full min-w-0 flex-col items-center">
                <div className="flex w-full items-center">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-tenant-navy text-white shadow-md"
                        : isComplete
                          ? "bg-tenant-navy/15 text-tenant-navy"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {!isLast && (
                    <div
                      className={`mx-1 h-0.5 flex-1 ${isComplete ? "bg-tenant-navy/30" : "bg-gray-200"}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p
                  className={`mt-2 hidden text-center text-[11px] font-medium leading-tight sm:block ${
                    isActive ? "text-tenant-navy" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs font-medium text-tenant-navy sm:hidden">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
      </p>
    </div>
  );
}
