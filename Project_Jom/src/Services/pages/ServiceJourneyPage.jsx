import { useState } from "react";
import { useParams } from "react-router";

import ServiceStepper from "../components/ServiceJourneyStepper";
import ServiceCard from "../components/RecommendationCard";

import { supportNeeds } from "../data/servicesData";
import useServices from "../hooks/useServices";
import useServiceMatch from "../hooks/useServiceMatch";
import useGeneratePdfGuide from "../hooks/useGeneratePdfGuide";
import useSendGuideEmail from "../hooks/useSendGuideEmail";

import "../services.css";

function ServiceJourneyPage() {
  const { categoryId } = useParams();

  const { services, loading } = useServices();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [pdfEmail, setPdfEmail] = useState("");
  const [matchProgress, setMatchProgress] = useState(0);

  const cachedProfile = JSON.parse(
    localStorage.getItem("cachedProfile") || "{}"
  );

  const needs = supportNeeds[categoryId] || [];

  const goNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const {
    matches,
    profileUsed,
    loading: matchingLoading,
    error: matchingError,
    matchServices,
    checkEligibility,
  } = useServiceMatch();

  const {
    generatingPdf,
    pdfError,
    pdfResult,
    generatePdfGuide,
  } = useGeneratePdfGuide();

  const {
    sendingEmail,
    emailError,
    emailSent,
    sendGuideEmail,
  } = useSendGuideEmail();

  const handleEligibilityAnswer = (question, value) => {
    setEligibilityAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));

    setEligibilityResult(null);
  };

  const extraQuestions = selectedService?.extraQuestions || [];

  const getQuestionKey = (question, index) =>
    typeof question === "string"
      ? question
      : question.id || question.label || `question-${index}`;

  const answeredCount = extraQuestions.filter((q, index) => {
    const key = getQuestionKey(q, index);
    return eligibilityAnswers[key]?.trim();
  }).length;

  const allQuestionsAnswered =
    extraQuestions.length === 0 || answeredCount === extraQuestions.length;

  const eligibilityStatus = eligibilityResult
    ? eligibilityResult.eligibilityStatus
    : extraQuestions.length === 0
      ? "Ready to recheck eligibility"
      : answeredCount === extraQuestions.length
        ? "Ready to recheck eligibility"
        : "Needs more information";

  const startMatchProgress = () => {
    setMatchProgress(10);

    const interval = setInterval(() => {
      setMatchProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 350);

    return interval;
  };
  return (
    <div className="service-journey-page">
      <ServiceStepper currentStep={currentStep} />

      {currentStep === 1 && (
        <section className="journey-card">
          <h1>What type of support do you need?</h1>

          <div className="journey-options-grid">
            {needs.map((need) => (
              <button
                key={need.id}
                className={`journey-option-card ${selectedNeed?.id === need.id ? "selected" : ""
                  }`}
                onClick={() => setSelectedNeed(need)}
              >
                <h3>{need.title}</h3>
                <p>{need.description}</p>
              </button>
            ))}
          </div>

          <button
            className="journey-primary-btn"
            onClick={goNext}
            disabled={!selectedNeed}
          >
            Continue
          </button>
        </section>
      )}

      {currentStep === 2 && (
        <section className="journey-card">
          <h1>Check Profile Match</h1>

          <p className="journey-subtitle">
            We use your saved service-matching profile to estimate relevant services.
          </p>

          <div className="profile-match-box">
            <div>
              <span>Age</span>
              <strong>{cachedProfile.age || "-"}</strong>
            </div>

            <div>
              <span>Residential Status</span>
              <strong>{cachedProfile.residentialStatus || "-"}</strong>
            </div>

            <div>
              <span>Housing Type</span>
              <strong>{cachedProfile.housingType || "-"}</strong>
            </div>

            <div>
              <span>Employment Status</span>
              <strong>{cachedProfile.employmentStatus || "-"}</strong>
            </div>

            <div>
              <span>Income Band</span>
              <strong>{cachedProfile.incomeBand || "-"}</strong>
            </div>

            <div>
              <span>Selected Need</span>
              <strong>{selectedNeed?.title || "-"}</strong>
            </div>
          </div>

          <div className="journey-actions">
            <button className="journey-secondary-btn" onClick={goBack}>
              Back
            </button>

            <button
              className="journey-primary-btn"
              disabled={matchingLoading}
              onClick={async () => {
                const progressInterval = startMatchProgress();

                const result = await matchServices({
                  categoryId,
                  selectedNeedId: selectedNeed?.id,
                });

                clearInterval(progressInterval);
                setMatchProgress(100);

                setTimeout(() => {
                  setMatchProgress(0);

                  if (result) {
                    setCurrentStep(3);
                  }
                }, 400);
              }}
            >
              {matchingLoading ? "Finding Services..." : "Find Recommended Services"}
            </button>
          </div>

          {matchingLoading && (
            <div className="match-loading-box">
              <div className="match-loading-top">
                <span>Finding recommended services...</span>
                <strong>{matchProgress}%</strong>
              </div>

              <div className="match-progress-track">
                <div
                  className="match-progress-fill"
                  style={{ width: `${matchProgress}%` }}
                />
              </div>

              <p>
                Checking your profile, selected need, service eligibility rules, and AI review.
              </p>
            </div>
          )}
        </section>
      )}

      {currentStep === 3 && (
        <section className="journey-card">
          <h1>Recommended Services</h1>

          <p className="journey-subtitle">
            Based on your selected need and saved profile information.
          </p>

          {matchingLoading ? (
            <p>Matching services...</p>
          ) : matchingError ? (
            <p>{matchingError}</p>
          ) : matches.length === 0 ? (
            <p>No recommended services found.</p>
          ) : (
            <div className="recommended-services-list">
              {matches.map((service) => (
                <ServiceCard
                  key={service.serviceId}
                  service={service}
                  onViewGuidance={() => {
                    setSelectedService(service);
                    setEligibilityAnswers({});
                    setEligibilityResult(null);
                    setCurrentStep(4);
                  }}
                />
              ))}
            </div>
          )}

          <div className="journey-actions">
            <button className="journey-secondary-btn" onClick={goBack}>
              Back
            </button>
          </div>
        </section>
      )}

      {currentStep === 4 && selectedService && (
        <section className="journey-card">
          <h1>Check If You May Be Eligible</h1>

          <p className="journey-subtitle">
            Answer the extra questions for this policy, then recheck eligibility.
            This does not permanently update your profile.
          </p>

          <div className="eligibility-summary-box">
            <h2>{eligibilityStatus}</h2>
            <p>
              {eligibilityResult?.note ||
                selectedService.aiReason ||
                "This service may be suitable based on your profile and selected need."}
            </p>

            {eligibilityResult && (
              <p>
                <strong>Updated score:</strong>{" "}
                {eligibilityResult.eligibilityScore}%
              </p>
            )}
          </div>

          {(selectedService.missingInfo || []).length > 0 && (
            <>
              <h2>Things to Confirm</h2>

              <div className="guidance-list">
                {selectedService.missingInfo.map((info, index) => (
                  <div key={index} className="guidance-list-item">
                    {info}
                  </div>
                ))}
              </div>
            </>
          )}

          {extraQuestions.length > 0 ? (
            <>
              <h2>Extra Questions</h2>

              <div className="eligibility-questions">
                {extraQuestions.map((question, index) => {
                  const questionText =
                    typeof question === "string"
                      ? question
                      : question.label ||
                      question.reason ||
                      question.id ||
                      `Question ${index + 1}`;

                  const questionKey = getQuestionKey(question, index);

                  return (
                    <div key={questionKey} className="eligibility-question-card">
                      <label>{questionText}</label>

                      {typeof question !== "string" && question.reason && (
                        <p className="journey-subtitle">{question.reason}</p>
                      )}

                      {typeof question !== "string" &&
                        question.type === "select" &&
                        Array.isArray(question.options) ? (
                        <select
                          className="eligibility-input"
                          value={eligibilityAnswers[questionKey] || ""}
                          onChange={(e) =>
                            handleEligibilityAnswer(questionKey, e.target.value)
                          }
                        >
                          <option value="">Select an answer</option>
                          {question.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={
                            typeof question !== "string" &&
                              question.type === "number"
                              ? "number"
                              : "text"
                          }
                          placeholder="Enter your answer"
                          className="eligibility-input"
                          value={eligibilityAnswers[questionKey] || ""}
                          onChange={(e) =>
                            handleEligibilityAnswer(questionKey, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>No additional questions required for this service.</p>
          )}

          {eligibilityResult && (
            <div className="guidance-list">
              {(eligibilityResult.reasons || []).map((reason, index) => (
                <div key={index} className="guidance-list-item">
                  {reason}
                </div>
              ))}
            </div>
          )}

          <div className="journey-actions">
            <button className="journey-secondary-btn" onClick={goBack}>
              Back
            </button>

            <button
              className="journey-primary-btn"
              disabled={!allQuestionsAnswered || matchingLoading}
              onClick={async () => {
                const result = await checkEligibility({
                  serviceId: selectedService.serviceId,
                  selectedNeedId: selectedNeed?.id,
                  answers: eligibilityAnswers,
                });

                if (result) {
                  setEligibilityResult(result);
                }
              }}
            >
              {matchingLoading ? "Rechecking..." : "Recheck Eligibility"}
            </button>

            {eligibilityResult && (
              <button className="journey-primary-btn" onClick={goNext}>
                Continue
              </button>
            )}
          </div>
        </section>
      )}

      {currentStep === 5 && selectedService && (
        <section className="journey-card">
          <h1>Required Documents</h1>

          <p className="journey-subtitle">{selectedService.serviceName}</p>

          <div className="guidance-list">
            {(selectedService.requiredDocuments || []).length > 0 ? (
              selectedService.requiredDocuments.map((doc) => (
                <div key={doc} className="guidance-list-item">
                  {doc}
                </div>
              ))
            ) : (
              <p>No specific documents listed in the dataset.</p>
            )}
          </div>

          <h2>Application Steps</h2>

          <div className="guidance-list">
            {(selectedService.applicationSteps || []).map((step, index) => (
              <div key={index} className="guidance-list-item">
                {index + 1}. {step}
              </div>
            ))}
          </div>

          <div className="journey-actions">
            <button className="journey-secondary-btn" onClick={goBack}>
              Back
            </button>

            <button className="journey-primary-btn" onClick={goNext}>
              Continue
            </button>
          </div>
        </section>
      )}

      {currentStep === 6 && selectedService && (
        <section className="journey-card">
          <h1>Continue to Official Site</h1>

          <p className="journey-subtitle">
            Use the official link below to apply or continue reading more details.
          </p>

          <div className="official-site-box">
            <h2>{selectedService.serviceName}</h2>
            <p>{selectedService.description}</p>

            <a
              href={selectedService.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="official-link-btn"
            >
              Open Official Website
            </a>

            <div className="pdf-guide-box">
              <button
                className="pdf-primary-btn"
                type="button"
                disabled={generatingPdf}
                onClick={() =>
                  generatePdfGuide({
                    residentName: cachedProfile.name,
                    email: "",
                    service: selectedService,
                    selectedNeed,
                    eligibilityResult,
                  })
                }
              >
                {generatingPdf ? "Generating PDF..." : "Generate PDF Guide"}
              </button>

              {pdfResult && (
                <div className="pdf-result-box">
                  <div>
                    <strong>PDF guide generated</strong>
                    <p>Reference: {pdfResult.referenceNo}</p>
                  </div>

                  <a
                    href={pdfResult.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-download-link"
                  >
                    Open PDF
                  </a>
                </div>
              )}

              {pdfResult && (
                <div className="email-guide-box">
                  <label>Send this guide to your email</label>

                  <div className="email-send-row">
                    <input
                      type="email"
                      className="email-input"
                      placeholder="Enter email address"
                      value={pdfEmail}
                      onChange={(e) => setPdfEmail(e.target.value)}
                    />

                    <button
                      className="email-send-btn"
                      type="button"
                      disabled={sendingEmail || !pdfEmail || !pdfResult?.downloadUrl}
                      onClick={() =>
                        sendGuideEmail({
                          email: pdfEmail,
                          downloadUrl: pdfResult.downloadUrl,
                          referenceNo: pdfResult.referenceNo,
                          serviceName: selectedService.serviceName,
                          residentName: cachedProfile.name,
                        })
                      }
                    >
                      {sendingEmail ? "Sending..." : "Send Email"}
                    </button>
                    {emailSent && <p className="success-text">Email sent successfully.</p>}
                    {emailError && <p className="error-text">{emailError}</p>}
                  </div>
                </div>
              )}

              {pdfError && <p className="error-text">{pdfError}</p>}
            </div>
          </div>

          <div className="journey-actions">
            <button className="journey-secondary-btn" onClick={goBack}>
              Back
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default ServiceJourneyPage;