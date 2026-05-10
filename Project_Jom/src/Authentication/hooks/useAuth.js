export function useAuth() {
  const API_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/auth/demo-login";

  const login = async (demoResidentId) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ demoResidentId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("sessionToken", data.sessionToken);
    localStorage.setItem("userId", data.user.userId);

    window.location.href = "/profile";
  };

  const logout = () => {
    const language = localStorage.getItem("i18nextLng");

    localStorage.clear();

    if (language) {
      localStorage.setItem("i18nextLng", language);
    }

    window.location.href = "/";
  };

  return { login, logout };
}