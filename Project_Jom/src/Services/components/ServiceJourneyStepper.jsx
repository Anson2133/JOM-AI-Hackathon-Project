function ServiceStepper({ currentStep = 1 }) {
  const steps = [
    "Support Need",
    "Profile Match",
    "Recommendations",
    "Eligibility Check",
    "Service Guide",
    "Documents",
    "Official Site",
  ];

  return (
    <div className="service-stepper">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div
            key={step}
            className={`step-item ${currentStep >= stepNumber ? "active" : ""}`}
          >
            <div className="step-circle">
              {stepNumber}
            </div>

            <p>{step}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceStepper;