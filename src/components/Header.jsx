import Slider from "./Slider";
import { Navbar } from "./Navbar";
import { FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";
import LogoBrand from '../assets/brand/logo.webp';

export const Header = () => {

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div>
            <header className="bg-orange-400 items-center grid grid-rows-2 max-h-[120px] py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 max-h-[100px]">
                    <div className="logo flex mx-auto items-center pl-8 pr-16 max-h-[100px]">
                        <img src={LogoBrand} alt="Imagen Logo GR Lllaves" className="w-16 max-h-[100px]" />
                    </div>
                    <div className="buscador flex ml-32 w-[800px] pl-16 max-h-[100px]">
                        <div className="bg-gray-200 h-12 flex relative w-[800px] max-h-[100px] shadow-2xl">
                            <input
                                type="text"
                                placeholder="Buscar productos o marcas"
                                className="bg-gray-200 text-black w-[800px] p-1 max-h-[100px]"
                                onChange={handleSearchInput}
                            />
                            <button className="text-black right-2 top-4 absolute max-h-[100px]">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                    <div className="logged text-end w-24 pr-4 max-h-[100px]">
                        ¿Sos Empleado? Click acá
                    </div>
                </div>
                <div className="max-h-[100px]">
                    <Navbar />
                </div>
            </header>

            <div className="ofertas items-center">
                <Slider />
            </div>
        </div>
    );
};
