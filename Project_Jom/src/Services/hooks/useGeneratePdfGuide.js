import { useState } from "react";

const PDF_API =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/services/generate-pdf";

export default function useGeneratePdfGuide() {
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [pdfError, setPdfError] = useState("");
    const [pdfResult, setPdfResult] = useState(null);

    const generatePdfGuide = async ({
        residentName,
        email,
        service,
        selectedNeed,
        eligibilityResult,
        serviceGuide,
    }) => {
        try {
            setGeneratingPdf(true);
            setPdfError("");
            setPdfResult(null);

            const userId = localStorage.getItem("userId");

            const res = await fetch(PDF_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    residentName,
                    email,
                    service,
                    selectedNeed,
                    eligibilityResult,
                    serviceGuide,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to generate PDF guide");
            }

            setPdfResult(data);

            if (data.downloadUrl) {
                window.open(data.downloadUrl, "_blank");
            }

            return data;
        } catch (err) {
            console.error(err);
            setPdfError(err.message);
            return null;
        } finally {
            setGeneratingPdf(false);
        }
    };

    return {
        generatingPdf,
        pdfError,
        pdfResult,
        generatePdfGuide,
    };
}