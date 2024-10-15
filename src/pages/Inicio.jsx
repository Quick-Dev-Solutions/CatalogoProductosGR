import { useContext, useEffect, useState } from "react"
import Slider from "../components/views/Slider"
import { ProductosContext } from "../contexts/ProductosContext"
import { ProductContainer } from "../components/ProductContainer"
import { Link } from "react-router-dom"

export const Inicio = () => {
  const { getOfertas, categorias, getCategories } = useContext(ProductosContext)
  const [ofertas, setOfertas] = useState([])
  useEffect(() => {
    getCategories()
    const fetchOfertas = async () => {
      try {
        const response = await getOfertas()
        // Tomar las primeras 3 ofertas o todas si hay menos de 3
        let limitedOfertas = response.data.slice(0, Math.min(response.data.length, 3));
        setOfertas(limitedOfertas);
      } catch (error) {
        throw new Error({ message: 'Error al buscar productos:', error })
      } 
    }
    fetchOfertas()
  }, [])

  return (
    <div className="sm:flex md:mt-4 sm:mx-auto sm:flex-col">
      <div className="ofertas-slider lg:justify-between flex flex-col mx-auto lg:mx-0 gap-4 justify-center lg:flex-row ">
        <section className="ofertas md:ml-4 sm:w-screen select-none">
          <div className="info-ofertas flex items-center gap-1">
            <h2 className="font-bold text-xl">Conocé nuestras ofertas</h2>
            <Link to='/productos/ofertas' className="text-blue-400 text-sm hover:text-blue-700">Conocé mas</Link>
          </div>
          <div className="contenedor-Ofertas grid grid-cols-3 md:flex md:flex-row column gap-4 sm:w-[40vw] sm:justify-between h-fit">
            {ofertas.length > 0 && ofertas.map((oferta) => (
                <ProductContainer product={oferta} key={oferta.id}/>

            ))}
            {
              ofertas.length <= 0 &&
              <div className="h-[50%] flex items-center text-2xl">
                <p>No se han podido encontrar ofertas!</p>
              </div>
            }
          </div>
        </section>
        <section className="md:mr-6">
          <Slider />
        </section>
      </div>
      <section className="categorias w-[90vw] md:mx-auto md:mb-8 select-none">
        <h2 className="font-bold text-xl my-4">Encontrá en nuestras categorias</h2>
        <ul className="grid grid-cols-2 md:grid-cols-5 md:gap-4">
          {categorias && categorias.map(categoria => (
            <Link to={`/categoria/${categoria.id}`} key={categoria.id}>
              <li key={categoria.id} className="shadow-md w-full text-center uppercase transition-all hover:scale-105 p-1">
                {categoria.nombre}
              </li>
            </Link>
          ))}
          {
            ofertas.length <= 0 &&
            <li className="h-[50%] flex items-center w-96">
              <p>No se han podido encontrar categorías!</p>
            </li>
          }
        </ul>
      </section>
    </div>
  )
}
