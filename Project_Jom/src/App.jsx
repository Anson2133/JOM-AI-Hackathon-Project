import { Routes, Route, Navigate } from 'react-router';
import ChatbotLayout from './Chatbot/pages/ChatBotLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/chat" element={<ChatbotLayout />} />
    </Routes>
  );
}