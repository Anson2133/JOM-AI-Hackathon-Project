import { useEffect, useRef } from "react";

export default function ChatArea({
  messages,
  chatTitle,
  userInitials,
  aiInitials,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-header">
        <h2 className="chat-title">{chatTitle}</h2>
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
              {!isUser && <div className="avatar ai-avatar">{aiInitials}</div>}

              <div className={`bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                <p>{msg.content}</p>
              </div>

              {isUser && (
                <div className="avatar user-avatar">{userInitials}</div>
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </main>
    </>
  );
}