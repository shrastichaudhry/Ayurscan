import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Heart,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const plants = [
  {
    name: "Aloe Vera",
    scientific: "Aloe barbadensis",
    icon: "🌿",
    tone: "green",
  },
  {
    name: "Amla",
    scientific: "Phyllanthus emblica",
    icon: "🍃",
    tone: "lime",
  },
  {
    name: "Moringa",
    scientific: "Moringa oleifera",
    icon: "🌱",
    tone: "emerald",
  },
  {
    name: "Tulsi",
    scientific: "Ocimum tenuiflorum",
    icon: "🌿",
    tone: "sage",
  },
  {
    name: "Turmeric",
    scientific: "Curcuma longa",
    icon: "🟡",
    tone: "gold",
  },
];

const Dashboard = () => {
  return (
    <div className="app-shell">

      <Navbar />

      <main className="dashboard-main">

        {/* TOP HEADER */}

        <section className="dashboard-heading">

          <div>
            <span className="eyebrow">
              AYURSCAN INTELLIGENCE
            </span>

            <h1>
              Discover the intelligence
              <br />
              <span>inside every plant.</span>
            </h1>

            <p>
              Identify medicinal plants with AI and
              explore their traditional Ayurvedic
              knowledge in one place.
            </p>
          </div>

          <div className="heading-status">
            <span className="status-dot" />
            AI system online
          </div>

        </section>

        {/* MAIN SCAN CARD */}

        <section className="scan-dashboard-card">

          <div className="scan-card-content">

            <div className="scan-icon-large">
              <ScanLine size={30} />
            </div>

            <span className="scan-label">
              AI PLANT IDENTIFICATION
            </span>

            <h2>
              What plant are you
              <br />
              curious about?
            </h2>

            <p>
              Upload a clear plant image or use your
              camera. AyurScan will analyze it and
              provide medicinal information.
            </p>

            <div className="scan-actions">

              <Link
                to="/predict"
                className="primary-action"
              >
                <Camera size={18} />
                Scan with Camera
              </Link>

              <Link
                to="/predict"
                className="secondary-action"
              >
                <Upload size={18} />
                Upload Image
              </Link>

            </div>

            <div className="scan-trust">

              <div>
                <CheckCircle2 size={15} />
                5 supported plants
              </div>

              <div>
                <ShieldCheck size={15} />
                Unknown plant protection
              </div>

            </div>

          </div>

          <div className="scan-visual">

            <div className="scan-visual-circle">
              <Leaf size={105} strokeWidth={1.2} />
            </div>

            <div className="scan-floating-card top">
              <Sparkles size={17} />
              <div>
                <strong>AI Powered</strong>
                <span>Computer vision</span>
              </div>
            </div>

            <div className="scan-floating-card bottom">
              <ShieldCheck size={17} />
              <div>
                <strong>Safe Detection</strong>
                <span>Confidence aware</span>
              </div>
            </div>

          </div>

        </section>

        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-box">
            <div className="stat-box-icon green">
              <Leaf size={20} />
            </div>

            <div>
              <strong>05</strong>
              <span>Supported Plants</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon blue">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>AI</strong>
              <span>Plant Recognition</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon gold">
              <Heart size={20} />
            </div>

            <div>
              <strong>25+</strong>
              <span>Medicinal Uses</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon purple">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>24/7</strong>
              <span>AI Availability</span>
            </div>
          </div>

        </section>

        {/* PLANT LIBRARY */}

        <section className="dashboard-section">

          <div className="section-top">

            <div>
              <span className="eyebrow">
                PLANT LIBRARY
              </span>

              <h2>Explore medicinal plants</h2>

              <p>
                Learn about the plants currently
                supported by AyurScan.
              </p>
            </div>

            <Link
              to="/plants"
              className="section-link"
            >
              View all
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="plant-library-grid">

            {plants.map((plant) => (
              <Link
                to="/plants"
                className="library-card"
                key={plant.name}
              >

                <div
                  className={`library-image ${plant.tone}`}
                >
                  <span>{plant.icon}</span>
                </div>

                <div className="library-info">

                  <h3>{plant.name}</h3>

                  <p>{plant.scientific}</p>

                  <span className="learn-more">
                    Explore
                    <ArrowRight size={14} />
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="dashboard-section">

          <div className="section-top">

            <div>
              <span className="eyebrow">
                YOUR SPACE
              </span>

              <h2>Everything in one place</h2>
            </div>

          </div>

          <div className="dashboard-actions-grid">

            <Link
              to="/history"
              className="dashboard-action-card"
            >
              <div className="action-card-icon">
                <Clock3 size={22} />
              </div>

              <div>
                <h3>Prediction History</h3>
                <p>
                  Review your previous plant
                  identifications.
                </p>
              </div>

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/favorites"
              className="dashboard-action-card"
            >
              <div className="action-card-icon heart">
                <Heart size={22} />
              </div>

              <div>
                <h3>Saved Favorites</h3>
                <p>
                  Keep your important plants
                  close at hand.
                </p>
              </div>

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>

      </main>

      <footer className="app-footer">

        <div>
          <strong>
            <Leaf size={16} />
            AyurScan
          </strong>

          <span>
            AI-powered medicinal plant intelligence
          </span>
        </div>

        <p>
          Traditional Ayurvedic information • AI
          identification
        </p>

      </footer>

    </div>
  );
};

export default Dashboard;