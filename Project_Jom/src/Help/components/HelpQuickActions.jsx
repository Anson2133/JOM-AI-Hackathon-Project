import { Bot, FileSearch, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

function getQuickActionIcon(id) {
  if (id === "chatbot") return <Bot size={24} />;
  if (id === "scanner") return <FileSearch size={24} />;
  return <Sparkles size={24} />;
}

export default function HelpQuickActions({ actions }) {
  const navigate = useNavigate();

  return (
    <section className="help-quick-actions">
      {actions.map((action) => (
        <button
          key={action.id}
          className="help-quick-card"
          type="button"
          onClick={() => navigate(action.route)}
        >
          <div className="help-quick-icon">{getQuickActionIcon(action.id)}</div>

          <div>
            <h2>{action.title}</h2>
            <p>{action.description}</p>
            <span>{action.buttonText}</span>
          </div>
        </button>
      ))}
    </section>
  );
}