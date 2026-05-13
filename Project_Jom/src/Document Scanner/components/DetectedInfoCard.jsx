export default function DetectedInfoCard({ result }) {
    if (!result?.detectedInfo) return null;

    const info = result.detectedInfo;

    const rows = [
        ["Agency", info.agency],
        ["Deadline", info.deadline],
        ["Support Amount", info.supportAmount],
        ["Action Requested", info.actionRequested],
        ["Detected Link", info.detectedLink],
    ].filter((row) => row[1]);

    if (rows.length === 0) return null;

    return (
        <div className="scanner-card">
            <h2>Detected Information</h2>

            <div className="detected-info-grid">
                {rows.map(([label, value]) => (
                    <div className="detected-info-row" key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}