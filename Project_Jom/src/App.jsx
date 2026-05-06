import { Routes, Route, Navigate } from 'react-router';
import ChatbotLayout from './chatbot/ChatbotLayout';

export default function App() {
  return (
    <Routes>
      {/* 1. Redirect the default empty path straight to the chat */}
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* 2. Your Feature Route */}
      <Route path="/chat" element={<ChatbotLayout />} />

      {/* 3. Placeholders for other pages your team might build */}
      <Route path="/services" element={<div>Services Page Coming Soon</div>} />
      <Route path="/history" element={<div>History Page Coming Soon</div>} />
    </Routes>
  );
}