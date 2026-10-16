import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Leaf,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import api from "../services/api";
import AppPage from "../components/AppPage";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    setLoading(true);

    api
      .get(`/plants/${id}`)
      .then(({ data }) => {
        const payload = data?.data ?? data;
        if (active) setPlant(payload?.plant ?? payload);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "We couldn't load this plant. Please return to the library and try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const addFavorite = async () => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      await api.post(`/favorites/${id}`);
      setNotice("Plant saved to your favorites.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not save this plant. It may already be in your favorites."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppPage
      eyebrow="PLANT PROFILE"
      title={
        plant?.commonName ||
        (loading ? "Loading plant profile" : "Plant details")
      }
      description={
        plant?.scientificName ||
        "Botanical information and traditional uses"
      }
      actions={
        <Link to="/plants" className="button-secondary">
          <ArrowLeft size={16} /> Back to library
        </Link>
      }
    >
      {loading ? (
        <div className="loading-panel">
          <span className="loading-spinner" />
          Loading plant details…
        </div>
      ) : error && !plant ? (
        <div className="status-banner status-error" role="alert">
          {error}
        </div>
      ) : !plant ? (
        <div className="empty-state">
          <h2>Plant not found</h2>
          <Link to="/plants" className="text-link">
            Return to the plant library
          </Link>
        </div>
      ) : (
        <>
          {error && (
            <div className="status-banner status-error" role="alert">
              {error}
            </div>
          )}

          {notice && <div className="notice-banner">{notice}</div>}

          <section className="plant-profile-hero">
            <div className="profile-illustration">
              <div className="profile-leaf-orbit">
                <Leaf size={92} strokeWidth={1.1} />
              </div>
              <span>AYURSCAN PLANT COLLECTION</span>
            </div>

            <div className="profile-summary">
              <span className="card-kicker">BOTANICAL OVERVIEW</span>
              <h2>{plant.commonName}</h2>

              <p className="scientific-name large">
                {plant.scientificName || "Scientific name unavailable"}
              </p>

              <div className="profile-facts">
                <div>
                  <span>Family</span>
                  <strong>{plant.family || "Not listed"}</strong>
                </div>

                <div>
                  <span>Plant parts</span>
                  <strong>
                    {plant.medicinalUses?.length
                      ? [
                          ...new Set(
                            plant.medicinalUses
                              .map((use) => use.plantPart)
                              .filter(Boolean)
                          ),
                        ].join(", ")
                      : "See uses below"}
                  </strong>
                </div>
              </div>

              <button
                className="button-primary"
                onClick={addFavorite}
                disabled={saving}
              >
                <Heart size={17} />
                {saving ? "Saving…" : "Add to favorites"}
              </button>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TRADITIONAL KNOWLEDGE</span>
                <h2>Medicinal uses</h2>
              </div>
              <span className="section-count">
                {plant.medicinalUses?.length || 0} entries
              </span>
            </div>

            {plant.medicinalUses?.length ? (
              <div className="use-grid">
                {plant.medicinalUses.map((use, index) => (
                  <article
                    className="knowledge-card"
                    key={use.id || `${use.title}-${index}`}
                  >
                    <div className="knowledge-icon">
                      <Sprout size={21} />
                    </div>

                    <div className="knowledge-content">
                      <h3>{use.title || "Traditional use"}</h3>

                      {use.plantPart && (
                        <span className="plant-part-tag">
                          Plant part · {use.plantPart}
                        </span>
                      )}

                      <p>
                        {use.description ||
                          use.traditionalUse ||
                          "Further information is not available for this entry."}
                      </p>

                      {use.sourceName && (
                        <small>Source: {use.sourceName}</small>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state compact">
                <p>
                  No medicinal-use entries are currently available for this
                  plant.
                </p>
              </div>
            )}
          </section>

          <section className="precaution-panel">
            <div className="precaution-icon">
              <ShieldCheck size={23} />
            </div>

            <div>
              <span className="eyebrow">PLEASE READ</span>
              <h2>Precautions and responsible use</h2>
              <p>
                {plant.precautions ||
                  "Specific precautions have not been provided for this entry. Consult a qualified healthcare professional before using a plant medicinally."}
              </p>
              <small>
                These entries describe traditional uses and are for education
                only. They do not confirm clinical effectiveness or replace
                professional medical advice.
              </small>
            </div>
          </section>
        </>
      )}
    </AppPage>
  );
}