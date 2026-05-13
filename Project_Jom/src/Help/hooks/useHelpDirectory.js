import { useEffect, useMemo, useState } from "react";

const HELP_DIRECTORY_API =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/help-directory";

const fallbackCategories = ["All"];

const fallbackQuickActions = [
  {
    id: "chatbot",
    title: "Ask AI Assistant",
    description:
      "Ask questions in plain English if you are unsure which service or agency to approach.",
    buttonText: "Open Chatbot",
    route: "/chat",
  },
  {
    id: "services",
    title: "Find Services",
    description:
      "Use your saved profile to estimate relevant schemes, eligibility, documents, and next steps.",
    buttonText: "Browse Services",
    route: "/services",
  },
  {
    id: "scanner",
    title: "Scan a Document",
    description:
      "Upload a letter, screenshot, receipt, or notice to understand what it is and what to do next.",
    buttonText: "Open Scanner",
    route: "/document-scanner",
  },
];

const fallbackFaqs = [
  {
    question: "What is this Directory page for?",
    answer:
      "The Directory page is a quick contact list for agencies, official websites, hotlines, and common support channels.",
  },
  {
    question: "When should I use the Chatbot instead?",
    answer:
      "Use the Chatbot when you are unsure what to ask, need a simple explanation, or want to describe your situation in your own words.",
  },
  {
    question: "When should I use the Services page?",
    answer:
      "Use the Services page when you want a guided journey that checks your saved profile, estimates possible eligibility, shows required documents, and gives next steps.",
  },
  {
    question: "Are the eligibility results final?",
    answer:
      "No. Eligibility results are estimates only. Final approval depends on the official agency or service provider.",
  },
];

export default function useHelpDirectory() {
  const [directoryItems, setDirectoryItems] = useState([]);
  const [apiCategories, setApiCategories] = useState(fallbackCategories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openDirectoryId, setOpenDirectoryId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(HELP_DIRECTORY_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch directory");
      }

      setDirectoryItems(Array.isArray(data.items) ? data.items : []);
      setApiCategories(
        Array.isArray(data.categories) && data.categories.length > 0
          ? data.categories
          : fallbackCategories
      );
    } catch (err) {
      console.error("Failed to fetch help directory", err);
      setError(err.message);
      setDirectoryItems([]);
      setApiCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  const filteredDirectory = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return directoryItems
      .filter((item) => {
        const categoryMatch =
          selectedCategory === "All" || item.category === selectedCategory;

        if (!categoryMatch) return false;

        if (!query) return true;

        const searchableText = [
          item.name,
          item.category,
          item.description,
          item.phone,
          item.email,
          item.website,
          item.address,
          item.openingHours,
          item.note,
          item.sourceUrl,
          ...(item.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .sort((a, b) => {
        const priorityDiff =
          Number(a.priority || 999) - Number(b.priority || 999);

        if (priorityDiff !== 0) return priorityDiff;

        return String(a.name || "").localeCompare(String(b.name || ""));
      });
  }, [directoryItems, searchTerm, selectedCategory]);

  const emergencyItems = useMemo(() => {
    return directoryItems
      .filter(
        (item) =>
          item.isEmergency === true ||
          item.category === "Emergency" ||
          item.category === "Scams & Safety"
      )
      .sort((a, b) => Number(a.priority || 999) - Number(b.priority || 999))
      .slice(0, 4);
  }, [directoryItems]);

  const toggleDirectoryItem = (id) => {
    setOpenDirectoryId((current) => (current === id ? null : id));
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    openDirectoryId,
    openFaqIndex,

    filteredDirectory,
    emergencyItems,
    helpCategories: apiCategories,
    helpFaqs: fallbackFaqs,
    helpQuickActions: fallbackQuickActions,

    loading,
    error,
    refreshDirectory: fetchDirectory,

    toggleDirectoryItem,
    toggleFaq,
    clearSearch,
  };
}