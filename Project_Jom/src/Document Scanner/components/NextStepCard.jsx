export default function NextStepCard({ result }) {
    if (!result) return null;

    const openChatbotWithContext = () => {
        const documentContext = {
            summary: result.summary,
            scamRisk: result.scamRisk,
            relatedService: result.relatedService,
            recommendedNextStep: result.recommendedNextStep,
            mainTopic: result.mainTopic,
            detectedType: result.detectedType,
        };

        const encodedContext = encodeURIComponent(
            JSON.stringify(documentContext)
        );

        window.location.href = `/chat?documentContext=${encodedContext}`;
    };

    return (
        <div className="scanner-card">
            <h2>Recommended Next Step</h2>

            <div className="next-step-box">
                {result.recommendedNextStep ||
                    "Review the uploaded document carefully before proceeding."}
            </div>

            <div className="next-step-actions">
                <button
                    className="scanner-outline-btn full-width"
                    onClick={openChatbotWithContext}
                >
                    Ask Chatbot About This
                </button>

                <button className="scanner-outline-btn full-width">
                    Save to History
                </button>
            </div>
        </div>
    );
}