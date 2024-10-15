import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useSearchParams } from "react-router-dom";

export const ProductosContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductosProvider = ({ children }) => {
  const { setLoading } = useContext(AuthContext);
  const host = import.meta.env.VITE_HOST;
  const [searchParams, setSearchParams] = useSearchParams()

  const [productosDisplay, setProductosDisplay] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [errorMsg, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(null);
  const pageSelected = searchParams.get('page') || 1
  const cantPerPage = useState(searchParams.get('cantPerPage')? searchParams.get('cantPerPage') : 20)
  let isOfertas = searchParams.get('ofertas') || false
  const getProductosDetalles = async (idProducto) => {
    try {
      const response = await axios.get(`https://${host}/api/getProductById/${idProducto}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      return response.data; // Devolver los datos correctamente
    } catch (error) {
      throw new Error({message:'Error al buscar productos:', error})
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

      const respuestaInfo = response.data.data;
      setTotal(respuestaInfo.length);
      setProductosDisplay(respuestaInfo);
      return response.data;
    } catch (error) {
      throw new Error({message:'Error al buscar productos:', error})
    }
  }

  const getProductos = async () => {
    try {
      let url = `https://${host}/api/getProducts2`;
      const params = [];
      const cantPerPage = searchParams.get('cantPerPage') || 20
      const page = searchParams.get('page') || 1
      if (cantPerPage) params.push(`perPage=${cantPerPage}`);
      if (page) params.push(`page=${page}`);
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      
      const respuestaInfo = response.data.data;
      setTotalPages(respuestaInfo.lastPage);
      setTotal(respuestaInfo.total);
      setProductosDisplay(response.data.data.data);
    } catch (error) {
      throw new Error({message:'Error al buscar productos:', error})
    }
  };

  // Función para obtener las categorías
  const getCategories = async () => {
    try {
      const response = await axios.get(`https://${host}/api/getCategories`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      setCategorias(response.data.data);
      return response.data;
    } catch (error) {
      throw new Error({message:'Error al buscar productos:', error})
    }
  }

  // Función para obtener productos por categoría
  const getProductosByCategory = async (categoryId, page = 1) => {
    try {
      // setLoading(true)
      setProductosDisplay([])
      const params = new URLSearchParams({
        categoryId,
        perPage: cantPerPage, // O puedes establecer otro valor
        page,
      });
      
      const url = `https://${host}/api/getProductsByCategory?${params.toString()}`;
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      });
      
      setProductosDisplay(response.data.data.data); // Actualiza el estado con los productos obtenidos
      setTotalPages(response.data.data.lastPage); // Actualiza las páginas totales
      setTotal(response.data.data.total); // Actualiza el total de productos
      setLoading(false)
      return response.data;

    } catch (error) {
      setError(error.message ? error.message : 'Ha habido un error al obtener los productos por categoría');
      return error;
    }finally{
      setLoading(false)
    }
  }

  const buscarPorPalabrasClave = async (palabraBusqueda) => {
    try {
      // Comienza construyendo la URL base
      const palabraBuscada = palabraBusqueda || searchParams.get('query');
      // Verifica que haya una palabra de búsqueda
      if (!palabraBuscada) {
        console.warn('No hay palabra de búsqueda.');
        return;
      }

      let url = `https://${host}/api/search?query=${palabraBuscada}`;
      const parametros = [];

      // Agregar otros parámetros de búsqueda
      const cantPerPage = searchParams.get('cantPerPage') || 20;
      const page = searchParams.get('page') || 1;

      if (cantPerPage) parametros.push(`perPage=${cantPerPage}`);
      if (page) parametros.push(`page=${page}`);

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
      const respuestaInfo = response.data.data;

      setTotalPages(respuestaInfo.lastPage);
      setTotal(respuestaInfo.total);
      setProductosDisplay(respuestaInfo.data);

      return response.data;
    } catch (error) {
      throw new Error({message:'Error al buscar productos:', error})
    }
  };


  // Llamar a las funciones al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        setLoading(true)
        if(isOfertas) {await getOfertas()}
        if (searchParams) { await buscarPorPalabrasClave(searchParams) }
        await getProductos();
        await getCategories();
      } catch (error) {
        return error
      }finally{
        setLoading(false)
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
      buscarPorPalabrasClave, getOfertas,
      getProductosDetalles,
      setSearchParams, searchParams, pageSelected,cantPerPage
    }}>
      {children}
    </ProductosContext.Provider>
  );
}
