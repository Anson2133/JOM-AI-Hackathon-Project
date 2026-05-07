import { useMemo, useState } from "react";

function formatConversationDate(dateString) {
  if (!dateString) return "New";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const title = conversation.title || "";
      const date = formatConversationDate(
        conversation.date || conversation.updatedAt
      );

      const search = searchText.toLowerCase();

      return (
        title.toLowerCase().includes(search) ||
        date.toLowerCase().includes(search)
      );
    });
  }, [conversations, searchText]);

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span className="plus-icon">+</span>
          New Conversation
        </button>

        <div className="history-section">
          <p className="history-title">Recent Conversations</p>

          <input
            className="history-search"
            type="text"
            placeholder="Search conversations or date..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="history-list">
            {filteredConversations.length === 0 ? (
              <p className="empty-history">No conversations found</p>
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
                        {conversation.title || "New Chat"}
                      </span>
                    </span>

                    <span className="history-item-date">
                      {formatConversationDate(
                        conversation.date || conversation.updatedAt
                      )}
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