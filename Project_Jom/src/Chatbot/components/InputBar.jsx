export default function InputBar({ inputText, setInputText, handleSend }) {
    return (
        <footer className="input-footer">
            <div className="input-container">
                <div className="input-box">

                    {/* Attachment Button */}
                    <button className="input-icon-btn">
                        <svg className="rotate-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    </button>

                    {/* The Actual Text Input */}
                    <input
                        type="text"
                        placeholder="Ask about CPF, HDB, healthcare, benefits, or local services..."
                        className="chat-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />

                    {/* Voice Button */}
                    <button className="input-icon-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                    </button>

                    {/* Send Button */}
                    <button className="send-btn" onClick={handleSend}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>

                </div>
                <p className="input-disclaimer">
                    Responses can be translated to Malay, Mandarin, or Tamil.
                </p>
            </div>
        </footer>
    )
}