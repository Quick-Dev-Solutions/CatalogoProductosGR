import { Navbar } from "../Navbar";
import LogoBrand from '../../assets/brand/logo.webp';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductosContext } from "../../contexts/ProductosContext";

export const Header = () => {
    const { searchParams, setSearchParams } = useContext(ProductosContext);
    const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            const palabrasClave = encodeURIComponent(searchValue);
            setSearchParams({ query: palabrasClave });
            navigate(`/productos/?query=${palabrasClave}`);
        }
    };

    // Evitar renderizar el Header en la página de login
    if (location.pathname === '/login') {
        return null;
    }

    return (
        <header className="bg-orange-400 items-center grid gap-x-64 sm:gap-x-0 sm:gap-0 grid-cols-3 sm:flex sm:grid-flow-row sm:flex-col md:px-32 shadow-2xl">
            {/* Logo, barra de búsqueda*/}
            <div className="flex items-center">
                {/* Logo */}
                <Link to='/'>
                    <div className="logo w-16 sm:size-16 md:flex md:items-center">
                        <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="" />
                    </div>
                </Link>

                {/* Barra de búsqueda */}
                <form className="flex-grow max-w-md w-64 sm:w-[600px] sm:mx-8" onSubmit={(e) => handleSearch(e)}>
                    <div className="relative sm:w-full w-64">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-300"
                            placeholder="Busca por productos, marcas y más..."
                            required
                            onChange={(e) => handleSearchInput(e)}
                            value={searchValue}
                        />
                        <button type="submit" className="text-white absolute right-0 top-2 bottom-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            {/* Navbar */}
            <Navbar />
        </header>
    );
};
