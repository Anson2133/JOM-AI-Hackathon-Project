import { ChevronDown } from "lucide-react";

export default function HelpFaq({ faqs, openFaqIndex, toggleFaq }) {
  return (
    <section className="help-faq-section">
      <div className="help-section-header">
        <div>
          <span className="help-section-kicker">FAQ</span>
          <h2>Common Questions</h2>
        </div>
      </div>

      <div className="help-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openFaqIndex === index;

          return (
            <article
              key={faq.question}
              className={`help-faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                type="button"
                className="help-faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>

                <ChevronDown
                  size={22}
                  className={`help-chevron ${isOpen ? "open" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="help-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}