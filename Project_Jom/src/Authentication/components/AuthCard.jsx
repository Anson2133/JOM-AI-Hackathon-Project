import { MessageSquare, Shield, Smartphone } from "lucide-react";
import FeatureItem from "./FeatureItem";
import SingpassButton from "./SingpassButton";

function AuthCard() {
  return (
    <section className="auth-card">
      <div className="auth-card-header">
        <h1>Welcome to MyTampines Assistant</h1>
        <p>Your personal guide to Singapore government services</p>
      </div>

      <div className="feature-list">
        <FeatureItem
          icon={MessageSquare}
          title="Personalized Assistance"
          description="Get help with CPF, HDB, healthcare, and benefits"
        />

        <FeatureItem
          icon={Shield}
          title="Secure & Private"
          description="Protected by Singpass authentication"
        />

        <FeatureItem
          icon={Smartphone}
          title="Multi-language Support"
          description="Available in English, Malay, Mandarin, and Tamil"
        />
      </div>

      <SingpassButton />

      <p className="auth-terms">
        Prototype mode: This simulates a consent-based Singpass/Myinfo login.
      </p>
    </section>
  );
}

export default AuthCard;