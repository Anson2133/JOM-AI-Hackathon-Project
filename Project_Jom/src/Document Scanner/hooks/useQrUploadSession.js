import { useEffect, useRef, useState } from "react";

const API_BASE_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com";

export default function useQrUploadSession({ onPhoneUploadComplete }) {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [scanSessionId, setScanSessionId] = useState(null);
    const [mobileUploadUrl, setMobileUploadUrl] = useState("");
    const [expiresAt, setExpiresAt] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [qrStatus, setQrStatus] = useState("idle");

    const pollingRef = useRef(null);

    const createQrSession = async () => {
        try {
            setQrStatus("creating");

            const userId = localStorage.getItem("userId") || "guest";

            const response = await fetch(`${API_BASE_URL}/documents/scan-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create QR session");
            }

            setScanSessionId(data.scanSessionId);
            setMobileUploadUrl(data.mobileUploadUrl);
            setExpiresAt(data.expiresAt);
            setSecondsLeft(data.secondsLeft || 600);
            setIsQrModalOpen(true);
            setQrStatus("waiting");

            startPolling(data.scanSessionId);
        } catch (error) {
            console.error(error);
            setQrStatus("error");
        }
    };

    const startPolling = (sessionId) => {
        stopPolling();

        pollingRef.current = setInterval(async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/documents/scan-session/${sessionId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to check session");
                }

                if (data.status === "UPLOADED") {
                    stopPolling();
                    setQrStatus("uploaded");
                    setIsQrModalOpen(false);

                    onPhoneUploadComplete({
                        fileName: data.fileName,
                        fileType: data.fileType,
                        fileBase64: data.fileBase64,
                        uploadMethod: "phone",
                    });
                }

                if (data.status === "EXPIRED") {
                    stopPolling();
                    setQrStatus("expired");
                }
            } catch (error) {
                console.error("Polling failed:", error);
            }
        }, 2000);
    };

    const stopPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }
    };

    const closeQrModal = () => {
        setIsQrModalOpen(false);
        stopPolling();
    };

    useEffect(() => {
        if (!expiresAt) return;

        const timer = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const remaining = Math.max(0, expiresAt - now);

            setSecondsLeft(remaining);

            if (remaining <= 0) {
                setQrStatus("expired");
                stopPolling();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [expiresAt]);

    useEffect(() => {
        return () => stopPolling();
    }, []);

    return {
        isQrModalOpen,
        scanSessionId,
        mobileUploadUrl,
        secondsLeft,
        qrStatus,
        createQrSession,
        closeQrModal,
    };
} 