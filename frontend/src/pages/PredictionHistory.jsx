import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Leaf,
  ScanLine,
} from "lucide-react";
import api from "../services/api";
import AppPage from "../components/AppPage";

const normalizeHistory = (payload) => {
  const value = payload?.data ?? payload;

  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.predictions)) return value.predictions;

  return [];
};

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api
      .get("/predictions")
      .then(({ data }) => {
        if (active) setHistory(normalizeHistory(data));
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "We couldn't load your identification history."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppPage
      eyebrow="YOUR ACTIVITY"
      title={
        <>
          A history of <span className="heading-accent">discovery.</span>
        </>
      }
      description="Revisit your previous plant identifications and the information associated with each result."
      actions={
        <Link to="/predict" className="button-primary">
          <ScanLine size={17} /> Identify a plant <ArrowRight size={16} />
        </Link>
      }
    >
      {error && (
        <div className="status-banner status-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-panel">
          <span className="loading-spinner" />
          Loading your activity…
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Clock3 size={25} />
          </div>

          <h2>No scans yet</h2>
          <p>
            Your identification history will appear here after you scan or
            upload a plant image.
          </p>

          <Link to="/predict" className="button-primary">
            <ScanLine size={17} /> Start identifying
          </Link>
        </div>
      ) : (
        <section className="history-list">
          {history.map((item, index) => {
            const plant = item.plant;
            const confidence = Number(item.confidence);
            const date =
              item.predictedAt || item.createdAt || item.created_at;

            return (
              <article
                className="history-item"
                key={item.id || item._id || `${plant?.id}-${index}`}
              >
                <div className="history-thumb">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={plant?.commonName || "Scanned plant"}
                      loading="lazy"
                    />
                  ) : (
                    <Leaf size={30} />
                  )}
                </div>

                <div className="history-main">
                  <span className="card-kicker">
                    IDENTIFICATION{" "}
                    {String(history.length - index).padStart(2, "0")}
                  </span>

                  <h2>
                    {plant?.commonName || item.prediction || "Unknown plant"}
                  </h2>

                  <p className="scientific-name">
                    {plant?.scientificName || "No matching plant profile"}
                  </p>

                  <div className="history-meta">
                    {date && (
                      <span>
                        <CalendarDays size={14} />
                        {new Date(date).toLocaleString()}
                      </span>
                    )}

                    {Number.isFinite(confidence) && (
                      <span>
                        <span className="confidence-dot" />
                        {`${
                          (confidence <= 1 ? confidence * 100 : confidence).toFixed(1)
                        }% confidence`}
                      </span>
                    )}
                  </div>
                </div>

                {plant?.id && (
                  <Link
                    to={`/plants/${plant.id}`}
                    className="history-view-link"
                    aria-label={`View ${plant.commonName} details`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                )}
              </article>
            );
          })}
        </section>
      )}
    </AppPage>
  );
}