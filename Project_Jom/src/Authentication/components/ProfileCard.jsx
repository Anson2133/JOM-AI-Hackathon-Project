import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function ProfileCard({ profile }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSelect = async () => {
    try {
      setLoading(true);
      await login(profile.demoResidentId);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <button className="profile-card" onClick={handleSelect} disabled={loading}>
      <div className={`profile-avatar ${profile.color}`}>
        {profile.initials}
      </div>

      <div className="profile-content">
        <h2>{profile.name}</h2>
        <h3>{profile.role}</h3>

        <div className="profile-details">
          <p>👤 {profile.age}</p>
          <p>🏠 {profile.housing}</p>
          <p>🌐 {profile.languages}</p>
        </div>

        <p className="profile-description">{profile.description}</p>

        {loading && <p className="loading-text">Logging in...</p>}
      </div>
    </button>
  );
}

export default ProfileCard;