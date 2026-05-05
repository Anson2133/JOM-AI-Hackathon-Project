export default function Sidebar() {
    return (
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col z-10">
            {/* Logo Area */}
            <div className="p-5 flex items-center space-x-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h1 className="text-xl font-medium tracking-tight">MyTampines Assistant</h1>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 px-4 py-6 flex flex-col gap-6 overflow-y-auto">
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg w-full transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <span className="text-xl leading-none mb-0.5">+</span> New Conversation
                </button>

                <div>
                    <p className="text-xs font-bold text-gray-400 mb-3 tracking-wider uppercase">Recent Conversations</p>
                    <div className="flex flex-col gap-1">
                        <button className="flex flex-col text-left p-3 rounded-lg bg-red-50 border border-red-100 transition-colors">
                            <span className="text-sm font-semibold text-gray-900 truncate w-full flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                MediShield Life premium query
                            </span>
                            <span className="text-xs text-gray-500 mt-1 pl-6">Today</span>
                        </button>
                        <button className="flex flex-col text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                            <span className="text-sm font-medium truncate w-full flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                HDB season parking renewal
                            </span>
                            <span className="text-xs text-gray-400 mt-1 pl-6">Yesterday</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}