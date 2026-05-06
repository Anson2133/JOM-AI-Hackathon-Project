export default function TopNav() {
    return (
        <header className="top-nav">
            {/* Left side: Navigation Links */}
            <div className="nav-links">
                <span className="nav-link active">Chat</span>
                <span className="nav-link">Services</span>
                <span className="nav-link">History</span>
                <span className="nav-link">Profile</span>
                <span className="nav-link">Help</span>
            </div>

            {/* Right side: Actions & Profile */}
            <div className="nav-actions">
                <button className="action-btn">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    EN
                </button>
                <button className="action-btn">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>
                <div className="profile-avatar">
                    SR
                </div>
            </div>
        </header>
    )
}