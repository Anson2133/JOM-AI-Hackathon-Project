import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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

  const langMap = {
    en: "en-SG",
    ms: "ms-MY",
    zh: "zh-CN",
    ta: "ta-IN"
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[i18n.language] || "en-SG";

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
    >
      {isSpeaking ? (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 10h6v4H9z" />
        </svg>
      ) : (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-3-3m3 3l3-3M6.343 9.657a8 8 0 000 11.314" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M11 5L6 9H2v6h4l5 4V5z" />
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

        <div className="chat-header-pill">
          {t("chat.personalisedSupport")}
        </div>
      </div>

      <main className="chat-history">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`message-wrapper ${
                isUser ? "user-message" : "ai-message"
              }`}
            >
              {!isUser && (
                <div className="avatar ai-avatar">
                  {aiInitials}
                </div>
              )}

              <div
                className={`bubble ${
                  isUser ? "user-bubble" : "ai-bubble"
                }`}
              >
                {msg.attachment && (
                  <FileCard attachment={msg.attachment} />
                )}

                {msg.content && (
                  <div className="message-text">
                    {isUser
                      ? formatMessageWithLinks(msg.content)
                      : formatMessageWithLinks(cleanBotText(msg.content))}
                  </div>
                )}

                {!isUser && msg.content && (
                  <div className="speak-btn-wrapper">
                    <SpeakButton text={cleanBotText(msg.content)} />
                  </div>
                )}
              </div>

              {isUser && (
                <div className="avatar user-avatar">
                  {userInitials}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="message-wrapper ai-message">
            <div className="avatar ai-avatar">
              {aiInitials}
            </div>

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