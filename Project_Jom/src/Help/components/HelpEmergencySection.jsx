import { AlertTriangle, ExternalLink, Phone } from "lucide-react";

export default function HelpEmergencySection({ items }) {
  return (
    <section className="help-alert-section">
      <div className="help-section-header">
        <div>
          <span className="help-section-kicker">Fast access</span>
          <h2>Urgent & Important Help</h2>
        </div>
      </div>

      <div className="help-alert-grid">
        {items.map((item) => (
          <article key={item.id} className="help-alert-card">
            <div className="help-alert-icon">
              <AlertTriangle size={22} />
            </div>

            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="help-contact-row">
                <Phone size={16} />
                <strong>{item.phone}</strong>
              </div>

              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="help-inline-link"
                >
                  Open official website <ExternalLink size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}