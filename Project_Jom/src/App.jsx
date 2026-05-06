import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./Authentication/pages/LoginPage";
import SelectProfilePage from "./Authentication/pages/SelectProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/select-profile" element={<SelectProfilePage />} />
    </Routes>
  );
}

export default App;