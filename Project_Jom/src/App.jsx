import { useState } from 'react' // Import useState
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import ChatArea from './components/ChatArea'
import InputBar from './components/InputBar'

export default function App() {
  // 1. The memory for the text box
  const [inputText, setInputText] = useState('')
  
  // 2. The memory for the chat history (starting with your hardcoded ones)
  const [messages, setMessages] = useState([
    { role: 'ai', type: 'text', content: 'Good morning Mdm Siti. Based on your profile, I can help explain your MediShield Life premium and payment deadline.' },
    { role: 'user', type: 'text', content: 'How much is my premium this year and when is it due?' },
    { role: 'ai', type: 'invoice', content: '' }
    // We will handle the complex UI card later!
  ])

  // 3. The function that runs when they hit Send
  const handleSend = () => {
    if (inputText.trim() === '') return; 

    const newMessages = [...messages, { role: 'user', type: 'text', content: inputText }];
    setMessages(newMessages);
    setInputText('');
    
    // ADD THIS LINE:
    console.log("Current Chat History:", newMessages); 
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#f8f9fa]">
        <TopNav />
        {/* Pass the memory down as "props" */}
        <ChatArea messages={messages} />
        <InputBar 
          inputText={inputText} 
          setInputText={setInputText} 
          handleSend={handleSend} 
        />
      </div>
    </div>
  )
}