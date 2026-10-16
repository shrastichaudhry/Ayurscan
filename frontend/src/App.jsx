import "./index.css";

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import PlantDetails from "./pages/PlantDetails";
import Predict from "./pages/Predict";
import PredictionHistory from "./pages/PredictionHistory";
import Favorites from "./pages/Favorites";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* PROTECTED */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plants"
        element={
          <ProtectedRoute>
            <Plants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plants/:id"
        element={
          <ProtectedRoute>
            <PlantDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/predict"
        element={
          <ProtectedRoute>
            <Predict />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <PredictionHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}

      <Route
        path="*"
        element={<Landing />}
      />

    </Routes>
  );
}

export default App;