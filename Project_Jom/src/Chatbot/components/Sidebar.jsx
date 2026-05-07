export default function Sidebar() {
    return (
        <div className="sidebar">
            {/* Logo Area */}
            <div className="sidebar-header">
                <div className="brand-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h1 className="brand-title">MyTampines Assistant</h1>
            </div>

            {/* Sidebar Content */}
            <div className="sidebar-content">
                <button className="new-chat-btn">
                    <span className="plus-icon">+</span> New Conversation
                </button>

                <div className="history-section">
                    <p className="history-title">Recent Conversations</p>
                    <div className="history-list">

                        {/* Active Item */}
                        <button className="history-item active">
                            <span className="history-item-title">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                MediShield Life premium query
                            </span>
                            <span className="history-item-date">Today</span>
                        </button>

                        {/* Inactive Item */}
                        <button className="history-item">
                            <span className="history-item-title">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                HDB season parking renewal
                            </span>
                            <span className="history-item-date">Yesterday</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}