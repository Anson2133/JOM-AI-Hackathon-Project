import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import InputBar from "../components/InputBar";
import useChatbot from "../hooks/useChatbot";
import "../../Chatbot/chatbot.css";

export default function ChatbotLayout() {
  const cachedProfile = JSON.parse(
    localStorage.getItem("cachedProfile") || "{}"
  );

  const name = cachedProfile?.displayName || "Resident";

  const userInitials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const userId = localStorage.getItem("userId") || "demo-user-001";

  const {
    inputText,
    setInputText,
    chatTitle,
    messages,
    conversations,
    currentConversationId,
    isLoading,
    handleSend,
    handleNewChat,
    handleSelectConversation,
  } = useChatbot({ name, userId });

  return (
    <div className="chatbot-layout">
      <Sidebar
        conversations={conversations}
        currentChatTitle={chatTitle}
        currentConversationId={currentConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
      />

      <div className="chatbot-main-area">
        <ChatArea
          messages={messages}
          chatTitle={chatTitle}
          userInitials={userInitials}
          aiInitials="AI"
          isLoading={isLoading}
        />

        <InputBar
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}