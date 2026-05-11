import { FileText } from "lucide-react";

export default function DocumentPreview({ file, previewUrl, isScanning }) {
    const isPdf = file?.type === "application/pdf";

    return (
        <section className="scanner-card document-preview-card">
            <h2>Document Preview</h2>

            {!file && (
                <div className="empty-preview">
                    <FileText size={44} />
                    <p>No document uploaded yet.</p>
                </div>
            )}

            {file && (
                <div className="document-preview-frame">
                    {isScanning && (
                        <div className="document-scanner-overlay">
                            <div className="document-scan-line" />
                        </div>
                    )}

                    {isPdf ? (
                        <iframe src={previewUrl} title="PDF Preview" />
                    ) : (
                        <img src={previewUrl} alt="Document preview" />
                    )}
                </div>
            )}
        </section>
    );
}