import { MessageSquare, MapPin, Globe, Mic, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="app-navbar">
      <div className="navbar-red-line" />

      <div className="navbar-content">
        <div className="navbar-logo">
          <div className="navbar-logo-icon">
            <MessageSquare size={24} />
            <MapPin size={14} className="navbar-pin" />
          </div>
          <span>MyTampines Assistant</span>
        </div>

        <nav className="navbar-links">
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/help">Help</NavLink>
        </nav>

        <div className="navbar-actions">
          <div className="language-pill">
            <Globe size={20} />
            <span>EN</span>
          </div>

          <Mic size={22} className="navbar-icon" />

          <div className="navbar-avatar">{initials}</div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;