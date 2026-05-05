// Notice we accept the props here at the top!
export default function InputBar({ inputText, setInputText, handleSend }) {
    return (
        <footer className="p-6 bg-[#f8f9fa]">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
                <div className="bg-white border border-gray-300 rounded-xl h-14 flex items-center px-4 shadow-sm focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all">

                    <button className="text-gray-400 hover:text-gray-600 p-2">
                        <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    </button>

                    {/* Wire up the input to React State */}
                    <input
                        type="text"
                        placeholder="Ask about CPF, HDB, healthcare, benefits, or local services..."
                        className="flex-1 h-full outline-none px-3 text-gray-700 bg-transparent placeholder-gray-400"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Let them hit Enter to send
                    />

                    <button className="text-gray-400 hover:text-gray-600 p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                    </button>

                    {/* Wire up the send button */}
                    <button
                        onClick={handleSend}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg ml-2 shadow-sm transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </button>

                </div>
                <p className="text-center text-xs text-gray-400">
                    Responses can be translated to Malay, Mandarin, or Tamil.
                </p>
            </div>
        </footer>
    )
}