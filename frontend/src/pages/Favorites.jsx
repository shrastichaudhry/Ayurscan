import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Trash2 } from "lucide-react";
import api from "../services/api";
import AppPage from "../components/AppPage";

const normalizeFavorites = (payload) => {
  const value = payload?.data ?? payload;

  const items = Array.isArray(value)
    ? value
    : Array.isArray(value?.items)
      ? value.items
      : Array.isArray(value?.favorites)
        ? value.favorites
        : [];

  return items
    .map((item) => (item?.plant ? item : { plant: item }))
    .filter((item) => item.plant);
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");

  const fetchFavorites = useCallback(async () => {
    setError("");

    try {
      const { data } = await api.get("/favorites");
      setFavorites(normalizeFavorites(data));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't load your saved plants."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFavorite = async (plantId) => {
    if (!plantId) return;

    setRemovingId(plantId);
    setError("");

    try {
      await api.delete(`/favorites/${plantId}`);

      setFavorites((current) =>
        current.filter((item) => item.plant?.id !== plantId)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not remove this favorite."
      );
    } finally {
      setRemovingId("");
    }
  };

  return (
    <AppPage
      eyebrow="YOUR COLLECTION"
      title={
        <>
          Plants you <span className="heading-accent">love.</span>
        </>
      }
      description="Keep your most interesting plant profiles close at hand. Your saved collection is personal to your account."
    >
      {error && (
        <div className="status-banner status-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-panel">
          <span className="loading-spinner" />
          Loading your favorites…
        </div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Heart size={25} />
          </div>

          <h2>Your collection starts here</h2>
          <p>
            Save plants from the library to find their details here later.
          </p>

          <Link to="/plants" className="button-primary">
            <Leaf size={17} /> Explore plants <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <section className="plant-catalog-grid">
          {favorites.map(({ plant }) => (
            <article className="catalog-card" key={plant.id}>
              <div className="catalog-art tone-forest">
                <span className="catalog-emoji">🌿</span>
                <span className="saved-ribbon">
                  <Heart size={13} fill="currentColor" /> SAVED
                </span>
              </div>

              <div className="catalog-card-body">
                <span className="card-kicker">YOUR FAVORITE</span>
                <h2>{plant.commonName || "Plant profile"}</h2>

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
                  <Link
                    to={`/plants/${plant.id}`}
                    className="text-link"
                  >
                    View details <ArrowRight size={15} />
                  </Link>

                  <button
                    className="quiet-danger"
                    onClick={() => removeFavorite(plant.id)}
                    disabled={removingId === plant.id}
                  >
                    <Trash2 size={15} />
                    {removingId === plant.id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </AppPage>
  );
}