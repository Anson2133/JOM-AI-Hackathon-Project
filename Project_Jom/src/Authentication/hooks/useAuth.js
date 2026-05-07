export function useAuth() {
  const API_URL = "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/auth/demo-login";

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
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("profile", JSON.stringify(data.profile));

    window.location.href = "/profile";
  };

  return { login };
}