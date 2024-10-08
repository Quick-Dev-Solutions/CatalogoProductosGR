import { Navbar } from "./Navbar";
import { FaSearch } from "react-icons/fa";
import LogoBrand from '../assets/brand/logo.webp';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
    const {params} = useParams()
    const [searchValue, setSearchValue] = useState(params? params:'')
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
            <header className="bg-orange-400 items-center grid grid-rows-2 max-h-[120px] py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 max-h-[100px]">
                    <Link to='/'>
                        <div className="logo flex mx-auto items-center pl-8 pr-16 max-h-[100px]">
                            <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="w-16 max-h-[100px]" />
                        </div>
                    </Link>
                    <div className="buscador flex ml-32 w-[800px] pl-16 max-h-[100px]">
                        <form className="bg-gray-200 h-12 flex relative w-[800px] max-h-[100px] shadow-2xl" onSubmit={(e)=>e.preventDefault()} >
                            <input
                                type="text"
                                placeholder="Buscar productos o marcas"
                                className="bg-gray-200 text-black w-[800px] p-1 max-h-[100px]"
                                onChange={handleSearchInput}
                                value={searchValue}
                            />
                            <button className="text-black right-2 top-4 absolute max-h-[100px]" onClick={(e)=>handleSearch(e)}>
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                    <div className="logged text-end w-24 pr-4 max-h-[100px]">
                        ¿Sos Empleado? Click acá
                    </div>
                </div>
                <div className="max-h-[100px]">
                    <Navbar />
                </div>
            </header>
        </div>
    );
};
