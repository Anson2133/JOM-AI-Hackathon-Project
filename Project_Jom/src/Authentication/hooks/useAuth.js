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
    localStorage.setItem("userId", data.user?.userId);

    // Save user for navbar/chat/profile fallback
    localStorage.setItem("user", JSON.stringify(data.user || {}));

    // Save profile immediately so Services/Chat/Navbar can use it
    localStorage.setItem(
      "cachedProfile",
      JSON.stringify({
        displayName:
          data.user?.displayName ||
          data.user?.name ||
          data.profile?.displayName ||
          data.profile?.identity?.name ||
          "Demo Resident",
        ...data.profile,
      })
    );

    // Optional: keep old key too, if other parts of app still use "profile"
    localStorage.setItem("profile", JSON.stringify(data.profile || {}));

    window.location.href = "/services";
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