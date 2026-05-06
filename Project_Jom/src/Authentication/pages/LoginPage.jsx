import Header from "../components/Header";
import AuthCard from "../components/AuthCard";
import "../../Authentication/auth.css";

function LoginPage() {
  return (
    <div className="auth-layout">
      <Header />

      <main className="auth-main">
        <AuthCard />
      </main>
    </div>
  );
}

export default LoginPage;