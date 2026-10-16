import {
  Home,
  Leaf,
  ScanLine,
  History,
  Heart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Plants",
      path: "/plants",
      icon: Leaf,
    },
    {
      name: "Identify",
      path: "/predict",
      icon: ScanLine,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: Heart,
    },
  ];

  return (
    <>
      <header className="app-navbar">

        <NavLink
          to="/dashboard"
          className="app-brand"
        >
          <div className="app-brand-icon">
            <Leaf size={22} />
          </div>

          <div>
            <strong>AyurScan</strong>
            <span>Plant Intelligence</span>
          </div>
        </NavLink>

        <nav className="desktop-nav">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={17} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          className="nav-logout"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Logout
        </button>

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </header>

      {mobileOpen && (
        <div className="mobile-nav">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}

          <button
            className="mobile-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;