import { useEffect, useState } from "react";

const CHATBOT_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/chat";

const CONVERSATION_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/conversations";

const TITLE_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/chat-title";

export default function useChatbot({ name, userId }) {
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
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadConversations() {
            try {
                const response = await fetch(
                    `${CONVERSATION_API_URL}?userId=${userId}`
                );

                const data = await response.json();
                setConversations(data.conversations || []);
            } catch (error) {
                console.error("Failed to load conversations:", error);
            }
        }

        if (userId) {
            loadConversations();
        }
    }, [userId]);

    const saveConversationToDB = async (conversation) => {
        try {
            await fetch(CONVERSATION_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(conversation),
            });
        } catch (error) {
            console.error("Failed to save conversation:", error);
        }
    };

    const updateConversationState = (conversation) => {
        setConversations((prev) => {
            const existingConversation = prev.find(
                (item) => item.conversationId === conversation.conversationId
            );

            if (existingConversation) {
                return prev.map((item) =>
                    item.conversationId === conversation.conversationId
                        ? conversation
                        : item
                );
            }

            return [conversation, ...prev];
        });
    };
    const generateTitleWithAI = async (message) => {
        try {
            const response = await fetch(TITLE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            return data?.title || "New Conversation";
        } catch (error) {
            console.error("Failed to generate AI title:", error);
            return message.trim().split(/\s+/).slice(0, 5).join(" ");
        }
    };

    const handleSend = async () => {
        const trimmedInput = inputText.trim();

        if (!trimmedInput || isLoading) return;

        const conversationId =
            currentConversationId || `chat-${Date.now()}`;

        const newChatTitle =
            chatTitle === "New Chat"
                ? await generateTitleWithAI(trimmedInput)
                : chatTitle;

        if (!currentConversationId) {
            setCurrentConversationId(conversationId);
        }

        if (chatTitle === "New Chat") {
            setChatTitle(newChatTitle);
        }

        const userMessage = {
            role: "user",
            type: "text",
            content: trimmedInput,
        };

        const messagesWithUser = [...messages, userMessage];

        const conversationWithUser = {
            userId,
            conversationId,
            title: newChatTitle,
            date: new Date().toISOString(),
            messages: messagesWithUser,
        };

        setMessages(messagesWithUser);
        updateConversationState(conversationWithUser);
        saveConversationToDB(conversationWithUser);

        setInputText("");
        setIsLoading(true);

        try {
            const response = await fetch(CHATBOT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: trimmedInput,
                }),
            });

            if (!response.ok) {
                throw new Error("Chatbot API failed");
            }

            const data = await response.json();

            const aiMessage = {
                role: "ai",
                type: "text",
                content: data?.response || "Sorry, I could not get a response.",
            };

            const finalMessages = [...messagesWithUser, aiMessage];

            const finalConversation = {
                userId,
                conversationId,
                title: newChatTitle,
                date: new Date().toISOString(),
                messages: finalMessages,
            };

            setMessages(finalMessages);
            updateConversationState(finalConversation);
            await saveConversationToDB(finalConversation);
        } catch (error) {
            console.error("Chatbot error:", error);

            const errorMessage = {
                role: "ai",
                type: "text",
                content:
                    "Sorry, I could not connect to the chatbot right now. Please try again later.",
            };

            const finalMessages = [...messagesWithUser, errorMessage];

            const finalConversation = {
                userId,
                conversationId,
                title: newChatTitle,
                date: new Date().toISOString(),
                messages: finalMessages,
            };

            setMessages(finalMessages);
            updateConversationState(finalConversation);
            await saveConversationToDB(finalConversation);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        const newConversation = {
            conversationId: `draft-${Date.now()}`,
            title: "New Chat",
            date: new Date().toISOString(),
            messages: createWelcomeMessage(),
            isDraft: true,
        };

        setChatTitle("New Chat");
        setMessages(newConversation.messages);
        setInputText("");
        setCurrentConversationId(newConversation.conversationId);

        setConversations((prev) => [newConversation, ...prev]);
    };

    const handleSelectConversation = (conversation) => {
        setChatTitle(conversation.title);
        setMessages(conversation.messages || createWelcomeMessage());
        setCurrentConversationId(conversation.conversationId);
    };

    return {
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
    };
}