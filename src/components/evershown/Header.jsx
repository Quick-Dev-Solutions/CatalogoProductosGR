import { Navbar } from "../Navbar";
import LogoBrand from '../../assets/brand/logo.webp';
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
    const location = useLocation()
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
    if(location.pathname == '/login') {return} 
    return (
            <header className="bg-orange-400 items-center grid grid-rows-2 px-32 max-h-[95px] py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center max-h-[300px]">
                    <div className="logo flex items-center mt-6 grid-rows-2">
                        <Link to='/'>
                            <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="w-24" />
                        </Link>
                    </div>
                    <form className="max-w-md md:w-[600px] ml-2 mr-64" onSubmit={handleSearch}>
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
                    <h2 className=" font-semibold text-lg text-end pr-8 max-h-[100px]">
                        Tu seguridad, en nuestras manos..
                    </h2>
                </div>
                <Navbar />
            </header>
    );
};
