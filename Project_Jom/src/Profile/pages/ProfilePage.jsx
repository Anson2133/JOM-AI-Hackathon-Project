import AppNavbar from "../components/AppNavbar";
import ProfileHero from "../components/ProfileHero";
import InfoCard from "../components/InfoCard";
import ProfileSection from "../components/ProfileSection";
import LikelyNeedsCard from "../components/LikelyNeedsCard";
import "./profile.css";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const address = profile?.housing?.registeredAddress;

  const fullAddress = address
    ? `${address.block} ${address.street}, #${address.floor}-${address.unit}, Singapore ${address.postal}`
    : "-";

  const identityRows = [
    { label: "Name", value: profile?.identity?.name },
    { label: "Partial NRIC/FIN", value: profile?.identity?.partialUinfin },
    { label: "Date of Birth", value: profile?.identity?.dateOfBirth },
    { label: "Sex", value: profile?.identity?.sex },
    { label: "Race", value: profile?.identity?.race },
    { label: "Nationality", value: profile?.identity?.nationality },
    { label: "Residential Status", value: profile?.identity?.residentialStatus },
    { label: "Marital Status", value: profile?.identity?.maritalStatus },
  ];

  const contactRows = [
    { label: "Email", value: profile?.contact?.email },
    { label: "Mobile", value: profile?.contact?.mobile },
  ];

  const housingRows = [
    { label: "Housing Type", value: profile?.housing?.housingType },
    { label: "Registered Address", value: fullAddress },
  ];

  const contextRows = [
    { label: "Age Group", value: profile?.derivedContext?.ageGroup },
    { label: "Life Stage", value: profile?.derivedContext?.lifeStage },
  ];

  const likelyNeeds = profile?.derivedContext?.likelyNeeds || [];

  if (!profile?.userId) {
    return (
      <div className="profile-page">
        <AppNavbar />
        <main className="profile-empty">
          <h1>No profile found</h1>
          <p>Please log in as a demo resident first.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <AppNavbar />

      <ProfileHero profile={profile} user={user} />

      <main className="profile-main">
        <div className="profile-column">
          <InfoCard title="Official Information" rows={identityRows} />
          <InfoCard title="Housing Information" rows={housingRows} />
          <InfoCard title="Contact Information" rows={contactRows} />
        </div>

        <div className="profile-column">
          <InfoCard title="Derived Resident Context" rows={contextRows} />
          <LikelyNeedsCard needs={likelyNeeds} />

          <ProfileSection title="Chatbot Context">
            <p className="chatbot-context-text">
              {profile?.derivedContext?.chatbotContext}
            </p>
          </ProfileSection>

          {profile?.derivedContext?.relatedResident && (
            <InfoCard
              title="Related Resident"
              rows={[
                {
                  label: "Name",
                  value: profile.derivedContext.relatedResident.name,
                },
                {
                  label: "Relationship",
                  value: profile.derivedContext.relatedResident.relationship,
                },
                {
                  label: "Partial NRIC/FIN",
                  value: profile.derivedContext.relatedResident.partialUinfin,
                },
              ]}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;