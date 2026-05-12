import React, { useState } from 'react';
import './help.css';

export default function HelpPage() {
    // States to track which accordion is open
    const [openIndex, setOpenIndex] = useState(null);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // 1. The Full Services Dataset
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
            title: "Community Booking",
            services: [
                {
                    name: "ActiveSG Facility Booking",
                    source: "ActiveSG",
                    description: "Book sports facilities such as badminton courts, swimming pools, and gyms at Our Tampines Hub and other locations.",
                    eligibility: ["All ActiveSG members (Singaporeans, PRs, and valid pass holders)"],
                    steps: ["Log in to the ActiveSG App or website via Singpass", "Select your desired facility and timeslot", "Make payment via ActiveSG Wallet or credit card"],
                    contact: "Hotline: 1800-344-1177"
                },
                {
                    name: "Community Club (CC) Courses & Facilities",
                    source: "onePA",
                    description: "Register for community courses (e.g., cooking, martial arts) and book CC facilities like multi-purpose halls.",
                    eligibility: ["Open to the general public"],
                    steps: ["Visit the onePA portal", "Search for 'Tampines' in the location filter", "Select your course/facility and checkout securely"],
                    contact: "Contact your local Tampines CC directly via the portal"
                }
            ]
        },
        {
            title: "Community Services",
            services: [
                {
                    name: "Bulky Item Removal",
                    source: "Tampines Town Council",
                    description: "Free bulky item removal service for HDB residents (up to 3 items per month).",
                    eligibility: ["Residents living in HDB flats managed by Tampines Town Council"],
                    steps: ["Call the Town Council or use the OneService App", "Book an appointment at least 3 working days in advance", "Place items outside your flat only on the day of collection"],
                    contact: "Hotline: 6781 2222 (Tampines Town Council)"
                },
                {
                    name: "Dengue & Pest Control",
                    source: "National Environment Agency (NEA)",
                    description: "Report mosquito breeding grounds or pest infestations in public municipal areas.",
                    eligibility: ["All residents"],
                    steps: ["Download the OneService App", "Select 'Submit Case' and choose 'Pests'", "Pinpoint the exact location and attach photos"],
                    contact: "NEA Hotline: 1800-225-5632"
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
            title: "Education Support",
            services: [
                {
                    name: "Child Care Subsidies",
                    source: "Early Childhood Development Agency (ECDA)",
                    description: "Basic and Additional Subsidies to help defray the cost of infant and child care fees.",
                    eligibility: ["Singapore Citizen child", "Enrolled in an ECDA-licensed centre"],
                    steps: ["Obtain the subsidy application form from your child's preschool", "Submit the completed form along with income documents to the centre", "The centre will process the application with ECDA"],
                    contact: "Email: contact@ecda.gov.sg"
                },
                {
                    name: "MOE Financial Assistance Scheme (FAS)",
                    source: "Ministry of Education (MOE)",
                    description: "Financial aid for school fees, textbooks, and uniforms for students from lower-income families.",
                    eligibility: ["Singapore Citizen attending a government or government-aided school", "Meets gross monthly household income limits"],
                    steps: ["Download the MOE FAS application form online", "Submit the form and supporting documents directly to the student's school"],
                    contact: "Contact the respective school's general office"
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
        },
        {
            title: "Accessibility & Inclusion",
            services: [
                {
                    name: "Assistive Technology Fund (ATF)",
                    source: "SG Enable",
                    description: "Subsidies for persons with disabilities to purchase assistive technology devices (e.g., wheelchairs, hearing aids).",
                    eligibility: ["Singapore Citizen or PR", "Certified to have a permanent disability"],
                    steps: ["Consult a therapist or medical social worker at a restructured hospital/polyclinic", "They will assess your need and submit the ATF application on your behalf"],
                    contact: "SG Enable Infoline: 1800-8585-885"
                }
            ]
        }
    ];

    // 2. The FAQ Dataset
    const faqData = [
        {
            question: "How do I pay my Town Council Service & Conservancy Charges (S&CC)?",
            answer: "You can pay your S&CC via AXS stations, SAM kiosks, internet banking, or by setting up a GIRO arrangement. For digital payments, you can also use the AXS m-Station app."
        },
        {
            question: "Can I walk into Tampines Polyclinic without an appointment?",
            answer: "While walk-ins are accepted for urgent conditions, it is highly recommended to book an appointment via the HealthHub app to avoid waiting times that can exceed 2-3 hours."
        },
        {
            question: "What should I do if my CDC voucher link is not working?",
            answer: "If your link has expired or isn't loading, you can visit go.gov.sg/cdcv and log in with your Singpass to retrieve your active voucher link again. Ensure you are not connected to a VPN."
        },
        {
            question: "How do I report a faulty street lamp or illegal parking?",
            answer: "The fastest way to report municipal issues is through the OneService App. Select 'Submit Case', choose the relevant category, and pin the location. The app routes it directly to the correct agency (e.g., LTA or Town Council)."
        }
    ];

    // 3. Toggle Functions
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const toggleFaqAccordion = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // 4. Page Rendering
    return (
        <div className="help-page-container">
            <header className="help-header">
                <h1>Help & Resources</h1>
                <p>Detailed guides, eligibility criteria, and contact information for local municipal services.</p>
            </header>

            {/* SERVICES SECTION */}
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

            {/* FAQ SECTION */}
            <div className="faq-section">
                <h2 className="faq-header-title">Frequently Asked Questions</h2>
                <div className="accordion-container">
                    {faqData.map((faq, index) => {
                        const isOpen = openFaqIndex === index;

                        return (
                            <div key={`faq-${index}`} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                                <button
                                    className="accordion-header"
                                    onClick={() => toggleFaqAccordion(index)}
                                >
                                    <h3 className="faq-question">{faq.question}</h3>
                                    <span className="accordion-icon">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="accordion-content faq-answer-box">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}