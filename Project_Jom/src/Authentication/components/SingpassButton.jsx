import { Fingerprint } from "lucide-react";
import { useNavigate } from "react-router";

function SingpassButton() {
  const navigate = useNavigate();

  return (
    <button
      className="singpass-button"
      onClick={() => navigate("/select-profile")}
    >
      <Fingerprint size={36} />
      <span>Continue as demo resident</span>
    </button>
  );
}

export default SingpassButton;