import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function cleanBotText(text) {
  if (!text) return "";
  return text
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatMessageWithLinks(text) {
  if (!text) return null;

  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(sg|com|org|net)[^\s]*)/g;

  return text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex}>
      {line.split(urlRegex).map((part, index) => {
        if (!part) return null;

        const isUrl = part.match(urlRegex);

        if (!isUrl) return part;

        const href =
          part.startsWith("http://") || part.startsWith("https://")
            ? part
            : `https://${part}`;

        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-link"
          >
            {part}
          </a>
        );
      })}
      {lineIndex < text.split("\n").length - 1 && <br />}
    </span>
  ));
}

function FileCard({ attachment }) {
  if (!attachment) return null;

  const isPdf = attachment.type === "application/pdf";

  return (
    <div className="sent-file-card">
      <div className={`sent-file-icon ${isPdf ? "pdf-file" : "image-file"}`}>
        {isPdf ? "PDF" : "IMG"}
      </div>

      <div className="sent-file-info">
        <p>{attachment.name}</p>
        <span>{attachment.type}</span>
      </div>
    </div>
  );
}

function SpeakButton({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { i18n } = useTranslation();

  const getCurrentLanguage = () => {
    const lang = i18n.language || "en";

    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("ms")) return "ms";
    if (lang.startsWith("ta")) return "ta";

    return "en";
  };

  const langMap = {
    en: "en-SG",
    ms: "ms-MY",
    zh: "zh-CN",
    ta: "ta-IN",
  };

  const pickBestVoice = (languageKey) => {
    const voices = window.speechSynthesis.getVoices();
    const targetLang = langMap[languageKey] || "en-SG";
    const shortLang = targetLang.split("-")[0];

    console.log("Current i18n language:", i18n.language);
    console.log("Selected speech language:", targetLang);
    console.log(
      "Available voices:",
      voices.map((voice) => ({
        name: voice.name,
        lang: voice.lang,
      }))
    );

    const preferredVoiceNames = {
      en: [
        "Microsoft Natasha",
        "Microsoft Sonia",
        "Microsoft Aria",
        "Google UK English Female",
        "Google US English",
        "Samantha",
        "Daniel",
      ],
      zh: [
        "Microsoft Xiaoxiao",
        "Microsoft Huihui",
        "Microsoft Yaoyao",
        "Google 普通话",
        "Google Mandarin",
        "Ting-Ting",
        "Sin-ji",
      ],
      ms: [
        "Microsoft Yasmin",
        "Google Bahasa Melayu",
        "Google Malay",
      ],
      ta: [
        "Microsoft Valluvar",
        "Google தமிழ்",
        "Google Tamil",
      ],
    };

    const preferredList = preferredVoiceNames[languageKey] || preferredVoiceNames.en;

    const preferredVoice = voices.find((voice) =>
      preferredList.some((name) =>
        voice.name.toLowerCase().includes(name.toLowerCase())
      )
    );

    if (preferredVoice) return preferredVoice;

    const exactLangVoice = voices.find(
      (voice) => voice.lang.toLowerCase() === targetLang.toLowerCase()
    );

    if (exactLangVoice) return exactLangVoice;

    const sameLanguageVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith(shortLang.toLowerCase())
    );

    if (sameLanguageVoice) return sameLanguageVoice;

    return null;
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const languageKey = getCurrentLanguage();
    const speechLang = langMap[languageKey] || "en-SG";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLang;

    const selectedVoice = pickBestVoice(languageKey);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn(`No proper voice found for ${speechLang}. Browser will use default voice.`);
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      className={`speak-btn ${isSpeaking ? "speaking" : ""}`}
      type="button"
      onClick={handleSpeak}
      title={isSpeaking ? "Stop" : "Listen"}
      aria-label={isSpeaking ? "Stop reading message" : "Read message aloud"}
    >
      {isSpeaking ? (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 10h6v4H9z"
          />
        </svg>
      ) : (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.536 8.464a5 5 0 010 7.072"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5L6 9H2v6h4l5 4V5z"
          />
        </svg>
      )}
    </button>
  );
}

export default function ChatArea({
  messages,
  chatTitle,
  userInitials,
  aiInitials,
  isLoading,
}) {
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <>
      <div className="chat-header">
        <div>
          <p className="chat-eyebrow">{t("chat.currentConversation")}</p>
          <h2 className="chat-title">{chatTitle}</h2>
        </div>

        <div className="chat-header-pill">{t("chat.personalisedSupport")}</div>
      </div>

      <main className="chat-history">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const cleanedContent = cleanBotText(msg.content);

          return (
            <div
              key={index}
              className={`message-wrapper ${isUser ? "user-message" : "ai-message"
                }`}
            >
              {!isUser && <div className="avatar ai-avatar">{aiInitials}</div>}

              <div className={`bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                {msg.attachment && <FileCard attachment={msg.attachment} />}

                {msg.content && (
                  <div className="message-text">
                    {isUser
                      ? formatMessageWithLinks(msg.content)
                      : formatMessageWithLinks(cleanedContent)}
                  </div>
                )}

                {!isUser && msg.relatedServices?.length > 0 && (
                  <div className="chat-service-actions">
                    {msg.relatedServices.map((service) => (
                      <button
                        key={service.serviceId || service.id || service.title}
                        className="chat-service-button"
                        type="button"
                        onClick={() => {
                          if (service.linkType === "external") {
                            window.open(service.url, "_blank", "noopener,noreferrer");
                          } else {
                            navigate(service.url);
                          }
                        }}
                      >
                        View {service.title}
                      </button>
                    ))}
                  </div>
                )}

                {!isUser && msg.content && (
                  <div className="speak-btn-wrapper">
                    <SpeakButton text={cleanBotText(msg.content)} />
                  </div>
                )}
              </div>

              {isUser && (
                <div className="avatar user-avatar">{userInitials}</div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="message-wrapper ai-message">
            <div className="avatar ai-avatar">{aiInitials}</div>

            <div className="bubble ai-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>
    </>
  );
}