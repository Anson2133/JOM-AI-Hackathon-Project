export default function TopNav() {
    return (
        <header className="h-[72px] bg-white flex items-center px-8 justify-between z-0">
            <div className="flex space-x-8 text-sm font-medium text-gray-500">
                <span className="text-red-500 border-b-2 border-red-500 py-6 cursor-pointer">Chat</span>
                <span className="py-6 hover:text-gray-900 cursor-pointer transition-colors">Services</span>
                <span className="py-6 hover:text-gray-900 cursor-pointer transition-colors">History</span>
                <span className="py-6 hover:text-gray-900 cursor-pointer transition-colors">Profile</span>
                <span className="py-6 hover:text-gray-900 cursor-pointer transition-colors">Help</span>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    EN
                </button>
                <button className="text-gray-500 hover:text-gray-900">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold ml-2">
                    SR
                </div>
            </div>
        </header>
    )
}