import { useNavigate } from "react-router";
import ServicesHero from "../components/ServiceHero";
import ServiceCategoryCard from "../components/CategoryCard";

import {
  serviceCategories,
} from "../data/servicesData";

import "../services.css";

function ServicesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/services/${category.id}`);
  };

  return (
    <div className="services-page">
      <ServicesHero />

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