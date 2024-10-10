
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {ScrollToTop} from './components/views/ScrollToTop'
//PROVIDERS
import { AuthProvider } from "./auth/AuthContext";
import { ProductosProvider } from "./contexts/ProductosContext";

//METODOS PARA VERIFICAR RUTAS
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";

// MENUS
import { Login } from "./pages/Login";
import { Header } from "./components/evershown/Header";

import { Inicio } from "./pages/Inicio";
import { ProductList } from "./components/ProductList";
import { ProductoDetalle } from "./components/ProductoDetalle";
import { Footer } from "./components/evershown/Footer";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <div className="app-container ">
            {/* <ScrollToTop/> */}
            <Header />
            <div className="main-content">

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
            </div>
            <Footer />
          </div>
        </ProductosProvider>
      </AuthProvider >
    </BrowserRouter>
  );
}

export default App;
