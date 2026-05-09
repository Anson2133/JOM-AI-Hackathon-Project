import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function cleanBotText(text) {
  if (!text) return "";

  return text
    .replace(/([.!?])\s+(?=[A-Z])/g, "$1\n\n")
    .replace(/(Facility:|Booking Method:|Availability:|Link:|URL:)/g, "\n$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatMessageWithLinks(text) {
  if (!text) return null;

  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(sg|com|org|net)[^\s]*)/g;

  return text.split(urlRegex).map((part, index) => {
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
  });
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