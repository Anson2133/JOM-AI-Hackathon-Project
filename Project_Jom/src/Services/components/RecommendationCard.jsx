function RecommendationCard({ service, onViewGuidance }) {
  return (
    <div className="recommended-service-card">
      <div className="recommended-service-top">
        <div>
          <h3>{service.serviceName}</h3>
          <p>{service.description}</p>
        </div>

        <span className="match-pill">
          {service.matchLevel || service.status || "Open"}
        </span>
      </div>

      <div className="recommended-service-meta">
        <div>
          <span>Agency</span>
          <strong>{service.agency || service.websiteName || "-"}</strong>
        </div>

        <div>
          <span>Application</span>
          <strong>{service.applicationMethod || "-"}</strong>
        </div>

        <div>
          <span>Match Score</span>
          <strong>{service.matchScore ?? "-"}%</strong>
        </div>
      </div>

      {service.aiReason && <p className="ai-reason">{service.aiReason}</p>}

      {(service.aiEligibilityView || service.aiConfidence) && (
        <div className="ai-review-box">
          <strong>AI Review</strong>
          <p>
            {service.aiEligibilityView || "Needs Confirmation"}
            {service.aiConfidence ? ` · ${service.aiConfidence} confidence` : ""}
          </p>
        </div>
      )}

      {(service.aiConcerns || []).length > 0 && (
        <div className="ai-concerns-box">
          <strong>Things to note</strong>
          {service.aiConcerns.map((concern, index) => (
            <p key={index}>• {concern}</p>
          ))}
        </div>
      )}

      {(service.extraQuestions || []).length > 0 && (
        <p className="extra-question-hint">
          This service has {service.extraQuestions.length} follow-up question
          {service.extraQuestions.length > 1 ? "s" : ""} before applying.
        </p>
      )}

      <button className="continue-btn" onClick={onViewGuidance}>
        View Guidance
      </button>
    </div>
  );
}

export default RecommendationCard;