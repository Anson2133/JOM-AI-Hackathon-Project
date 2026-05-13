import { BadgeCheck, UserRound } from "lucide-react";

function formatValue(value) {
  if (!value) return "-";

  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ProfileHero({ user, profile }) {
  const displayName =
    user?.displayName ||
    user?.name ||
    profile?.displayName ||
    profile?.identity?.name ||
    "Demo Resident";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="profile-hero">
      <div className="profile-hero-content">
        <div className="profile-avatar">{initials}</div>

        <div className="profile-hero-text">
          <p className="profile-eyebrow">
            <BadgeCheck size={16} />
            Resident Service Profile
          </p>

          <h1>{displayName}</h1>

          <p>
            We use your general profile information to recommend suitable
            service areas and reduce repeated eligibility checks.
          </p>
        </div>
      </div>

      <div className="profile-hero-summary">
        <div>
          <span>Residential Status</span>
          <strong>{formatValue(profile?.residentialStatus || "Resident")}</strong>
        </div>

        <div>
          <span>Profile Type</span>
          <strong>
            {formatValue(profile?.profileType || profile?.demoResidentId)}
          </strong>
        </div>

        <div>
          <span>Matching Status</span>
          <strong>Ready</strong>
        </div>
      </div>
    </section>
  );
}

export default ProfileHero;