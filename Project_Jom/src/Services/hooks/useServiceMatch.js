import { useState } from "react";

const MATCH_API =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/match";

export default function useServiceMatch() {
  const [matches, setMatches] = useState([]);
  const [profileUsed, setProfileUsed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const matchServices = async ({ categoryId, selectedNeedId }) => {
    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");

      const res = await fetch(MATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          categoryId,
          selectedNeedId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to match services");
      }

      setMatches(data.matches || []);
      setProfileUsed(data.profileUsed || null);

      return data;
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMatches([]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async ({ serviceId, selectedNeedId, answers }) => {
    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");

      const res = await fetch(MATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "checkEligibility",
          userId,
          serviceId,
          selectedNeedId,
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to recheck eligibility");
      }

      return data;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    matches,
    profileUsed,
    loading,
    error,
    matchServices,
    checkEligibility,
  };
}