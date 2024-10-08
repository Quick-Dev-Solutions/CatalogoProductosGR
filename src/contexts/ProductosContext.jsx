import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useParams } from "react-router-dom";

export const ProductosContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductosProvider = ({ children }) => {
  const { handleLoading, setLoading } = useContext(AuthContext);
  const host = import.meta.env.VITE_HOST;

  const [productosDisplay, setProductosDisplay] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [errorMsg, setError] = useState(null);
  const [pageSelected, setPageSelected] = useState(1); // Página por defecto
  const [cantPerPage, setCantPerPage] = useState(20); // Cantidad por defecto
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(null);
  const { searchParams } = useParams()
  // Función para obtener productos, incluyendo la paginación
  const getProductosDetalles = async (idProducto) => {
    try {
      const response = await axios.get(`https://${host}/api/getProductById/${idProducto}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      return response.data; // Devolver los datos correctamente
    } catch (error) {
      console.error(error);
      return null; // Puedes manejar el error devolviendo un valor por defecto o null
    }
  };
  

  const getOfertas = async () => {
    try {
      let url = `https://${host}/api/getOfertas`;
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });

      setLoading(false);
      const respuestaInfo = response.data.data;
      setTotal(respuestaInfo.length);
      setProductosDisplay(respuestaInfo);
      return response.data;
    } catch (error) {
      handleLoading();
      console.error(error.message ? error.message : 'Ha habido un error al obtener los productos');
      return error;
    } finally {
      handleLoading();
    }
  }

  const getProductos = async () => {
    try {
      let url = `https://${host}/api/getProducts2`;
      const params = [];

      if (cantPerPage) params.push(`perPage=${cantPerPage}`);
      if (pageSelected) params.push(`page=${pageSelected}`);

      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });

      setLoading(false);
      const respuestaInfo = response.data.data;
      setTotalPages(respuestaInfo.lastPage);
      setCantPerPage(respuestaInfo.perPage);
      setTotal(respuestaInfo.total);
      setPageSelected(respuestaInfo.page);
      setProductosDisplay(response.data.data.data);

      return response.data;

    } catch (error) {
      handleLoading();
      console.error(error.message ? error.message : 'Ha habido un error al obtener los productos');
      return error;
    } finally {
      handleLoading();
    }
  }

  // Función para obtener las categorías
  const getCategories = async () => {
    try {
      const response = await axios.get(`https://${host}/api/getCategories`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      handleLoading();
      setCategorias(response.data.data);
      return response.data;
    } catch (error) {
      console.error(error.message ? error.message : 'Ha habido un error al obtener las categorías');
      handleLoading();
      return error;
    } finally {
      handleLoading();
    }
  }

  // Función para obtener productos por categoría
  const getProductosByCategory = async (categoryId, page = 1) => {
    try {
      const params = new URLSearchParams({
        categoryId,
        perPage: cantPerPage, // O puedes establecer otro valor
        page,
      });

      handleLoading()
      const url = `https://${host}/api/getProductsByCategory?${params.toString()}`;
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });

      setProductosDisplay(response.data.data.data); // Actualiza el estado con los productos obtenidos
      setTotalPages(response.data.data.lastPage); // Actualiza las páginas totales
      setTotal(response.data.data.total); // Actualiza el total de productos
      setPageSelected(response.data.data.page); // Actualiza la página seleccionada
      handleLoading()
      return response.data;

    } catch (error) {
      setError(error.message ? error.message : 'Ha habido un error al obtener los productos por categoría');
      return error;
    }
  }

  const buscarPorPalabrasClave = async (params) => {
    try {
      handleLoading()
      // Comienza construyendo la URL base
      let url = `https://${host}/api/search?query=${params}`;
      // Agregar otros parámetros de búsqueda
      const parametros = [];
      if (cantPerPage) parametros.push(`perPage=${cantPerPage}`);
      if (pageSelected) parametros.push(`page=${pageSelected}`);

      // Si hay parámetros adicionales, se añaden a la URL
      if (parametros.length > 0) {
        url += `&${parametros.join('&')}`; // Cambiar '?' por '&' para añadir parámetros adicionales
      }

      // Realizar la solicitud
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });

      // Procesar la respuesta
      handleLoading()
      const respuestaInfo = response.data.data;
      // Actualizar los estados según la respuesta
      setTotalPages(respuestaInfo.lastPage);
      setCantPerPage(respuestaInfo.perPage);
      setTotal(respuestaInfo.total);
      setPageSelected(respuestaInfo.page);
      setProductosDisplay(respuestaInfo.data); // Asegúrate de acceder correctamente a los datos

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // Llamar a las funciones al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchParams) { await buscarPorPalabrasClave(searchParams) }
        await getProductos();
        await getCategories();
      } catch (error) {
        return error
      }
    }
    fetchData();
  }, []);

  return (
    <ProductosContext.Provider value={{
      getProductos, productosDisplay,
      getCategories, categorias,
      getProductosByCategory, // Añade esta línea para exponer la función
      errorMsg, total, totalPages,
      pageSelected, setPageSelected,
      cantPerPage, setCantPerPage,
      buscarPorPalabrasClave, getOfertas,
      getProductosDetalles
    }}>
      {children}
    </ProductosContext.Provider>
  );
}
