import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';

export const Navbar = () => {
    const [productsMenu, setProductsMenu] = useState(false);
    const { categorias, setCategorySelected } = useContext(ProductosContext)

    const toggleProducts = () => {
        setProductsMenu(!productsMenu);
    };


    const filtroPorCategoria = async (categoryId) => {
        try {
            console.log(categoryId)
            setCategorySelected(categoryId)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="navbar uppercase w-full">
            <ul className="flex flex-row gap-4 mt-4 w-full justify-center text-center mr-24">
                {categorias && 
                <li onClick={toggleProducts} className="cursor-pointer relative flex gap-4 select-none">
                    categorias de productos
                    <ul className={`${productsMenu ? 'block' : 'hidden'} bg-white rounded-md absolute z-10 flex flex-col top-6  border border-Almost-transparent-black shadow-lg gap-3 overflow-y-auto max-h-[70vh]`}>
                        <li className='hover:bg-slate-200 py-2 px-5 transition-colors'>
                            <Link to='/categories'>todos</Link>
                        </li>
                        {categorias.length > 0 && categorias.map((categoria) => (
                            <li key={categoria.id} className='hover:bg-slate-200 py-2 px-5 transition-colors'>
                                <span onClick={() => filtroPorCategoria(categoria.id)} style={{ cursor: 'pointer' }} >{categoria.nombre}</span>
                            </li>
                        ))}
                    </ul>
                </li>
                }
                <li>Ofertas</li>
                <li>Productos</li>
            </ul>
        </div>
    );
}
