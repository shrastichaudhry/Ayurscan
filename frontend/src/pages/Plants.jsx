import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Search, Sprout } from "lucide-react";
import api from "../services/api";
import AppPage from "../components/AppPage";

const plantVisuals = {
  "aloe vera": { emoji: "🌿", tone: "tone-mint" },
  amla: { emoji: "🍃", tone: "tone-lime" },
  moringa: { emoji: "🌱", tone: "tone-sage" },
  tulsi: { emoji: "🌿", tone: "tone-forest" },
  turmeric: { emoji: "🟡", tone: "tone-gold" },
};

const unwrapList = (payload) => {
  const value = payload?.data ?? payload;

  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.plants)) return value.plants;

  return [];
};

export default function Plants() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [savingId, setSavingId] = useState("");

  useEffect(() => {
    let active = true;

    api
      .get("/plants")
      .then(({ data }) => {
        if (active) setPlants(unwrapList(data));
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "We couldn't load the plant collection. Please try again."
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

  const filteredPlants = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return plants;

    return plants.filter((plant) =>
      [plant.commonName, plant.scientificName, plant.family]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [plants, search]);

  const addFavorite = async (plant) => {
    if (!plant?.id) return;

    setSavingId(plant.id);
    setNotice("");
    setError("");

    try {
      await api.post(`/favorites/${plant.id}`);
      setNotice(`${plant.commonName} added to your favorites.`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not add this plant to favorites. It may already be saved."
      );
    } finally {
      setSavingId("");
    }
  };

  return (
    <AppPage
      eyebrow="THE PLANT LIBRARY"
      title={
        <>
          A closer look at <span className="heading-accent">nature.</span>
        </>
      }
      description="Explore the plants supported by AyurScan, learn their botanical names, and discover traditional Ayurvedic knowledge with care."
      actions={
        <Link className="button-primary" to="/predict">
          <Leaf size={17} /> Identify a plant <ArrowRight size={16} />
        </Link>
      }
    >
      <section className="library-toolbar">
        <div className="library-count">
          <Sprout size={18} />
          <span>
            <strong>{plants.length.toString().padStart(2, "0")}</strong> plants
            in the collection
          </span>
        </div>

        <label className="search-field">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by plant, scientific name or family"
            aria-label="Search plants"
          />
        </label>
      </section>

      {notice && <div className="notice-banner">{notice}</div>}

      {error && (
        <div className="status-banner status-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-panel">
          <span className="loading-spinner" />
          Loading your plant library…
        </div>
      ) : filteredPlants.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={25} />
          </div>
          <h2>No plants found</h2>
          <p>Try another name or clear your search.</p>
          <button
            className="button-secondary"
            onClick={() => setSearch("")}
          >
            Clear search
          </button>
        </div>
      ) : (
        <section className="plant-catalog-grid">
          {filteredPlants.map((plant, index) => {
            const visual = plantVisuals[
              (plant.commonName || "").toLowerCase()
            ] || { emoji: "🌱", tone: "tone-mint" };

            return (
              <article
                className="catalog-card"
                key={plant.id || plant.commonName}
              >
                <div className={`catalog-art ${visual.tone}`}>
                  <span className="catalog-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="catalog-emoji" aria-hidden="true">
                    {visual.emoji}
                  </span>

                  <button
                    className="icon-button catalog-favorite"
                    onClick={() => addFavorite(plant)}
                    disabled={savingId === plant.id}
                    aria-label={`Add ${plant.commonName} to favorites`}
                    title="Add to favorites"
                  >
                    <Heart size={17} />
                  </button>
                </div>

                <div className="catalog-card-body">
                  <span className="card-kicker">MEDICINAL PLANT</span>
                  <h2>{plant.commonName || "Unnamed plant"}</h2>

                  <p className="scientific-name">
                    {plant.scientificName || "Scientific name unavailable"}
                  </p>

                  {plant.family && (
                    <p className="plant-family">
                      <span>Family</span>
                      {plant.family}
                    </p>
                  )}

                  <div className="catalog-card-actions">
                    <Link to={`/plants/${plant.id}`} className="text-link">
                      Explore details <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <p className="medical-disclaimer">
        <Leaf size={15} /> Plant information is educational and describes
        traditional uses; it is not a diagnosis or treatment recommendation.
      </p>
    </AppPage>
  );
}