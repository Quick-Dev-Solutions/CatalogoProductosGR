import { useContext } from "react"
import { ProductosContext } from "../contexts/ProductosContext"

export const CategoriesList = () => {
    const { categorias } = useContext(ProductosContext)
    return (
        <div>
            {categorias &&
                <ul className={` bg-white rounded-md z-10 flex flex-col top-6  border border-Almost-transparent-black shadow-lg gap-3 `}>
                    <li className="font-bold text-sm text-center uppercase pt-4">Filtro por categorías</li>
                    {categorias.length > 0 && categorias.map((categoria) => (
                        <li key={categoria.id} className='hover:bg-slate-200 py-2 px-5 transition-colors uppercase'>
                            <span style={{ cursor: 'pointer' }} >{categoria.nombre}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
