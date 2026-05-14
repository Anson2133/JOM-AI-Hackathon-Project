import { useRef, useState } from "react";
import { useParams } from "react-router";
import { Camera, ImageUp, RotateCcw, CheckCircle } from "lucide-react";
import "../documentScanner.css";

const API_BASE_URL =
    "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com";

export default function MobileDocumentUploadPage() {
    const { scanSessionId } = useParams();

    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setError] = useState("");

    const handleFileSelect = (selectedFile) => {
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setError("");
    };

    const fileToBase64 = (selectedFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result.split(",")[1]);
            };

            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
        });
    };

    const uploadPhoto = async () => {
        if (!file) return;

        try {
            setIsUploading(true);
            setError("");

            const base64File = await fileToBase64(file);

            const response = await fetch(`${API_BASE_URL}/documents/mobile-upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scanSessionId,
                    fileName: file.name || "phone-upload.jpg",
                    fileType: file.type || "image/jpeg",
                    file: base64File,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setIsUploaded(true);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    if (isUploaded) {
        return (
            <div className="mobile-upload-page">
                <div className="mobile-upload-card">
                    <CheckCircle size={56} color="#039855" />
                    <h1>Upload Complete</h1>
                    <p>
                        Your document has been sent to the desktop scanner.
                        You can return to your computer now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mobile-upload-page">
            <div className="mobile-upload-card">
                <h1>Upload Document</h1>

                <p>
                    Take a photo or upload an image of your document.
                    Make sure the text is clear and readable.
                </p>

                {!previewUrl && (
                    <div className="mobile-upload-actions">
                        <button
                            onClick={() => cameraInputRef.current.click()}
                            className="mobile-primary-btn"
                        >
                            <Camera size={20} />
                            Take Photo
                        </button>

                        <button
                            onClick={() => galleryInputRef.current.click()}
                            className="mobile-outline-btn"
                        >
                            <ImageUp size={20} />
                            Upload from Gallery
                        </button>
                    </div>
                )}

                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    hidden
                    onChange={(event) => handleFileSelect(event.target.files[0])}
                />

                <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) => handleFileSelect(event.target.files[0])}
                />

                {previewUrl && (
                    <>
                        <div className="mobile-preview">
                            <img src={previewUrl} alt="Document preview" />
                        </div>

                        <div className="mobile-upload-actions">
                            <button
                                className="mobile-outline-btn"
                                onClick={() => {
                                    setFile(null);
                                    setPreviewUrl("");
                                }}
                            >
                                <RotateCcw size={18} />
                                Retake
                            </button>

                            <button
                                className="mobile-primary-btn"
                                onClick={uploadPhoto}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Use This Photo"}
                            </button>
                        </div>
                    </>
                )}

                {error && <p className="mobile-error">{error}</p>}
            </div>
        </div>
    );
}