export default function SummaryCard({ result }) {
    if (!result) return null;

    return (
        <div className="scanner-card">
            <h2>Document Summary</h2>

            <div className="summary-content">
                <div>
                    <span className="scanner-label">Detected Type</span>
                    <strong>{result.detectedType || "Unknown Document"}</strong>
                </div>

                <div>
                    <span className="scanner-label">Main Topic</span>
                    <strong>{result.mainTopic || "Unable to determine topic"}</strong>
                </div>

                <div>
                    <span className="scanner-label">Summary</span>
                    <p>{result.summary || "No summary was generated."}</p>
                </div>
            </div>
        </div>
    );
}