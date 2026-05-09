import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function InputBar({
    inputText,
    setInputText,
    handleSend,
    isLoading
}) {
    const fileInputRef = useRef(null);

    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [warning, setWarning] = useState("");

    const { t } = useTranslation();

    const supportedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            };

            reader.onerror = reject;
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setWarning("");

        if (!supportedTypes.includes(file.type)) {
            setWarning(t("chat.unsupportedFiles"));
            event.target.value = "";
            return;
        }

        try {
            const base64 = await convertToBase64(file);

            setSelectedFile({
                name: file.name,
                type: file.type,
                base64,
            });

            setShowAttachMenu(false);
        } catch (error) {
            console.error(error);
            setWarning(t("chat.failedAttach"));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setWarning("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSend = () => {
        if (isLoading) return;

        handleSend(selectedFile);

        setSelectedFile(null);
        setWarning("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <footer className="input-footer">
            <div className="input-container">

                {warning && (
                    <div className="input-warning">
                        {warning}
                    </div>
                )}

                {selectedFile && (
                    <div className="file-preview-card">
                        <div className="file-preview-thumb">
                            {selectedFile.type === "application/pdf" ? "PDF" : "IMG"}
                        </div>

                        <div className="file-preview-info">
                            <p>{selectedFile.name}</p>
                            <span>{selectedFile.type}</span>
                        </div>

                        <button
                            className="file-preview-remove"
                            onClick={removeFile}
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className="input-box">
                    <div className="attach-wrapper">
                        <button
                            className="input-icon-btn"
                            type="button"
                            onClick={() => setShowAttachMenu(!showAttachMenu)}
                        >
                            <svg
                                className="rotate-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>

                        {showAttachMenu && (
                            <div className="attach-popup">
                                <button
                                    className="attach-option"
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <div className="attach-option-icon">📎</div>

                                    <div>
                                        <p>{t("chat.uploadDevice")}</p>
                                        <span>{t("chat.supportedFormats")}</span>
                                    </div>
                                </button>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={handleFileChange}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder={t("chat.askPlaceholder")}
                        className="chat-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSend();
                            }
                        }}
                    />

                    <button className="input-icon-btn" type="button">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                        </svg>
                    </button>

                    <button
                        className="send-btn"
                        type="button"
                        onClick={onSend}
                        disabled={isLoading}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>

                <p className="input-disclaimer">
                    {t("chat.translationDisclaimer")}
                </p>
            </div>
        </footer>
    );
}