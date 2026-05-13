import { Search } from "lucide-react";

function getResidentName() {
  try {
    const cachedProfile = JSON.parse(
      localStorage.getItem("cachedProfile") || "{}"
    );

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
      cachedProfile?.displayName ||
      cachedProfile?.name ||
      cachedProfile?.identity?.name ||
      user?.displayName ||
      user?.name ||
      "there"
    );
  } catch {
    return "there";
  }
}

function ServicesHero({ searchTerm, onSearchChange }) {
  const residentName = getResidentName();

  return (
    <section className="services-hero">
      <p className="services-welcome-text">Welcome back, {residentName}</p>

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
        Search shows up to 4 closest matches. For complex situations, use the AI
        assistant.
      </p>
    </section>
  );
}

export default ServicesHero;