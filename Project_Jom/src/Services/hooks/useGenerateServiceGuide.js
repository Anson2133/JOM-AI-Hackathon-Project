import { useState } from "react";

const SERVICE_GUIDE_API =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/generate-service-guide";

export default function useGenerateServiceGuide() {
    const [generatingServiceGuide, setGeneratingServiceGuide] = useState(false);
    const [serviceGuideError, setServiceGuideError] = useState("");
    const [serviceGuide, setServiceGuide] = useState(null);

    const generateServiceGuide = async ({
        service,
        selectedNeed,
        eligibilityResult,
        profile,
    }) => {
        try {
            setGeneratingServiceGuide(true);
            setServiceGuideError("");

            const res = await fetch(SERVICE_GUIDE_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service,
                    selectedNeed,
                    eligibilityResult,
                    profile,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || data.error || "Failed to generate service guide"
                );
            }

            setServiceGuide(data.guide);
            return data.guide;
        } catch (err) {
            console.error(err);
            setServiceGuideError(err.message);
            return null;
        } finally {
            setGeneratingServiceGuide(false);
        }
    };

    const resetServiceGuide = () => {
        setServiceGuide(null);
        setServiceGuideError("");
    };

    return {
        generatingServiceGuide,
        serviceGuideError,
        serviceGuide,
        generateServiceGuide,
        resetServiceGuide,
    };
}