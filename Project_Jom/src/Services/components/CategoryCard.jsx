import { ArrowRight } from "lucide-react";

function ServiceCategoryCard({ category, onClick }) {
  const Icon = category.icon;

  return (
    <button className="service-category-card" onClick={() => onClick(category)}>
      <div className="service-category-icon">
        <Icon size={28} />
      </div>

      <h3>{category.title}</h3>
      <p>{category.description}</p>

      <span className="service-category-link">
        Start Journey
        <ArrowRight size={16} />
      </span>
    </button>
  );
}

export default ServiceCategoryCard;