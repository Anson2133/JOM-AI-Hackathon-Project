import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProfileHero from "../components/ProfileHero";
import InfoCard from "../components/InfoCard";
import ProfileSection from "../components/ProfileSection";
import "../../Profile/profile.css";

const PROFILE_API_URL =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/profile";

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${PROFILE_API_URL}/${userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data.user);
        setProfile(data.profile);
        localStorage.setItem(
          "cachedProfile",
          JSON.stringify({
            displayName: data.user.displayName,
            ...data.profile,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <main className="profile-empty">
          <h1>Loading profile...</h1>
        </main>
      </div>
    );
  }

  if (!profile?.userId) {
    return (
      <div className="profile-page">
        <main className="profile-empty">
          <h1>No profile found</h1>
          <p>Please log in as a demo resident first.</p>
        </main>
      </div>
    );
  }

  const serviceRows = [
    { label: "Age", value: profile.age },
    { label: "Residential Status", value: profile.residentialStatus },
    { label: "Housing Type", value: profile.housingType },
    { label: "Household Type", value: profile.householdType },
  ];

  const householdRows = [
    { label: "Employment Status", value: profile.employmentStatus },
    { label: "Income Band", value: profile.incomeBand },
    { label: "Marital Status", value: profile.maritalStatus },
  ];

  const supportRows = [
    { label: "Has Children", value: profile.hasChildren ? "Yes" : "No" },
    { label: "Caregiver", value: profile.caregiver ? "Yes" : "No" },
    { label: "Mobility Needs", value: profile.mobilityNeeds ? "Yes" : "No" },
  ];

  return (
    <div className="profile-page">
      <ProfileHero user={user} profile={profile} />

      <main className="profile-main">
        <div className="profile-column">
          <InfoCard title="Service Matching Profile" rows={serviceRows} />
          <InfoCard title="Household Information" rows={householdRows} />
          <InfoCard title="Support Needs" rows={supportRows} />
        </div>

        <div className="profile-column">
          <ProfileSection title="Service Recommendations">
            <p className="profile-muted-text">
              Recommendations will appear here after you explore available
              services and complete a service journey.
            </p>

            <button
              className="profile-action-btn"
              onClick={() => navigate("/services")}
            >
              Explore Services
            </button>
          </ProfileSection>

          <ProfileSection title="Privacy Note">
            <p className="profile-muted-text">
              This profile only stores general service-matching information such
              as age, housing type, income band, and support needs. It does not
              store NRIC, exact income, address, email, or phone number.
            </p>
          </ProfileSection>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;