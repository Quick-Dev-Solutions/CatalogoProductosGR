import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Para redirigir al hacer clic en una categoría
import { ProductosContext } from '../contexts/ProductosContext';

export const Navbar = () => {
    const [productsMenu, setProductsMenu] = useState(false);
    const { categorias } = useContext(ProductosContext);
    const {categoryId} = useParams()
    const toggleProducts = () => {
        setProductsMenu(!productsMenu);
    };

    return (
        <div className="navbar uppercase w-full">
            <ul className="flex flex-row gap-4 mt-4 w-full justify-center text-center mr-24">
                {categorias && (
                    <li onClick={toggleProducts} className="cursor-pointer relative flex gap-4 select-none">
                        Categorías de productos
                        <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md absolute z-10 flex flex-col top-6 border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                            <li className='hover:bg-slate-200 py-2 px-5 transition-colors'>
                                <Link to="/">Todos</Link>
                            </li>
                            {categorias.length > 0 && categorias.map((categoria) => (
                                <li key={categoria.id} className={`hover:bg-slate-200 py-2 px-5 transition-colors ${categoryId == categoria.id? 'bg-blue-300 hover:bg-blue-400' :''}`}>
                                    <Link to={`/categoria/${categoria.id}`}>{categoria.nombre}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
                <li>Ofertas</li>
                <li>Productos</li>
            </ul>
        </div>
    );
};
