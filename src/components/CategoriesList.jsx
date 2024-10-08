import { useContext } from "react"
import { ProductosContext } from "../contexts/ProductosContext"
import { Link, useParams } from "react-router-dom"

export const CategoriesList = () => {
    const { categorias, categorieSelected } = useContext(ProductosContext)
    const {categoriaId} = useParams()
    return (
        <div className="max-w-[250px]">
            {categorias &&
                <ul className={` bg-white rounded-md z-10 flex flex-col top-6  border border-Almost-transparent-black shadow-lg gap-3 `}>
                    <li className="font-bold text-sm text-center uppercase pt-4">Filtro por categorías</li>
                    {categorias.length > 0 && categorias.map((categoria) => (
                        <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
                            <li className={`hover:bg-slate-200 py-2 px-5 transition-colors uppercase ${categorieSelected && categoriaId == categoria.id?'bg-blue-200 hover:bg-blue-400' : ''}`}>
                                <span style={{ cursor: 'pointer' }} >{categoria.nombre}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            }
        </div>
    )
}
