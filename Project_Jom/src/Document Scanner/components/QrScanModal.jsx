import { QRCodeCanvas } from "qrcode.react";
import { X, Smartphone, RefreshCw } from "lucide-react";

export default function QrScanModal({
    isOpen,
    mobileUploadUrl,
    secondsLeft,
    qrStatus,
    onClose,
    onGenerateNew,
}) {
    if (!isOpen) return null;

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="qr-modal-backdrop">
            <div className="qr-modal">
                <button className="qr-modal-close" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="qr-modal-icon">
                    <Smartphone size={30} />
                </div>

                <h2>Scan with your phone</h2>

                <p>
                    Use your phone camera to scan this QR code and upload
                    your document securely.
                </p>

                {qrStatus !== "expired" && mobileUploadUrl && (
                    <div className="qr-code-box">
                        <QRCodeCanvas
                            value={mobileUploadUrl}
                            size={230}
                            includeMargin
                        />
                    </div>
                )}

                {qrStatus === "expired" ? (
                    <div className="qr-expired-box">
                        <strong>QR code expired</strong>
                        <p>Please generate a new QR code to continue.</p>

                        <button
                            className="scanner-primary-btn full-width"
                            onClick={onGenerateNew}
                        >
                            <RefreshCw size={16} />
                            Generate New QR Code
                        </button>
                    </div>
                ) : (
                    <span className="qr-expiry-text">
                        This upload link expires in{" "}
                        <strong>
                            {minutes}:{String(seconds).padStart(2, "0")}
                        </strong>
                    </span>
                )}
            </div>
        </div>
    );
} 