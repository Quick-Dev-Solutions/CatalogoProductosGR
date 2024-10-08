import { Navbar } from "./Navbar";
import { FaSearch } from "react-icons/fa";
import LogoBrand from '../assets/brand/logo.webp';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
    const { params } = useParams()
    const [searchValue, setSearchValue] = useState(params ? params : '')
    const navigate = useNavigate()
    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/query/${encodeURIComponent(searchValue)}`);
        }
    };
    return (
        <div>
            <header className="bg-orange-400 items-center grid grid-rows-2 max-h-[95px] py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center max-h-[300px]">
                    <div className="logo flex items-center mt-6 h-fit w-fit grid-rows-2">
                        <Link to='/'>
                            <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="w-24" />
                        </Link>
                    </div>
                    <form className="max-w-md md:w-[800px] ml-32" onSubmit={handleSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative md:w-[800px]">
                            <input type="search" id="default-search" className="block md:w-[800px] p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-orange-300" placeholder="Busca por productos, marcas y más..." required
                                onChange={(e) => handleSearchInput(e)} />
                            <button type="submit" className="text-white absolute right-2 bottom-2.5   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2"><svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            </button>
                        </div>
                    </form>
                    <Link to='/login' className="logged text-end w-fit pr-4 max-h-[100px]">
                        ¿Sos Empleado? Click acá
                    </Link>
                </div>
                <Navbar />
            </header>
        </div>
    );
};
