import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import ServicesHero from "../components/ServiceHero";
import ServiceCategoryCard from "../components/CategoryCard";

import { serviceCategories } from "../data/servicesData";
import useServices from "../hooks/useServices";

import "../services.css";

const stopWords = [
  "help",
  "support",
  "service",
  "services",
  "scheme",
  "schemes",
  "assistance",
  "need",
  "want",
  "looking",
  "for",
  "with",
  "and",
  "the",
  "to",
];

const synonymMap = {
  money: ["financial", "cash", "income", "subsidy", "bills", "comcare"],
  cash: ["money", "financial", "income", "subsidy"],
  bills: ["bill", "utilities", "medical", "financial"],

  job: ["employment", "career", "skills", "training", "workforce"],
  work: ["employment", "job", "career", "skills"],
  training: ["skills", "career", "employment"],

  elderly: ["senior", "aged", "ageing", "mobility"],
  senior: ["elderly", "aged", "ageing", "mobility"],

  medical: ["healthcare", "hospital", "clinic", "medisave", "medishield", "chas"],
  health: ["medical", "healthcare", "hospital", "clinic"],
  healthcare: ["medical", "health", "hospital", "clinic"],

  school: ["education", "student", "bursary", "fees", "transport"],
  student: ["school", "education", "bursary", "fees"],
  education: ["school", "student", "bursary"],

  housing: ["rental", "flat", "hdb", "home"],
  hdb: ["housing", "rental", "flat", "home"],

  family: ["parent", "child", "children", "household"],
  child: ["children", "family", "student", "school"],

  disability: ["mobility", "assistive", "accessibility"],
  mobility: ["disability", "assistive", "elderly", "senior"],
};

function expandSearchQuery(query) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3)
    .filter((word) => !stopWords.includes(word));

  const expanded = words.flatMap((word) => [
    word,
    ...(synonymMap[word] || []),
  ]);

  return [...new Set(expanded)];
}

