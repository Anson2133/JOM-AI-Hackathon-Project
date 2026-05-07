export default function Sidebar({
  conversations = [],
  currentChatTitle,
  onNewChat,
  onSelectConversation,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span className="plus-icon">+</span>
          New Conversation
        </button>

        <div className="history-section">
          <p className="history-title">Recent Conversations</p>

          <div className="history-list">
            {conversations.length === 0 ? (
              <p className="empty-history">No conversations yet</p>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`history-item ${
                    conversation.title === currentChatTitle ? "active" : ""
                  }`}
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
                      {conversation.title}
                    </span>
                  </span>

                  <span className="history-item-date">
                    {conversation.date}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}