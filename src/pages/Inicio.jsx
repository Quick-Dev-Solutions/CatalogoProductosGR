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
        console.log({ limitedOfertas });
        setOfertas(limitedOfertas);
      } catch (error) {
        console.error(error)
      }
    }
    fetchOfertas()
  }, [])

  return (
    <div className="flex mt-4 flex-col">
      <div className="ofertas-slider justify-between items-center mx-24 mb-12 flex row">
        <section className="ofertas ml-4 h-[50vh] select-none">
          <div className="info-ofertas flex items-center gap-4">
            <h2 className="font-bold text-xl ">Conocé nuestras ofertas</h2>
            <Link to='/ofertas' className="text-blue-400 text-sm hover:text-blue-700">Conocé mas</Link>
          </div>
          <div className="contenedor-Ofertas flex flex-row gap-48 h-full">
            {ofertas.length > 0 && ofertas.map(oferta => (
              <div className="size-32" key={oferta.id} >
                <ProductContainer product={oferta} />
              </div>
            ))}
          </div >
        </section>
        <section>
          <Slider />
        </section>
      </div>
      <section className="categorias mx-8 mb-8 select-none">
        <h2 className="font-bold text-xl my-4">Encontrá en nuestras categorias</h2>
        <ul className="grid grid-cols-5 gap-4 uppercase">
          {categorias && categorias.map(categoria => (
            <li key={categoria.id} className="shadow-md w-full text-center transition-all hover:scale-105 p-1">
              <Link to={`/categoria/${categoria.id}`}>
                {categoria.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
