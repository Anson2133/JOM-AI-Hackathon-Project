import { MapPin } from "lucide-react";

function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">
        <span className="logo-chat-shape"></span>
        <MapPin size={20} className="logo-pin" />
      </div>

      <span className="logo-text">MyTampines Assistant</span>
    </div>
  );
}

export default Logo;