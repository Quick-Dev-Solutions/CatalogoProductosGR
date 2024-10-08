import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';

export const Navbar = () => {
    const [productsMenu, setProductsMenu] = useState(false);
    const { categorias } = useContext(ProductosContext);
    const { categoryId } = useParams();

    const toggleProducts = () => {
        setProductsMenu(!productsMenu);
    };

    return (
        <div className="navbar w-fit mx-auto mt-6 justify-center text-center">
            <ul className="flex flex-row gap-4 mx-auto justify-center text-center font-light">
                {categorias && (
                    <li onClick={toggleProducts} className="cursor-pointer relative flex gap-4 select-none">
                        Categorías de productos
                        <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md absolute z-10 flex flex-col top-6 border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                            {categorias.length > 0 && categorias.map((categoria) => (
                                <li key={categoria.id} className={`hover:bg-slate-200 py-2 uppercase px-5 transition-colors ${categoryId == categoria.id ? 'bg-blue-300 hover:bg-blue-400' : ''}`}>
                                    <Link to={`/categoria/${categoria.id}`}>{categoria.nombre}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
                <li>
                    <Link to={'/ofertas'}>
                        Ofertas
                    </Link>
                </li>
                <li>
                    <Link to='/productos'>
                        Productos
                    </Link>
                </li>
            </ul>
        </div>
    );
};
