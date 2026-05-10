import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./Authentication/pages/LoginPage";
import SelectProfilePage from "./Authentication/pages/SelectProfile";
import ProfilePage from "./Profile/pages/ProfilePage";
import AppLayout from "./layouts/AppLayout";
import ChatbotLayout from './Chatbot/pages/ChatBotLayout';
import ServicesPage from "./Services/pages/ServicesPage";
import ServiceJourneyPage from "./Services/pages/ServiceJourneyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/select-profile" element={<SelectProfilePage />} />

      <Route element={<AppLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatbotLayout />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/services/:categoryId"
          element={<ServiceJourneyPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
