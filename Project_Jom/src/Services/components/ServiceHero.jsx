import { Search } from "lucide-react";

function ServicesHero({ searchTerm, onSearchChange }) {
  return (
    <section className="services-hero">
      <h1>How can we help you today?</h1>

      <p>
        Discover services, check eligibility, and continue to official
        applications.
      </p>

      <div className="services-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search money, medical, jobs, elderly, school..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <p className="services-search-helper">
        Search shows up to 4 closest matches. For complex situations, use the AI assistant.
      </p>
    </section>
  );
}

export default ServicesHero;