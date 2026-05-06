function LikelyNeedsCard({ needs }) {
  return (
    <section className="profile-card-box">
      <h2>Likely Support Areas</h2>

      <div className="needs-list">
        {needs.map((need) => (
          <span className="need-pill" key={need}>
            {need}
          </span>
        ))}
      </div>
    </section>
  );
}

export default LikelyNeedsCard;