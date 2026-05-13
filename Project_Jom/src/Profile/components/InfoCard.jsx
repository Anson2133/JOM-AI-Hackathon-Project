function InfoCard({ title, rows = [], icon }) {
  return (
    <section className="info-card">
      <div className="info-card-header">
        {icon && <div className="info-card-icon">{icon}</div>}
        <h2>{title}</h2>
      </div>

      <div className="info-card-rows">
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