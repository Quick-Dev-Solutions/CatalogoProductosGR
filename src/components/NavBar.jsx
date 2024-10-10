import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';
import ArrowDown from '../assets/arrow-down.svg'
export const Navbar = () => {
    const [productsMenu, setProductsMenu] = useState(false);
    const { categorias } = useContext(ProductosContext);
    const { categoryId } = useParams();

    const toggleProducts = (e) => {
        switch (e.type){
            case "mouseon": {setProductsMenu(true);break}
            case "mouseleave": {setProductsMenu(false);break}
            case "click": {setProductsMenu(prevState => !prevState);break}
        }
        setProductsMenu(!productsMenu);
    };

    return (
        <div className="navbar md:w-[82vw] ml-24 mt-6 mb-2 relative">
            <ul className="flex flex-row gap-4 ">
               {categorias && (
                    <li className="cursor-pointer relative flex gap-1 items-center select-none " onMouseEnter={(e)=>toggleProducts(e)} onMouseLeave={(e)=>toggleProducts(e)}>
                        Categorías de productos
                        <img src={ArrowDown} alt={`Flecha ${productsMenu ? 'arriba' : 'abajo'}`} className={`size-4 ${productsMenu ? 'rotate-180' : ''} transition-transform`} />
                        <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md absolute z-10 flex flex-col top-6 border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                            {categorias.length > 0 && categorias.map((categoria, index) => (
                                <li key={index} className={`hover:bg-slate-200 py-2 uppercase px-5 transition-colors ${categoryId == categoria.id ? 'bg-blue-300 hover:bg-blue-400' : ''}`}>
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
                <li>
                    <Link to='/nosotros'>
                        Nosotros
                    </Link>
                </li>
                <li className='absolute  px-2 py-1 right-12 font-semibold text-lg underline text-white'>
                    <Link to='/login'>
                        Sos empleado?
                    </Link>
                </li>

            </ul>
        </div>
    );
};
