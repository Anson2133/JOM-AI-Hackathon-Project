import { AlertTriangle } from "lucide-react";

export default function ScamRiskCard({ result }) {
    if (!result?.scamRisk) return null;

    const risk = result.scamRisk;
    const level = String(risk.level || "Unknown").toLowerCase();

    return (
        <div className="scanner-card">
            <div className="scanner-card-header">
                <h2>Scam Risk</h2>

                <span className={`risk-badge ${level}`}>
                    <AlertTriangle size={16} />
                    {risk.level || "Unknown"} Risk
                </span>
            </div>

            <h3>Reasons</h3>

            <ul className="risk-reason-list">
                {(risk.reasons || []).map((reason, index) => (
                    <li key={index}>
                        <AlertTriangle size={16} />
                        <span>{reason}</span>
                    </li>
                ))}
            </ul>

            <div className="safe-action-box">
                <strong>Safe Action</strong>
                <p>{risk.safeAction || "Verify through official channels before proceeding."}</p>
            </div>
        </div>
    );
}