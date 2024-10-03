import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";

import { ProductosProvider } from "./contexts/ProductosContext";

import { Login } from "./pages/Login";

import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <BrowserRouter>
          <Header />
          <div className=" flex min-h-screen relative">
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
                    <ProductList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ProductosProvider>
    </AuthProvider >
  );
}

export default App;
