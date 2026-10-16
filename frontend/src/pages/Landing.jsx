import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Heart,
  Leaf,
  Menu,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-page">

      {/* NAVBAR */}

      <header className="landing-navbar">

        <Link
          to="/"
          className="landing-logo"
        >
          <div className="landing-logo-icon">
            <Leaf size={22} />
          </div>

          <div>
            <strong>AyurScan</strong>
            <span>Plant Intelligence</span>
          </div>
        </Link>

        <nav className="landing-nav">

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#plants">
            Plants
          </a>

          <a href="#about">
            About
          </a>

        </nav>

        <div className="landing-nav-actions">

          <Link
            to="/login"
            className="landing-login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="landing-get-started"
          >
            Get Started
            <ArrowRight size={15} />
          </Link>

        </div>

        <button
          className="landing-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </header>

      {menuOpen && (
        <div className="landing-mobile-menu">

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#plants">
            Plants
          </a>

          <a href="#about">
            About
          </a>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="mobile-start"
          >
            Get Started
          </Link>

        </div>
      )}

      {/* HERO */}

      <main>

        <section className="landing-hero">

          <div className="landing-hero-content">

            <div className="landing-badge">
              <Sparkles size={14} />
              AI-POWERED MEDICINAL PLANT INTELLIGENCE
            </div>

            <h1>
              Identify plants.
              <br />

              <span>Discover their wisdom.</span>
            </h1>

            <p>
              AyurScan uses computer vision and AI to
              identify medicinal plants and help you
              explore their traditional Ayurvedic uses,
              plant parts and precautions.
            </p>

            <div className="landing-hero-buttons">

              <Link
                to="/predict"
                className="landing-primary"
              >
                <ScanLine size={19} />
                Identify a Plant
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/plants"
                className="landing-secondary"
              >
                <Leaf size={18} />
                Explore Plants
              </Link>

            </div>

            <div className="landing-trust">

              <div>
                <CheckCircle2 size={16} />
                5 medicinal plants
              </div>

              <div>
                <ShieldCheck size={16} />
                Confidence-aware AI
              </div>

              <div>
                <Heart size={16} />
                Traditional knowledge
              </div>

            </div>

          </div>

          {/* HERO VISUAL */}

          <div className="landing-hero-visual">

            <div className="hero-plant-background">

              <div className="hero-glow" />

              <div className="hero-plant-circle">
                <Leaf
                  size={150}
                  strokeWidth={1}
                />
              </div>

            </div>

            <div className="hero-floating-card card-ai">

              <div className="floating-icon green-icon">
                <Sparkles size={17} />
              </div>

              <div>
                <strong>AI Recognition</strong>
                <span>Computer vision</span>
              </div>

            </div>

            <div className="hero-floating-card card-safe">

              <div className="floating-icon blue-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <strong>Safe Detection</strong>
                <span>Unknown plant protection</span>
              </div>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section className="landing-stats">

          <div>
            <strong>05</strong>
            <span>Supported Plants</span>
          </div>

          <div>
            <strong>25+</strong>
            <span>Medicinal Uses</span>
          </div>

          <div>
            <strong>AI</strong>
            <span>Plant Recognition</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Available Intelligence</span>
          </div>

        </section>

        {/* HOW IT WORKS */}

        <section
          id="how-it-works"
          className="landing-section"
        >

          <div className="landing-section-heading">

            <span>HOW IT WORKS</span>

            <h2>
              From plant image
              <br />
              to useful knowledge.
            </h2>

            <p>
              AyurScan keeps plant identification simple.
              Capture an image, let AI analyze it and
              explore the information.
            </p>

          </div>

          <div className="steps-grid">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                <Camera size={23} />
              </div>

              <h3>Capture</h3>

              <p>
                Take a clear picture using your camera
                or upload an existing plant image.
              </p>

            </div>

            <div className="step-card featured-step">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                <Sparkles size={23} />
              </div>

              <h3>Analyze</h3>

              <p>
                Our computer vision model analyzes the
                image and predicts the plant class.
              </p>

            </div>

            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                <Leaf size={23} />
              </div>

              <h3>Discover</h3>

              <p>
                Explore traditional uses, plant parts
                and important precautions.
              </p>

            </div>

          </div>

        </section>

        {/* PLANTS */}

        <section
          id="plants"
          className="landing-section plants-section"
        >

          <div className="landing-section-heading split-heading">

            <div>
              <span>SUPPORTED PLANTS</span>

              <h2>
                Explore the AyurScan
                <br />
                plant collection.
              </h2>
            </div>

            <Link
              to="/plants"
              className="view-plants"
            >
              View all plants
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="landing-plants-grid">

            <PlantCard
              name="Aloe Vera"
              scientific="Aloe barbadensis"
              icon="🌿"
              tone="green"
            />

            <PlantCard
              name="Amla"
              scientific="Phyllanthus emblica"
              icon="🍃"
              tone="lime"
            />

            <PlantCard
              name="Moringa"
              scientific="Moringa oleifera"
              icon="🌱"
              tone="emerald"
            />

            <PlantCard
              name="Tulsi"
              scientific="Ocimum tenuiflorum"
              icon="🌿"
              tone="sage"
            />

            <PlantCard
              name="Turmeric"
              scientific="Curcuma longa"
              icon="🟡"
              tone="gold"
            />

          </div>

        </section>

        {/* CTA */}

        <section
          id="about"
          className="landing-cta"
        >

          <div>

            <span>
              READY TO EXPLORE?
            </span>

            <h2>
              Discover the plant
              <br />
              around you.
            </h2>

            <p>
              Start with a photo and let AyurScan
              guide you through traditional plant knowledge.
            </p>

          </div>

          <Link
            to="/predict"
            className="cta-button"
          >
            <ScanLine size={19} />
            Start Identifying
            <ArrowRight size={17} />
          </Link>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="landing-footer">

        <div className="footer-brand">

          <div className="landing-logo-icon">
            <Leaf size={19} />
          </div>

          <div>
            <strong>AyurScan</strong>
            <span>
              AI-powered plant intelligence
            </span>
          </div>

        </div>

        <p>
          Traditional Ayurvedic information • AI
          identification
        </p>

      </footer>

    </div>
  );
};

const PlantCard = ({
  name,
  scientific,
  icon,
  tone,
}) => {
  return (
    <Link
      to="/plants"
      className="landing-plant-card"
    >

      <div
        className={`landing-plant-image ${tone}`}
      >
        <span>{icon}</span>
      </div>

      <div className="landing-plant-info">

        <h3>{name}</h3>

        <p>{scientific}</p>

        <span>
          Explore
          <ArrowRight size={13} />
        </span>

      </div>

    </Link>
  );
};

export default Landing;