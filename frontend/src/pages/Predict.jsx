import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ImagePlus,
  Leaf,
  LoaderCircle,
  ScanLine,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CameraScanner from "../components/CameraScanner";
import AppPage from "../components/AppPage";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const predictPlant = async (selectedFile) => {
    if (!selectedFile) {
      setError("Choose a plant image or take a photo to continue.");
      return;
    }

    if (!selectedFile.type?.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const { data } = await api.post(
        "/predictions/predict",
        formData
      );

      setResult(data?.data ?? data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Identification failed. Check that the API is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    predictPlant(file);
  };

  const plant = result?.plant;
  const confidence = Number(result?.confidence);
  const isUnknown =
    !plant ||
    String(result?.prediction || "").toLowerCase() === "unknown";

  const confidencePercent = Number.isFinite(confidence)
    ? Math.max(
        0,
        Math.min(100, confidence <= 1 ? confidence * 100 : confidence)
      )
    : null;

  return (
    <AppPage
      eyebrow="AI IDENTIFICATION STUDIO"
      title={
        <>
          Meet the plant. <span className="heading-accent">Know more.</span>
        </>
      }
      description="Upload a clear image or use your camera. AyurScan will compare it with its supported plant classes and show a result when confidence is sufficient."
      actions={
        <Link to="/plants" className="button-secondary">
          <Leaf size={16} /> Browse plants
        </Link>
      }
    >
      <div className="identify-layout">
        <section className="identify-workspace">
          <div className="identify-workspace-heading">
            <div className="identify-step-icon">
              <ScanLine size={22} />
            </div>

            <div>
              <span className="card-kicker">STEP 01</span>
              <h2>Add a plant image</h2>
              <p>For best results, focus on one plant in natural light.</p>
            </div>
          </div>

          <div className={`image-dropzone ${preview ? "has-preview" : ""}`}>
            {preview ? (
              <div className="image-preview-wrap">
                <img
                  className="image-preview"
                  src={preview}
                  alt="Selected plant preview"
                />
                <div className="image-preview-caption">
                  <CheckCircle2 size={16} />
                  <span>{file?.name}</span>
                </div>
              </div>
            ) : (
              <div className="dropzone-empty">
                <div className="dropzone-icon">
                  <UploadCloud size={28} />
                </div>
                <h3>Upload a plant photo</h3>
                <p>JPG, PNG or WebP · Use a clear, well-lit image</p>
              </div>
            )}

            <div className="identify-upload-actions">
              <label className="button-primary upload-label">
                <ImagePlus size={17} /> Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => {
                    const selected = event.target.files?.[0];

                    if (selected) {
                      setFile(selected);
                      setResult(null);
                      setError("");
                    }
                  }}
                />
              </label>

              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setError("");
                  setShowCamera(true);
                }}
                disabled={loading}
              >
                <Camera size={17} /> Use camera
              </button>
            </div>
          </div>

          {error && (
            <div className="status-banner status-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="identify-submit"
              disabled={loading || !file}
            >
              {loading ? (
                <>
                  <LoaderCircle className="spin-icon" size={18} />
                  Analyzing image…
                </>
              ) : (
                <>
                  <ScanLine size={18} />
                  Identify this plant
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="identify-privacy">
            <ShieldCheck size={16} />
            <span>
              Your image is sent to the AyurScan identification service to
              generate a prediction.
            </span>
          </div>
        </section>

        <aside className="identify-side-panel">
          <div className="side-panel-art">
            <div className="side-art-circle">
              <Leaf size={70} strokeWidth={1.2} />
            </div>
            <span className="side-art-spark spark-one">✦</span>
            <span className="side-art-spark spark-two">✧</span>
          </div>

          <span className="card-kicker">SUPPORTED CLASSES</span>
          <h2>Five plants, one place to explore.</h2>
          <p>
            AyurScan currently supports Aloe Vera, Amla, Moringa, Tulsi and
            Turmeric. Images outside the supported classes may be returned
            as unknown.
          </p>

          <div className="supported-chip-list">
            <span>Aloe Vera</span>
            <span>Amla</span>
            <span>Moringa</span>
            <span>Tulsi</span>
            <span>Turmeric</span>
          </div>

          <div className="side-panel-note">
            <ShieldCheck size={18} />
            <p>
              <strong>Confidence-aware results</strong>
              <br />
              If the model cannot confidently match an image, it may not
              return a plant profile.
            </p>
          </div>
        </aside>
      </div>

      {result && (
        <section className="prediction-result-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ANALYSIS COMPLETE</span>
              <h2>Your identification result</h2>
            </div>

            <span
              className={`result-status ${isUnknown ? "unknown" : "known"}`}
            >
              {isUnknown ? "Needs review" : "Plant matched"}
            </span>
          </div>

          <div className="prediction-result-card">
            <div
              className={`prediction-result-symbol ${
                isUnknown ? "unknown" : ""
              }`}
            >
              <Leaf size={34} />
            </div>

            <div className="prediction-result-main">
              <span className="card-kicker">MODEL PREDICTION</span>

              <h3>
                {isUnknown
                  ? "Plant not confidently identified"
                  : plant.commonName || result.prediction}
              </h3>

              {plant?.scientificName && (
                <p className="scientific-name">{plant.scientificName}</p>
              )}

              {confidencePercent !== null && (
                <div className="confidence-meter">
                  <div className="confidence-label">
                    <span>Model confidence</span>
                    <strong>{confidencePercent.toFixed(1)}%</strong>
                  </div>

                  <div className="confidence-track">
                    <span style={{ width: `${confidencePercent}%` }} />
                  </div>
                </div>
              )}

              {isUnknown ? (
                <p className="result-guidance">
                  Try a sharper photo with the leaves clearly visible, a
                  simple background, and one plant in frame. Do not rely on
                  an uncertain prediction for medicinal use.
                </p>
              ) : (
                <>
                  {plant?.family && (
                    <p>
                      <strong>Family:</strong> {plant.family}
                    </p>
                  )}

                  {plant?.medicinalUses?.length > 0 && (
                    <div className="result-uses">
                      <h4>Traditional uses listed for this plant</h4>

                      {plant.medicinalUses.map((use, index) => (
                        <div
                          className="result-use-item"
                          key={use.id || index}
                        >
                          <strong>{use.title || "Traditional use"}</strong>

                          {use.plantPart && (
                            <span>Plant part · {use.plantPart}</span>
                          )}

                          <p>{use.description}</p>

                          {use.sourceName && (
                            <small>Source: {use.sourceName}</small>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {plant?.precautions && (
                    <div className="result-precaution">
                      <ShieldCheck size={18} />
                      <p>
                        <strong>Precautions</strong>
                        <br />
                        {plant.precautions}
                      </p>
                    </div>
                  )}

                  {plant?.id && (
                    <Link
                      className="text-link"
                      to={`/plants/${plant.id}`}
                    >
                      Open full plant profile <ArrowRight size={15} />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <p className="medical-disclaimer">
            <ShieldCheck size={15} /> This result is for educational use
            only. Traditional-use information is not medical advice and
            should not be used to diagnose or treat a condition.
          </p>
        </section>
      )}

      {showCamera && (
        <CameraScanner
          onCapture={(capturedFile) => {
            setShowCamera(false);
            predictPlant(capturedFile);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
    </AppPage>
  );
}