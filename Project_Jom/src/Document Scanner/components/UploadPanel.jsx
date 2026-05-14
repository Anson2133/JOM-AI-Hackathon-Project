import { FileUp, QrCode, RotateCcw } from "lucide-react";

export default function UploadPanel({
    file,
    isScanning,
    onFileSelect,
    onAnalyze,
    onReset,
    onScanWithPhone,
}) {
    const handleInputChange = (event) => {
        onFileSelect(event.target.files?.[0]);
    };

    return (
        <section className="scanner-card upload-panel">
            <div className="scanner-card-header">
                <h2>Upload or Scan Document</h2>

                {file && (
                    <button className="scanner-icon-btn" onClick={onReset}>
                        <RotateCcw size={16} />
                        Reset
                    </button>
                )}
            </div>

            <div className="scanner-upload-actions">
                <label className="scanner-upload-action">
                    <FileUp size={24} />
                    <strong>Upload File</strong>
                    <span>PDFs, screenshots</span>

                    <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleInputChange}
                        hidden
                    />
                </label>

                <button
                    className="scanner-upload-action"
                    type="button"
                    onClick={onScanWithPhone}
                    disabled={isScanning}
                >
                    <QrCode size={24} />
                    <strong>Scan with Phone</strong>
                    <span>Open camera on phone</span>
                </button>

            </div>

            <label className="scanner-dropzone">
                <FileUp size={52} />

                <strong>
                    {file ? file.name : "Drag and drop a file here"}
                </strong>

                <span>PDF, JPG, PNG, WEBP supported</span>

                <div className="scanner-browse-btn">Browse Files</div>

                <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleInputChange}
                    hidden
                />
            </label>

            <button
                className="scanner-primary-btn"
                disabled={!file || isScanning}
                onClick={onAnalyze}
            >
                {isScanning ? "Analysing Document..." : "Analyse Document"}
            </button>
        </section>
    );
}