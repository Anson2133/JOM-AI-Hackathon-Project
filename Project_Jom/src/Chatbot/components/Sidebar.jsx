import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function getConversationTime(conversation) {
  return (
    conversation.updatedAt ||
    conversation.date ||
    conversation.createdAt ||
    conversation.timestamp ||
    ""
  );
}

function formatConversationDate(dateString) {
  if (!dateString) return "New";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "New";

  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const conversationDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (conversationDay.getTime() === today.getTime()) {
    return date.toLocaleTimeString("en-SG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (conversationDay.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Sidebar({
  conversations = [],
  currentChatTitle,
  currentConversationId,
  onNewChat,
  onSelectConversation,
}) {
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const filteredConversations = useMemo(() => {
    const search = searchText.toLowerCase();

    return [...conversations]
      .sort((a, b) => {
        const dateA = new Date(getConversationTime(a)).getTime() || 0;
        const dateB = new Date(getConversationTime(b)).getTime() || 0;
        return dateB - dateA;
      })
      .filter((conversation) => {
        const title = conversation.title || t("chat.newChat");
        const date = formatConversationDate(getConversationTime(conversation));

        return (
          title.toLowerCase().includes(search) ||
          date.toLowerCase().includes(search)
        );
      });
  }, [conversations, searchText, t]);

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span className="plus-icon">+</span>
          {t("chat.newChat")}
        </button>

        <div className="history-section">
          <p className="history-title">
            {t("chat.recentConversations")}
          </p>

          <input
            className="history-search"
            type="text"
            placeholder={t("chat.searchConversations")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="history-list">
            {filteredConversations.length === 0 ? (
              <p className="empty-history">
                {t("chat.noConversations")}
              </p>
            ) : (
              filteredConversations.map((conversation) => {
                const isActive =
                  conversation.conversationId === currentConversationId;

                return (
                  <button
                    key={conversation.conversationId || conversation.id}
                    className={`history-item ${isActive ? "active" : ""}`}
                    onClick={() => onSelectConversation(conversation)}
                  >
                    <span className="history-item-title">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>

                      <span className="history-text">
                        {conversation.title || t("chat.newChat")}
                      </span>
                    </span>

                    <span className="history-item-date">
                      {formatConversationDate(getConversationTime(conversation))}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}