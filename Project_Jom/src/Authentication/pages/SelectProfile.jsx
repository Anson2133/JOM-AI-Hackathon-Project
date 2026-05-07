import { useNavigate } from "react-router";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import demoProfiles from "../data/demoProfiles";
import "../../Authentication/selectProfile.css";

function SelectProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="select-profile-layout">
      <Header />

      <main className="select-profile-main">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>

        <section className="select-profile-title">
          <h1>Select Your Profile</h1>
          <p>
            Choose a demo profile to personalize your MyTampines Assistant
            experience.
          </p>
        </section>

        <section className="profile-grid">
          {demoProfiles.map((profile) => (
            <ProfileCard key={profile.demoResidentId} profile={profile} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default SelectProfilePage;