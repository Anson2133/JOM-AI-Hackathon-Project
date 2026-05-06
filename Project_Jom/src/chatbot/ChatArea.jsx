import { useEffect, useRef } from 'react';

export default function ChatArea({ messages }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {/* Chat Header */}
            <div className="chat-header">
                <h2 className="chat-title">MediShield Life — Premium Enquiry</h2>
                <div className="header-actions">
                    <button className="header-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                        Translate
                    </button>
                    <button className="header-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                        Voice Output
                    </button>
                </div>
            </div>

            {/* Scrollable Chat Bubbles */}
            <main className="chat-history">

                {messages?.map((msg, index) => {

                    // 1. User Message
                    if (msg.role === 'user') {
                        return (
                            <div key={index} className="message-wrapper user-message">
                                <div className="avatar user-avatar">SR</div>
                                <div className="bubble user-bubble">
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        )
                    }

                    // 2. AI Standard Text Message
                    if (msg.role === 'ai' && msg.type === 'text') {
                        return (
                            <div key={index} className="message-wrapper ai-message">
                                <div className="avatar ai-avatar">MT</div>
                                <div className="bubble-wrapper">
                                    <p className="ai-text">{msg.content}</p>
                                </div>
                            </div>
                        )
                    }

                    // 3. AI Custom UI Card (The Invoice!)
                    if (msg.role === 'ai' && msg.type === 'invoice') {
                        return (
                            <div key={index} className="message-wrapper ai-message">
                                <div className="avatar ai-avatar invoice-avatar-align">MT</div>
                                <div className="invoice-container">
                                    <div className="invoice-card">
                                        <div className="invoice-row border-bottom">
                                            <span className="invoice-label">Annual Premium</span>
                                            <span className="invoice-value large">$312.00</span>
                                        </div>
                                        <div className="invoice-row border-bottom">
                                            <span className="invoice-label">Payment Due</span>
                                            <span className="invoice-value">1 July 2026</span>
                                        </div>
                                        <div className="invoice-row">
                                            <span className="invoice-label">Payment Method</span>
                                            <span className="invoice-value">CPF MediSave</span>
                                        </div>
                                    </div>

                                    <div className="invoice-actions">
                                        <button className="invoice-btn primary">Pay now</button>
                                        <button className="invoice-btn secondary">Set reminder</button>
                                        <button className="invoice-btn secondary">Explain in Malay</button>
                                        <button className="invoice-btn secondary">Show source</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}

                <div ref={messagesEndRef} />

            </main>
        </>
    )
}