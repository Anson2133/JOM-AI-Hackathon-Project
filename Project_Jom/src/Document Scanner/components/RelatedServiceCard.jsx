export default function RelatedServiceCard({ result }) {
    if (!result?.relatedService) return null;

    const service = result.relatedService;

    const openServiceGuidance = () => {
        const categoryId = service.categoryId;
        const serviceId = service.serviceId;

        if (!categoryId || !serviceId) {
            alert("Service link is missing category or service ID.");
            return;
        }

        window.location.href = `/services/${categoryId}?serviceId=${serviceId}&fromChat=true`;
    };

    return (
        <div className="scanner-card">
            <h2>Related Service</h2>

            <div className="related-service-content">
                <div className="related-service-top">
                    <div>
                        <h3>{service.serviceName || "Related Service"}</h3>
                        <p>{service.agency || service.websiteName || "Official service"}</p>
                    </div>

                    <span className="match-badge">
                        {service.matchLevel || "Possible Match"}
                    </span>
                </div>

                <p className="service-description">
                    {service.description ||
                        "This service appears related to the uploaded document."}
                </p>

                <div className="scanner-action-row">
                    <button
                        className="scanner-primary-btn"
                        onClick={openServiceGuidance}
                    >
                        View Service Guidance
                    </button>

                    {service.sourceUrl && (
                        <a
                            href={service.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="scanner-outline-btn"
                        >
                            Official Website
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}