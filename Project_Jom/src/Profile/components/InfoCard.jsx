function InfoCard({ title, rows }) {
  return (
    <section className="profile-card-box">
      <h2>{title}</h2>

      <div className="info-row-list">
        {rows.map((row) => (
          <div className="info-row" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value || "-"}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoCard;