import React, { useState } from 'react';
import './help.css';

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState(null);

    // The enriched dataset with actionable information
    const helpCategories = [
        {
            title: "Financial Support",
            services: [
                {
                    name: "CDC Vouchers Scheme",
                    source: "Community Development Council (CDC)",
                    description: "Digital vouchers to help Singaporean households with daily expenses at participating heartland merchants, hawkers, and supermarkets.",
                    eligibility: ["At least one Singapore Citizen in the household."],
                    steps: ["Visit go.gov.sg/cdcv", "Tap on 'Claim Vouchers' and log in with Singpass", "Share the SMS link with household members"],
                    contact: "Hotline: 6225 5322 (PA Contact Centre)"
                },
                {
                    name: "SupportGoWhere Hub",
                    source: "GovTech / MSF",
                    description: "A centralized portal to find and apply for various government grants and funds.",
                    eligibility: ["Varies depending on the specific grant."],
                    steps: ["Navigate to supportgowhere.life.gov.sg", "Complete the initial assessment questionnaire", "Log in via Singpass to apply for matched schemes"],
                    contact: "Submit queries via the SupportGoWhere feedback portal."
                }
            ]
        },
        {
            title: "Healthcare Services",
            services: [
                {
                    name: "CHAS (Community Health Assist Scheme)",
                    source: "Ministry of Health (MOH)",
                    description: "Subsidies for medical and dental care at participating General Practitioners (GPs) and dental clinics.",
                    eligibility: ["Singapore Citizen", "Meets household monthly income per person criteria"],
                    steps: ["Visit the CHAS online application portal", "Log in using your Singpass", "Submit your household information for assessment"],
                    contact: "Hotline: 1800-275-2427 (1800-ASK-CHAS)"
                },
                {
                    name: "HealthHub Appointments",
                    source: "Health Promotion Board (HPB)",
                    description: "Manage your polyclinic and public hospital appointments digitally.",
                    eligibility: ["All Singapore residents with a Singpass account"],
                    steps: ["Download the HealthHub App or visit healthhub.sg", "Log in via Singpass", "Navigate to 'Appointments' to book or reschedule"],
                    contact: "Email: contact_us@healthpoints.sg"
                }
            ]
        },
        {
            title: "Employment & Skills",
            services: [
                {
                    name: "SkillsFuture Credit",
                    source: "SkillsFuture Singapore",
                    description: "An opening credit of $500 to encourage lifelong learning and skills upgrading.",
                    eligibility: ["Singapore Citizens aged 25 and above"],
                    steps: ["Log in to the MySkillsFuture portal via Singpass", "Search for an eligible course in the directory", "Submit a claim before the course start date"],
                    contact: "Hotline: 6785 5785"
                }
            ]
        },
        {
            title: "Elderly Support",
            services: [
                {
                    name: "Silver Generation Office (SGO)",
                    source: "Agency for Integrated Care (AIC)",
                    description: "Outreach arm to connect seniors with active ageing programmes and care services.",
                    eligibility: ["Singapore Citizens and PRs aged 60 and above"],
                    steps: ["Locate the nearest AIC Link in Tampines", "Walk in for a consultation", "Or request a home visit via the AIC portal"],
                    contact: "AIC Hotline: 1800-650-6060"
                }
            ]
        }
        // Note for your team: You can easily copy/paste this structure to fill in the remaining categories!
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="help-page-container">
            <header className="help-header">
                <h1>Help & Resources</h1>
                <p>Detailed guides, eligibility criteria, and contact information for local services.</p>
            </header>

            <div className="accordion-container">
                {helpCategories.map((category, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={index} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                            <button
                                className="accordion-header"
                                onClick={() => toggleAccordion(index)}
                            >
                                <h2>{category.title}</h2>
                                <span className="accordion-icon">
                                    {isOpen ? '−' : '+'}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="accordion-content">
                                    <div className="services-list">
                                        {category.services.map((service, i) => (
                                            <div key={i} className="service-card">
                                                <div className="service-header">
                                                    <h3 className="service-name">{service.name}</h3>
                                                    <span className="service-badge">{service.source}</span>
                                                </div>

                                                <p className="service-desc">{service.description}</p>

                                                <div className="service-details">
                                                    <div className="detail-block">
                                                        <h4>Eligibility</h4>
                                                        <ul>
                                                            {service.eligibility.map((item, idx) => (
                                                                <li key={idx}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="detail-block">
                                                        <h4>How to Apply</h4>
                                                        <ol>
                                                            {service.steps.map((step, idx) => (
                                                                <li key={idx}>{step}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                </div>

                                                <div className="service-contact">
                                                    <strong>Contact:</strong> {service.contact}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}