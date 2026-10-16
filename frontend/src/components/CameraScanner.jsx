import { useEffect, useRef, useState } from "react";

function CameraScanner({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [error, setError] = useState("");
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError("");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);

      setError(
        "Camera permission is required to scan a plant."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }
  };

  const captureImage = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      return;
    }

    setCapturing(true);

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCapturing(false);
          return;
        }

        const file = new File(
          [blob],
          `ayurscan-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        stopCamera();

        setCapturing(false);

        onCapture(file);
      },
      "image/jpeg",
      0.9
    );
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="camera-overlay">

      <div className="camera-modal">

        <div className="camera-header">

          <div>
            <span className="camera-label">
              AYURSCAN SCANNER
            </span>

            <h2>Scan a Plant</h2>
          </div>

          <button
            className="camera-close"
            onClick={handleClose}
          >
            ✕
          </button>

        </div>


        {error ? (

          <div className="camera-error">

            <div className="camera-error-icon">
              📷
            </div>

            <h3>Camera unavailable</h3>

            <p>{error}</p>

            <button
              className="primary-button"
              onClick={startCamera}
            >
              Try Again
            </button>

          </div>

        ) : (

          <>
            <div className="camera-view">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />

              <div className="scanner-overlay">

                <div className="scanner-corner top-left" />
                <div className="scanner-corner top-right" />
                <div className="scanner-corner bottom-left" />
                <div className="scanner-corner bottom-right" />

                <div className="scanner-line" />

              </div>

              <div className="camera-instruction">
                Position the plant inside the frame
              </div>

            </div>


            <div className="camera-actions">

              <button
                className="capture-button"
                onClick={captureImage}
                disabled={capturing}
              >
                {capturing
                  ? "Capturing..."
                  : "📷 Capture Plant"}
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default CameraScanner;