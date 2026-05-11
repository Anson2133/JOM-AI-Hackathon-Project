import { useNavigate } from "react-router";
import { Info } from "lucide-react";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import demoProfiles from "../data/demoProfiles";
import "../SelectProfile.css";

function SelectProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="select-profile-layout">
      <Header />

      <main className="select-profile-main">
        {/* Hero Banner */}
        <div className="select-profile-hero">
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <h1 className="select-profile-hero__title">Choose a Resident Profile</h1>
          <p className="select-profile-hero__subtitle">
            Select a persona to experience how MyTampines Assistant helps<br />
            real residents navigate government services.
          </p>
        </div>

        {/* Info Banner */}
        <div className="select-profile-content">
          <div className="select-profile-notice">
            <Info size={16} className="select-profile-notice__icon" />
            <span>Each profile reflects a real Tampines resident scenario. Click a card to select, then start the demo chat.</span>
          </div>

          <section className="profile-grid">
            {demoProfiles.map((profile) => (
              <ProfileCard key={profile.demoResidentId} profile={profile} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default SelectProfilePage;
