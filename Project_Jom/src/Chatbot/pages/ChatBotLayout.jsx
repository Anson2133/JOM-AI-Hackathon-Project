import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import InputBar from '../components/InputBar';
import '../../Chatbot/chatbot.css'; 

export default function ChatbotLayout() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', type: 'text', content: 'Good morning Mdm Siti. Based on your profile, I can help explain your MediShield Life premium and payment deadline.' },
        { role: 'user', type: 'text', content: 'How much is my premium this year and when is it due?' },
        { role: 'ai', type: 'invoice', content: '' }
    ]);

    const handleSend = () => {
        if (inputText.trim() === '') return;
        setMessages([...messages, { role: 'user', type: 'text', content: inputText }]);
        setInputText('');
    };

    return (
        <div className="chatbot-layout">
            <Sidebar />

            <div className="chatbot-main-area">
                <ChatArea messages={messages} />
                <InputBar
                    inputText={inputText}
                    setInputText={setInputText}
                    handleSend={handleSend}
                />
            </div>
        </div>
    );
}