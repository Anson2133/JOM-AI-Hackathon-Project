import { Edit } from "lucide-react";

function ProfileHero({ profile, user }) {
  const name = user?.name || profile?.identity?.name || "Demo Resident";
  const lifeStage = profile?.derivedContext?.lifeStage || "Tampines resident";
  const nationality = profile?.identity?.nationality || "Resident";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="profile-hero">
      <div className="profile-hero-left">
        <div className="profile-hero-avatar">{initials}</div>

        <div>
          <h1>{name}</h1>
          <p>
            {lifeStage} · {nationality}
          </p>

          <div className="active-profile-pill">
            <span></span>
            Active profile
          </div>
        </div>
      </div>

      <button className="edit-profile-button">
        <Edit size={22} />
        Edit Profile
      </button>
    </section>
  );
}

export default ProfileHero;