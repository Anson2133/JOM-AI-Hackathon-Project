import { FileSearch } from "lucide-react";

import UploadPanel from "../components/UploadPanel";
import DocumentPreview from "../components/DocumentPreview";
import ScanProgress from "../components/ScanProgress";
import SummaryCard from "../components/SummaryCard";
import ScamRiskCard from "../components/ScamRiskCard";
import RelatedServiceCard from "../components/RelatedServiceCard";
import NextStepCard from "../components/NextStepCard";
import DetectedInfoCard from "../components/DetectedInfoCard";
import QrScanModal from "../components/QrScanModal";

import useDocumentScanner from "../hooks/useDocumentScanner";
import useQrUploadSession from "../hooks/useQrUploadSession";

import "../../Document Scanner/documentScanner.css";

export default function DocumentScannerPage() {
    const {
        file,
        previewUrl,
        result,
        isScanning,
        scanSteps,
        handleFileSelect,
        handleAnalyzeDocument,
        resetScanner,
    } = useDocumentScanner();

    const handlePhoneUploadComplete = ({ fileName, fileType, fileBase64 }) => {
        const byteCharacters = atob(fileBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        const phoneFile = new File(
            [byteArray],
            fileName || "phone-upload.jpg",
            {
                type: fileType || "image/jpeg",
            }
        );

        handleFileSelect(phoneFile);
    };

    const {
        isQrModalOpen,
        mobileUploadUrl,
        secondsLeft,
        qrStatus,
        createQrSession,
        closeQrModal,
    } = useQrUploadSession({
        onPhoneUploadComplete: handlePhoneUploadComplete,
    });

    const hasUploadedDocument = Boolean(file);
    const hasResult = Boolean(result);

    return (
        <div className="document-scanner-page">
            <section className="document-scanner-hero">
                <div className="scanner-hero-icon">
                    <FileSearch size={28} />
                </div>

                <div className="scanner-hero-content">
                    <h1>Document Scanner</h1>

                    <p>
                        Upload a letter, PDF, screenshot, or message to
                        understand what it means, check scam risk, and
                        connect to the right service guidance.
                    </p>

                    <span className="scanner-powered-text">
                        Powered by Amazon Textract and Bedrock AI.
                        Always verify important actions through official channels.
                    </span>
                </div>
            </section>

            <div className="document-scanner-grid">
                <div className="scanner-left-column">
                    <UploadPanel
                        file={file}
                        isScanning={isScanning}
                        onFileSelect={handleFileSelect}
                        onAnalyze={handleAnalyzeDocument}
                        onReset={resetScanner}
                        onScanWithPhone={createQrSession}
                    />

                    <DocumentPreview
                        file={file}
                        previewUrl={previewUrl}
                        isScanning={isScanning}
                    />

                    {hasUploadedDocument && (
                        <ScanProgress
                            isScanning={isScanning}
                            steps={scanSteps}
                        />
                    )}
                </div>

                <div className="scanner-right-column">
                    {!hasUploadedDocument && (
                        <div className="scanner-empty-state-card">
                            <div className="scanner-empty-state-icon">
                                <FileSearch size={34} />
                            </div>

                            <h2>Ready to Analyse</h2>

                            <p>
                                Upload a document to generate an AI summary,
                                scam risk analysis, and related service guidance.
                            </p>
                        </div>
                    )}

                    {hasUploadedDocument && isScanning && (
                        <div className="scanner-loading-card">
                            <div className="scanner-loading-shimmer" />

                            <h2>Analysing Document...</h2>

                            <p>
                                Extracting text, checking scam indicators,
                                and matching services.
                            </p>

                            <div className="scanner-loading-skeletons">
                                <div className="scanner-skeleton-line large" />
                                <div className="scanner-skeleton-line" />
                                <div className="scanner-skeleton-line medium" />
                            </div>
                        </div>
                    )}

                    {hasResult && !isScanning && (
                        <>
                            <SummaryCard result={result} />

                            <DetectedInfoCard result={result} />

                            <ScamRiskCard result={result} />

                            <RelatedServiceCard result={result} />

                            <NextStepCard result={result} />
                        </>
                    )}
                </div>
            </div>

            <QrScanModal
                isOpen={isQrModalOpen}
                mobileUploadUrl={mobileUploadUrl}
                secondsLeft={secondsLeft}
                qrStatus={qrStatus}
                onClose={closeQrModal}
                onGenerateNew={createQrSession}
            />
        </div>
    );
}