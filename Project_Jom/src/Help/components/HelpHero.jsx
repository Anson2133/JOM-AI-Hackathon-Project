import { ShieldAlert } from "lucide-react";

export default function HelpHero() {
  return (
    <section className="help-hero">
      <div>
        <span className="help-eyebrow">MyTampines Assistant</span>
        <h1>Help & Directory</h1>
        <p>
          Quickly find hotlines, official websites, reporting channels, and the
          right feature to use when you need support.
        </p>
      </div>

      <div className="help-hero-card">
        <ShieldAlert size={34} />

        <div>
          <strong>Not sure where to start?</strong>
          <p>
            Use the chatbot for general questions, Services for eligibility, or
            this page for direct contacts.
          </p>
        </div>
      </div>
    </section>
  );
}