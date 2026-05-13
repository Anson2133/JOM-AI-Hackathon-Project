import { useState } from "react";

const MATCH_API =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/match";

const DEBUG_SERVICE_MATCH = true;

function debugLog(label, data) {
  if (DEBUG_SERVICE_MATCH) {
    console.log(`[ServiceMatch] ${label}`, data);
  }
}

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

      const payload = {
        userId,
        categoryId,
        selectedNeedId,
        debug: DEBUG_SERVICE_MATCH,
      };

      debugLog("matchServices payload", payload);

      const res = await fetch(MATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      debugLog("matchServices response", data);

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

      const payload = {
        action: "checkEligibility",
        userId,
        serviceId,
        selectedNeedId,
        answers,
        debug: DEBUG_SERVICE_MATCH,
      };

      debugLog("checkEligibility payload", payload);

      const res = await fetch(MATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      debugLog("checkEligibility response", data);

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

  const generateQuestions = async ({ serviceId, selectedNeedId }) => {
    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId");

      const payload = {
        action: "generateQuestions",
        userId,
        serviceId,
        selectedNeedId,
        debug: DEBUG_SERVICE_MATCH,
      };

      debugLog("generateQuestions payload", payload);

      const res = await fetch(MATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      debugLog("generateQuestions response", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate questions");
      }

      return data.extraQuestions || [];
    } catch (err) {
      console.error(err);
      setError(err.message);
      return [];
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
    generateQuestions,
  };
}