function ProfileHero({ user, profile }) {
  return (
    <section className="profile-hero">
      <div>
        <p className="profile-eyebrow">Resident Service Profile</p>
        <h1>{user?.displayName || "Demo Resident"}</h1>
        <p>{profile?.residentialStatus || "Resident"}</p>
      </div>

      <div className="profile-hero-card">
        <span>Profile Type</span>
        <strong>{profile?.profileType || profile?.demoResidentId || "-"}</strong>
      </div>
    </section>
  );
}

export default ProfileHero;