import { useState } from "react";
import {
  MessageSquare,
  MapPin,
  Globe,
  Mic,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import "./AppNavbar.css";

function AppNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    navigate("/login");
  };

  return (
    <header className="app-navbar">
      <div className="navbar-red-line" />

      <div className="navbar-content">
        <div className="navbar-logo" onClick={() => navigate("/chat")}>
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
          <NavLink to="/help">Help</NavLink>
        </nav>

        <div className="navbar-actions">
          <div className="language-pill">
            <Globe size={20} />
            <span>EN</span>
          </div>

          <Mic size={22} className="navbar-icon" />

          <div className="profile-menu-wrapper">
            <button
              className="profile-menu-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="navbar-avatar">{initials}</div>
              <ChevronDown size={18} />
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="dropdown-avatar">{initials}</div>
                  <div>
                    <strong>{user?.name || "Demo Resident"}</strong>
                    <p>{user?.partialUinfin || "Active profile"}</p>
                  </div>
                </div>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                >
                  <User size={18} />
                  View Profile
                </button>

                <button className="dropdown-item logout" onClick={logout}>
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;