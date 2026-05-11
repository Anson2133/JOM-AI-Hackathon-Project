import { CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function ScanProgress({ steps }) {
  return (
    <section className="scanner-card scan-progress-card">
      <h2>Scan Progress</h2>

      <div className="scan-step-list">
        {steps.map((step) => (
          <div key={step.label} className={`scan-step ${step.status}`}>
            {step.status === "done" && <CheckCircle2 size={20} />}
            {step.status === "active" && <Loader2 size={20} />}
            {step.status === "pending" && <Circle size={20} />}

            <span>{step.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}