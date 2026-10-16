import Navbar from "./Navbar";

export default function AppPage({
  eyebrow = "AYURSCAN WORKSPACE",
  title,
  description,
  actions,
  children,
}) {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="content-page">
        {(title || description || actions) && (
          <header className="content-page-heading">
            <div>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
            </div>

            {actions && (
              <div className="content-heading-actions">
                {actions}
              </div>
            )}
          </header>
        )}

        {children}

        <footer className="content-footer">
          <span>© {new Date().getFullYear()} AyurScan</span>
          <span>Explore plant knowledge responsibly.</span>
        </footer>
      </main>
    </div>
  );
}