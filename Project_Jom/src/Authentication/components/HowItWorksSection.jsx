// components/HowItWorksSection.jsx
import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Sign In with Singpass',
    desc: 'Authenticate securely with your Singpass or continue as a demo resident to explore the assistant.',
  },
  {
    number: '02',
    title: 'Ask Your Question',
    desc: 'Type or speak any question about government services in plain language — no jargon needed.',
  },
  {
    number: '03',
    title: 'Get Clear Guidance',
    desc: 'Receive concise, accurate answers with direct links to official portals and clear next steps.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="how-it-works__header">
          <span className="section-label">Simple Process</span>
          <h2 className="section-heading">How It Works</h2>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <div className="step" key={step.number}>
              <div className="step__number">{step.number}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
