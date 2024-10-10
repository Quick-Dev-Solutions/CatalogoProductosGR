import { Navbar } from "../Navbar";
import LogoBrand from '../../assets/brand/logo.webp';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductosContext } from "../../contexts/ProductosContext";

export const Header = () => {
    const {searchParams, setSearchParams} = useContext(ProductosContext)
    const [searchValue, setSearchValue] = useState(searchParams.get('query') || '')
    const navigate = useNavigate()
    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            const palabrasClave = encodeURIComponent(searchValue)
            setSearchParams({query: palabrasClave})
            navigate(`/productos/?query=${palabrasClave}`)
        }
    };
    if(location.pathname == '/login') {return} 
    return (
            <header className="bg-orange-400 w-[100vw] items-center md:grid flex md:grid-rows-2 md:px-32 max-h-[95px] md:py-4 shadow-2xl">
                <div className="md:grid flex justify-between border border-red-500 md:grid-cols-[auto_1fr_auto] md:items-center md:max-h-[300px]">
                    <div className="logo md:static md:items-center md:mt-6 md:grid-rows-2">
                        <Link to='/'>
                            <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="w-24" />
                        </Link>
                    </div>
                    <form className="max-w-md md:w-[600px] ml-2 mr-64" onSubmit={(e)=>handleSearch(e)}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative md:w-[600px]">
                            <input type="search" id="default-search" className="block md:w-[600px] p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-orange-300" placeholder="Busca por productos, marcas y más..." required
                                onChange={(e) => handleSearchInput(e)} />
                            <button type="submit" className="text-white absolute right-0 bottom-2.5   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2"><svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            </button>
                        </div>
                    </form>
                    <h2 className="hidden md:block font-semibold text-lg text-end pr-8 max-h-[100px]">
                        Tu seguridad, en nuestras manos..
                    </h2>
                </div>
                <Navbar />
            </header>
    );
};
