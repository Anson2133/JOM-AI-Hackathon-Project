import { useEffect, useRef } from 'react';

export default function ChatArea({ messages }) {
    // Auto-scroll target
    const messagesEndRef = useRef(null);

    // Auto-scroll watcher
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">MediShield Life — Premium Enquiry</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                        Translate
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                        Voice Output
                    </button>
                </div>
            </div>

            {/* Scrollable Chat Bubbles */}
            <main className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">

                {/* THE DYNAMIC LOOP */}
                {messages?.map((msg, index) => {

                    // 1. User Message (Red Bubble)
                    if (msg.role === 'user') {
                        return (
                            <div key={index} className="flex gap-4 max-w-4xl self-end flex-row-reverse animate-fade-in-up">
                                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                                    SR
                                </div>
                                <div className="bg-[#1e293b] text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        )
                    }

                    // 2. AI Standard Text Message (Dark Bubble)
                    if (msg.role === 'ai' && msg.type === 'text') {
                        return (
                            <div key={index} className="flex gap-4 max-w-4xl animate-fade-in-up">
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    MT
                                </div>
                                <div className="pt-2">
                                    <p className="text-gray-700">{msg.content}</p>
                                </div>
                            </div>
                        )
                    }

                    // 3. AI Custom UI Card (The Invoice!)
                    if (msg.role === 'ai' && msg.type === 'invoice') {
                        return (
                            <div key={index} className="flex gap-4 max-w-4xl animate-fade-in-up">
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm mt-1">
                                    MT
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-500 text-sm">Annual Premium</span>
                                            <span className="text-xl font-medium text-gray-900">$312.00</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-500 text-sm">Payment Due</span>
                                            <span className="text-gray-900 font-medium">1 July 2026</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-500 text-sm">Payment Method</span>
                                            <span className="text-gray-900 font-medium">CPF MediSave</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">Pay now</button>
                                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">Set reminder</button>
                                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">Explain in Malay</button>
                                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">Show source</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}

                {/* The invisible auto-scroll target */}
                <div ref={messagesEndRef} />

            </main>
        </>
    )
}