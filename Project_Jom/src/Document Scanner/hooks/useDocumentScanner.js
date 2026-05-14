import { useState } from "react";

const DOCUMENT_SCANNER_API =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/documents/analyze";

const defaultScanSteps = [
    { label: "Upload received", status: "pending" },
    { label: "Extracting text", status: "pending" },
    { label: "Checking scam risk", status: "pending" },
    { label: "Linking to services", status: "pending" },
    { label: "Preparing guidance", status: "pending" },
];

export default function useDocumentScanner() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [result, setResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanSteps, setScanSteps] = useState(defaultScanSteps);

    const handleFileSelect = (selectedFile) => {
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setResult(null);

        setScanSteps([
            { label: "Upload received", status: "done" },
            { label: "Extracting text", status: "pending" },
            { label: "Checking scam risk", status: "pending" },
            { label: "Linking to services", status: "pending" },
            { label: "Preparing guidance", status: "pending" },
        ]);
    };

    const updateStep = (index, status) => {
        setScanSteps((prev) =>
            prev.map((step, stepIndex) =>
                stepIndex === index ? { ...step, status } : step
            )
        );
    };

    const failStep = (index) => {
        setScanSteps((prev) =>
            prev.map((step, stepIndex) =>
                stepIndex === index ? { ...step, status: "failed" } : step
            )
        );
    };

    const fileToBase64 = (selectedFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                resolve(base64);
            };

            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
        });
    };

    const handleAnalyzeDocument = async () => {
        if (!file || isScanning) return;

        try {
            setResult(null);
            setIsScanning(true);

            updateStep(1, "active");

            const base64File = await fileToBase64(file);

            updateStep(1, "done");
            updateStep(2, "active");

            const response = await fetch(DOCUMENT_SCANNER_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    file: base64File,
                    userId: localStorage.getItem("userId") || "guest",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                failStep(2);
                throw new Error(data.message || "Failed to analyse document");
            }

            updateStep(2, "done");
            updateStep(3, "active");

            await new Promise((resolve) => setTimeout(resolve, 300));

            updateStep(3, "done");
            updateStep(4, "active");

            await new Promise((resolve) => setTimeout(resolve, 300));

            updateStep(4, "done");
            setResult(data);
        } catch (error) {
            console.error(error);

            setResult({
                detectedType: "Unable to analyse",
                mainTopic: "Analysis failed",
                summary:
                    "The document could not be analysed. Please try uploading a clearer image or PDF.",
                scamRisk: {
                    level: "Unknown",
                    reasons: [error.message],
                    safeAction:
                        "Do not proceed until the document is verified manually.",
                },
                relatedService: null,
                recommendedNextStep:
                    "Try uploading the document again or ask the chatbot for help.",
            });
        } finally {
            setIsScanning(false);
        }
    };

    const resetScanner = () => {
        setFile(null);
        setPreviewUrl("");
        setResult(null);
        setIsScanning(false);
        setScanSteps(defaultScanSteps);
    };

    return {
        file,
        previewUrl,
        result,
        isScanning,
        scanSteps,
        handleFileSelect,
        handleAnalyzeDocument,
        resetScanner,
    };
}