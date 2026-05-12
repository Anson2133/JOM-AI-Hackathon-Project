import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CHATBOT_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/chat";

const CONVERSATION_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/conversations";

const TITLE_API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/chat-title";

export default function useChatbot({ name, userId }) {
    const { i18n } = useTranslation();

    const welcomeMessages = {
        en: `Good morning ${name}. How can I help you today?`,
        ms: `Selamat pagi ${name}. Bagaimana saya boleh membantu anda hari ini?`,
        zh: `早上好 ${name}。今天我能为您做什么？`,
        ta: `காலை வணக்கம் ${name}. இன்று நான் உங்களுக்கு எப்படி உதவலாம்?`
    };

    const createWelcomeMessage = () => [
        {
            role: "ai",
            type: "text",
            content: welcomeMessages[i18n.language] || welcomeMessages.en,
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

    useEffect(() => {
        const welcomeMessages = {
            en: `Good morning ${name}. How can I help you today?`,
            ms: `Selamat pagi ${name}. Bagaimana saya boleh membantu anda hari ini?`,
            zh: `早上好 ${name}。今天我能为您做什么？`,
            ta: `காலை வணக்கம் ${name}. இன்று நான் உங்களுக்கு எப்படி உதவலாம்?`
        };

        setMessages((prev) => {
            if (prev.length === 0 || prev[0].role !== "ai") return prev;

            return [
                {
                    role: "ai",
                    type: "text",
                    content: welcomeMessages[i18n.language] || welcomeMessages.en,
                },
                ...prev.slice(1),
            ];
        });
    }, [i18n.language, name]);

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

    const handleSend = async (attachment = null) => {
        const trimmedInput = inputText.trim();

        if ((!trimmedInput && !attachment) || isLoading) return;

        const conversationId =
            currentConversationId || `chat-${Date.now()}`;

        const titleSource = trimmedInput || attachment?.name || "Uploaded file";

        const newChatTitle =
            chatTitle === "New Chat"
                ? await generateTitleWithAI(titleSource)
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
            content: trimmedInput || "Please analyse this uploaded file.",
            attachment: attachment
                ? {
                    name: attachment.name,
                    type: attachment.type,
                }
                : null,
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
                    message: trimmedInput || "Please analyse this uploaded file.",
                    file: attachment?.base64 || undefined,
                    fileType: attachment?.type || undefined,
                    language: i18n.language,
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