import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
export const ProductosContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductosProvider = ({ children }) => {
  const { handleLoading, setLoading } = useContext(AuthContext)
  const host = import.meta.env.VITE_HOST

  const [productosDisplay, setProductosDisplay] = useState(null)
  const [categorias, setCategorias] = useState(null)
  const [errorMsg, setError] = useState(null)
  const [pageSelected, setPageSelected] = useState(1) // Página por defecto
  const [cantPerPage, setCantPerPage] = useState(20) // Cantidad por defecto
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(null)
  const [categorySelected, setCategorySelected] = useState(null)
  // Función para obtener productos, incluyendo la paginación

  const getProductos = async () => {
    try {
      let url = `https://${host}/api/getProducts2`
      const params = []
      // Verificar si hay valores seleccionados para cantPerPage o pageSelected
      if (cantPerPage) params.push(`perPage=${cantPerPage}`)
      if (pageSelected) params.push(`page=${pageSelected}`)

      // Si hay parámetros, los añadimos a la URL
      if (params.length > 0) {
        url += `?${params.join('&')}`
      }
      const response = await axios.get(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      })
      setLoading(false)
      const respuestaInfo = response.data.data
      setTotalPages(respuestaInfo.lastPage);
      setCantPerPage(respuestaInfo.perPage)
      setTotal(respuestaInfo.total)
      setPageSelected(respuestaInfo.page)
      setProductosDisplay(response.data.data.data)
      return response.data

    } catch (error) {
      handleLoading()
      setError(error.message ? error.message : 'Ha habido un error al obtener los productos')
      return error
    } finally {
      handleLoading()
    }
  }

  // Función para obtener las categorías
  const getCategories = async () => {
    try {
      const response = await axios.get(`https://${host}/api/getCategories`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }
      })
      handleLoading()
      setCategorias(response.data.data)
      return response.data
    } catch (error) {
      setError(error.message ? error.message : 'Ha habido un error al obtener las categorías')
      handleLoading()
      return error
    } finally {
      handleLoading()
    }
  }


  // Llamar a las funciones al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProductos()
        await getCategories()
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [cantPerPage, pageSelected])

  return (
    <ProductosContext.Provider value={{
      getProductos, productosDisplay,
      getCategories, categorias,
      setCategorySelected, categorySelected,
      errorMsg, total, totalPages,
      pageSelected, setPageSelected,
      cantPerPage, setCantPerPage
    }}>
      {children}
    </ProductosContext.Provider>
  )
}
