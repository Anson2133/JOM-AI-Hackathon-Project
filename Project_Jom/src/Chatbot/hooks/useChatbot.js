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

    const createDocumentContextMessage = (context) => {
        const serviceName =
            context?.relatedService?.serviceName ||
            context?.mainTopic ||
            "the scanned document";

        const riskLevel = context?.scamRisk?.level || "Unknown";

        return [
            {
                role: "ai",
                type: "text",
                content:
                    `I see you scanned a document about ${serviceName}.\n\n` +
                    `Summary: ${context?.summary || "No summary available."}\n\n` +
                    `Scam risk: ${riskLevel}\n\n` +
                    `Recommended next step: ${context?.recommendedNextStep || "Verify through official channels before proceeding."}\n\n` +
                    `You can ask me things like:\n` +
                    `1. Is this message safe?\n` +
                    `2. What does this document mean?\n` +
                    `3. How do I apply for this service?\n` +
                    `4. What should I do next?`,
                documentContext: context,
            },
        ];
    };

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
        const params = new URLSearchParams(window.location.search);
        const rawContext = params.get("documentContext");

        if (!rawContext) return;

        try {
            const context = JSON.parse(decodeURIComponent(rawContext));
            const conversationId = `document-chat-${Date.now()}`;

            const documentMessages = createDocumentContextMessage(context);

            const newConversation = {
                userId,
                conversationId,
                title: `Document: ${context.mainTopic || "Scanned Document"}`,
                date: new Date().toISOString(),
                messages: documentMessages,
            };

            setChatTitle(newConversation.title);
            setMessages(documentMessages);
            setCurrentConversationId(conversationId);
            setInputText("");
            setConversations((prev) => [newConversation, ...prev]);

            if (userId) {
                saveConversationToDB(newConversation);
            }

            window.history.replaceState({}, "", "/chat");
        } catch (error) {
            console.error("Failed to load document context:", error);
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

        const latestDocumentContext = messages.find(
            (message) => message.documentContext
        )?.documentContext;

        try {
            const response = await fetch(CHATBOT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: latestDocumentContext
                        ? `
The user is asking about a scanned document.

Document context:
${JSON.stringify(latestDocumentContext, null, 2)}

User question:
${trimmedInput || "Please help me understand this document."}
`
                        : trimmedInput || "Please analyse this uploaded file.",
                    file: attachment?.base64 || undefined,
                    fileType: attachment?.type || undefined,
                }),
            });

            if (!response.ok) {
                throw new Error("Chatbot API failed");
            }

            const data = await response.json();

            const aiMessage = {
                role: "ai",
                type: "text",
                content:
                    data?.response || "Sorry, I could not get a response.",
                relatedServices: data?.relatedServices || [],
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