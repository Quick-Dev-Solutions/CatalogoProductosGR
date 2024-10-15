import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';
import ArrowDown from '../assets/arrow-down.svg';
import Menu from '../assets/menu.svg';

export const Navbar = () => {
    const [productsMenu, setProductsMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para abrir/cerrar el sidebar en móviles
    const sidebarRef = useRef(null); // Referencia al sidebar
    const { categorias } = useContext(ProductosContext);
    const { categoryId } = useParams();

    const toggleProducts = (e) => {
        switch (e.type) {
            case "mouseenter": { setProductsMenu(true); break }
            case "mouseleave": { setProductsMenu(false); break }
            case "click": { setProductsMenu(prevState => !prevState); break }
        }
    };

    // Función para manejar clics fuera del sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <div className="navbar md:w-[82vw] w-36 ml-14 sm:ml-0 flex mt-6 sm:my-0 mb-2 relative">
            {/* Botón de menú en dispositivos móviles */}
            <button
                className="md:hidden block p-2 rounded justify-end"
                onClick={() => setIsSidebarOpen(true)}
            >
                <img src={Menu} alt="Hamburger menu icon" className='size-6' />
            </button>

            {/* Fondo gris con opacidad detrás del sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-gray-700 opacity-50 z-20"></div>
            )}

            {/* Sidebar para móviles */}
            <div
                ref={sidebarRef} // Añadimos la referencia al sidebar
                className={`fixed flex items-start flex-col gap-4 pt-28 inset-y-0 right-0 bg-white w-64 p-10 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
            >
                <div className="botonparacerrar">
                    <button onClick={() => setIsSidebarOpen(false)} className='underline'>
                        Cerrar
                    </button>
                </div>
                <ul className="flex flex-col gap-4">
                    {categorias && (
                        <li
                            className="cursor-pointer gap-1 items-center select-none relative"
                            onMouseEnter={(e) => toggleProducts(e)}
                            onMouseLeave={(e) => toggleProducts(e)}
                            onClick={(e) => toggleProducts(e)}
                        >
                            <div className="container flex items-center ">
                                Categorías de productos
                                <img
                                    src={ArrowDown}
                                    alt={`Flecha ${productsMenu ? 'arriba' : 'abajo'}`}
                                    className={`size-4 ${productsMenu ? 'rotate-180' : ''} transition-transform`}
                                />
                            </div>
                            <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md z-10 absolute flex flex-col top-6 border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                                {categorias.length > 0 && categorias.map((categoria, index) => (
                                    <li
                                        key={index}
                                        className={`hover:bg-slate-200 py-2 uppercase px-5 transition-colors ${categoryId == categoria.id ? 'bg-blue-300 hover:bg-blue-400' : ''}`}
                                    >
                                        <Link to={`/categoria/${categoria.id}`}>
                                            {categoria.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                    <li>
                        <Link to="/productos/ofertas" onClick={() => setIsSidebarOpen(false)}>
                            Ofertas
                        </Link>
                    </li>
                    <li>
                        <Link to="/productos" onClick={() => setIsSidebarOpen(false)}>
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/nosotros" onClick={() => setIsSidebarOpen(false)}>
                            Nosotros
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" onClick={() => setIsSidebarOpen(false)}>
                            Sos empleado?
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Navbar para pantallas grandes */}
            <ul className="hidden md:flex flex-row gap-4">
                {categorias && (
                    <li
                        className="cursor-pointer relative flex gap-1 items-center select-none"
                        onMouseEnter={(e) => toggleProducts(e)}
                        onMouseLeave={(e) => toggleProducts(e)}
                    >
                        Categorías de productos
                        <img
                            src={ArrowDown}
                            alt={`Flecha ${productsMenu ? 'arriba' : 'abajo'}`}
                            className={`size-4 ${productsMenu ? 'rotate-180' : ''} transition-transform`}
                        />
                        <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md absolute z-10 flex flex-col top-6 border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                            {categorias.length > 0 && categorias.map((categoria, index) => (
                                <li
                                    key={index}
                                    className={`hover:bg-slate-200 py-2 uppercase px-5 transition-colors ${categoryId == categoria.id ? 'bg-blue-300 hover:bg-blue-400' : ''}`}
                                >
                                    <Link to={`/categoria/${categoria.id}`}>
                                        {categoria.nombre}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
                <li>
                    <Link to="/productos/ofertas">Ofertas</Link>
                </li>
                <li>
                    <Link to="/productos">Productos</Link>
                </li>
                <li>
                    <Link to="/nosotros">Nosotros</Link>
                </li>
                <li className="absolute px-2 py-1 right-12 font-semibold text-lg underline text-white">
                    <Link to="/login">Sos empleado?</Link>
                </li>
            </ul>
        </div>
    );
};