function getSearchableText(service) {
  return [
    service.serviceName,
    service.name,
    service.title,
    service.description,
    service.shortDescription,
    service.categoryId,
    service.category,
    service.serviceCategory,
    service.agency,
    service.websiteName,
    service.targetGroup,
    service.applicationMethod,
    ...(service.tags || []),
    ...(service.requiredDocuments || []),
    ...(service.applicationSteps || []),
    ...(service.eligibilitySummary || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function formatCategoryLabel(value) {
  if (!value) return "Service";

  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSafeCategoryId(service) {
  const possibleCategory =
    service.categoryId ||
    service.category ||
    service.serviceCategory;

  if (!possibleCategory) return "financial-support";

  const normalized = String(possibleCategory).toLowerCase();

  const matchedCategory = serviceCategories.find(
    (category) =>
      category.id === normalized ||
      category.title.toLowerCase() === normalized
  );

  return matchedCategory ? matchedCategory.id : normalized.replaceAll(" ", "-");
}

function ServicesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { services = [], loading, error } = useServices();

  const handleCategoryClick = (category) => {
    navigate(`/services/${category.id}`);
  };

  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (query.length < 2) return [];

    const searchWords = expandSearchQuery(query);

    if (searchWords.length === 0) return [];

    return services
      .map((service) => {
        const serviceName = String(
          service.serviceName || service.name || service.title || ""
        ).toLowerCase();

        const description = String(service.description || "").toLowerCase();
        const categoryId = String(service.categoryId || "").toLowerCase();
        const serviceCategory = String(service.serviceCategory || "").toLowerCase();
        const agency = String(service.agency || service.websiteName || "").toLowerCase();
        const searchableText = getSearchableText(service);

        let score = 0;

        if (serviceName.includes(query)) score += 90;
        if (categoryId.includes(query)) score += 45;
        if (serviceCategory.includes(query)) score += 40;
        if (agency.includes(query)) score += 25;
        if (description.includes(query)) score += 20;

        searchWords.forEach((word) => {
          if (serviceName.includes(word)) score += 35;
          if (categoryId.includes(word)) score += 25;
          if (serviceCategory.includes(word)) score += 25;
          if (agency.includes(word)) score += 12;
          if (description.includes(word)) score += 10;
          if (searchableText.includes(word)) score += 4;
        });

        return {
          ...service,
          searchScore: score,
        };
      })
      .filter((service) => service.searchScore >= 20)
      .sort((a, b) => b.searchScore - a.searchScore)
      .slice(0, 4);
  }, [searchTerm, services]);

  return (
    <div className="services-page">
      <ServicesHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {searchTerm.trim().length >= 2 && (
        <section className="services-search-panel">
          <div className="services-search-panel-header">
            <div>
              <h2>Closest Matches</h2>
              <p>
                Showing up to 4 services related to{" "}
                <strong>"{searchTerm}"</strong>.
              </p>
            </div>

            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          </div>

          {loading && (
            <div className="services-search-state">
              Loading services...
            </div>
          )}

          {error && (
            <div className="services-search-state error">
              Failed to load services. Please try again later.
            </div>
          )}

          {!loading && !error && filteredServices.length === 0 && (
            <div className="services-empty-search">
              <h3>No close match found</h3>

              <p>
                Try simpler words like money, medical, job, elderly, school,
                housing, family, or disability.
              </p>

              <button onClick={() => navigate("/chat")}>
                Ask AI Assistant
              </button>
            </div>
          )}

          {!loading && !error && filteredServices.length > 0 && (
            <div className="services-results-list">
              {filteredServices.map((service) => {
                const categoryId = getSafeCategoryId(service);

                return (
                  <article
                    key={service.serviceId || service.id || service.serviceName}
                    className="service-result-card"
                  >
                    <div className="service-result-main">
                      <div className="service-result-icon">
                        {formatCategoryLabel(categoryId).charAt(0)}
                      </div>

                      <div className="service-result-content">
                        <div className="service-result-title-row">
                          <h3>
                            {service.serviceName || service.name || service.title}
                          </h3>

                          <span className="service-result-category">
                            {formatCategoryLabel(categoryId)}
                          </span>
                        </div>

                        <p>
                          {service.shortDescription ||
                            service.description ||
                            "No description available."}
                        </p>

                        <div className="service-result-details">
                          <span>
                            Agency:{" "}
                            <strong>
                              {service.agency ||
                                service.websiteName ||
                                "Not specified"}
                            </strong>
                          </span>

                          <span>
                            Next step:{" "}
                            <strong>Eligibility check</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="service-result-btn"
                      onClick={() =>
                        navigate(
                          `/services/${categoryId}?serviceId=${service.serviceId}&fromSearch=true`
                        )
                      }
                    >
                      Check Eligibility
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {searchTerm.trim().length === 1 && (
        <p className="search-minimum-hint">
          Type at least 2 characters to search.
        </p>
      )}

      <section className="services-section">
        <div className="services-section-header">
          <h2>Browse by Category</h2>

          <p>
            Select a category to start your journey.
          </p>
        </div>

        <div className="services-grid">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </section>

      <section className="services-chat-cta">
        <div>
          <h2>Need personalised help?</h2>

          <p>
            Chat with our AI assistant to get customized
            service recommendations.
          </p>
        </div>

        <button onClick={() => navigate("/chat")}>
          Start Chat
        </button>
      </section>

      <div className="document-scanner-cta">
        <div className="document-scanner-cta-content">
          <div className="document-scanner-pill">
            New AI Feature
          </div>

          <h2>Document Scanner</h2>

          <p>
            Upload government letters, PDFs, screenshots, SMS messages,
            or notices to understand what they mean, check scam risk,
            and connect to the right service guidance flow.
          </p>

          <div className="document-scanner-tags">
            <span>AI Summary</span>
            <span>Scam Detection</span>
            <span>Service Matching</span>
            <span>Textract + Bedrock</span>
          </div>

          <button
            className="document-scanner-btn"
            onClick={() => navigate("/document-scanner")}
          >
            Open Document Scanner
          </button>
        </div>

        <div className="document-scanner-visual">
          <div className="scanner-preview-window">
            <div className="scanner-red-line" />

            <div className="scanner-preview-document">
              <div className="scanner-preview-header" />

              <div className="scanner-preview-line short" />
              <div className="scanner-preview-line" />
              <div className="scanner-preview-line" />
              <div className="scanner-preview-line medium" />

              <div className="scanner-preview-alert">
                Scam Risk Analysis Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;