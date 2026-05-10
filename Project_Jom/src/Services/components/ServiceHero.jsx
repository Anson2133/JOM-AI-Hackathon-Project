import { Search } from "lucide-react";

function ServicesHero() {
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
          placeholder="Search for services, support, or assistance..."
        />
      </div>
    </section>
  );
}

export default ServicesHero;