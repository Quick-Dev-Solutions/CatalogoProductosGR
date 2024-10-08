
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PROVIDERS
import { AuthProvider } from "./auth/AuthContext";
import { ProductosProvider } from "./contexts/ProductosContext";

//METODOS PARA VERIFICAR RUTAS
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";

// MENUS
import { Login } from "./pages/Login";
import { Header } from "./components/Header";

import { Inicio } from "./pages/Inicio";
import { ProductList } from "./components/ProductList";
import { ProductoDetalle } from "./components/ProductoDetalle";


function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <BrowserRouter>
          <Header />
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
                  <PublicRoute>
                    <Inicio />
                  </PublicRoute>
                }
              />
              <Route
                path="/ofertas"
                element={
                  <PublicRoute>
                    <ProductList />
                  </PublicRoute>
                }
              />
              <Route
                path="/productos"
                element={
                  <PublicRoute>
                    <ProductList />
                  </PublicRoute>
                }
              />
              <Route
                path="/query/:searchParams"
                element={
                  <PublicRoute>
                    <ProductList />
                  </PublicRoute>
                }
              />
              <Route
                path="/producto/:idProducto"
                element={
                  <PublicRoute>
                    <ProductoDetalle />
                  </PublicRoute>
                }
              />
              <Route
                path="/categoria/:categoryId"
                element={
                  <PublicRoute>
                    <ProductList />
                  </PublicRoute>
                }
              />
              {/*CREACIÓN DE PRODUCTO */}
              <Route
                path="/crearProductos"
                element={
                  <PrivateRoute>
                    <ProductoDetalle />
                  </PrivateRoute>
                }
              />
            </Routes>
        </BrowserRouter>
      </ProductosProvider>
    </AuthProvider >
  );
}

export default App;
