function ProfileSection({ title, children }) {
  return (
    <section className="profile-card-box">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default ProfileSection;