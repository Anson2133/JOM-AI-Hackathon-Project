import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import InputBar from "../components/InputBar";
import "../../Chatbot/chatbot.css";

export default function ChatbotLayout() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  const name = user?.name || profile?.identity?.name || "Demo Resident";

  const userInitials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const createWelcomeMessage = () => [
    {
      role: "ai",
      type: "text",
      content: `Good morning ${name}. How can I help you today?`,
    },
  ];

  const [inputText, setInputText] = useState("");
  const [chatTitle, setChatTitle] = useState("New Chat");
  const [messages, setMessages] = useState(createWelcomeMessage());
  const [conversations, setConversations] = useState([]);

  const handleSend = () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;

    const userMessage = {
      role: "user",
      type: "text",
      content: trimmedInput,
    };

    const updatedMessages = [...messages, userMessage];

    if (chatTitle === "New Chat") {
      const newConversation = {
        id: Date.now(),
        title: trimmedInput,
        date: "Today",
        messages: updatedMessages,
      };

      setChatTitle(trimmedInput);
      setConversations((prev) => [newConversation, ...prev]);
    } else {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.title === chatTitle
            ? { ...conversation, messages: updatedMessages }
            : conversation
        )
      );
    }

    setMessages(updatedMessages);
    setInputText("");
  };

  const handleNewChat = () => {
    setChatTitle("New Chat");
    setMessages(createWelcomeMessage());
    setInputText("");
  };

  const handleSelectConversation = (conversation) => {
    setChatTitle(conversation.title);
    setMessages(conversation.messages);
  };

  return (
    <div className="chatbot-layout">
      <Sidebar
        conversations={conversations}
        currentChatTitle={chatTitle}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />

      <div className="chatbot-main-area">
        <ChatArea
          messages={messages}
          chatTitle={chatTitle}
          userInitials={userInitials}
          aiInitials="AI"
        />

        <InputBar
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}