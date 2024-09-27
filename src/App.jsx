import { NavBar } from "./components/NavBar";
import { Inicio } from "./pages/Inicio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { Login } from "./pages/Login";
import PublicRoute from "./auth/PublicRoute";
import { AuthProvider } from "./auth/AuthContext";
import { GestionProvider } from "./contexts/GestionContext";
function App() {
  return (
    <AuthProvider>
      <GestionProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute >
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route
              path="/ventas"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route
              path="/proveedores"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GestionProvider>
    </AuthProvider >
  );
}

export default App;
