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

        <button>
          Start Chat
        </button>
      </section>
    </div>
  );
}

export default ServicesPage;