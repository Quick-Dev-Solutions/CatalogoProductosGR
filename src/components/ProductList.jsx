import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';
import { AuthContext } from '../auth/AuthContext';
import { ProductContainer } from './ProductContainer';
import { CategoriesList } from './CategoriesList';
import Slider from './views/Slider';

export const ProductList = () => {
    const { loading, error } = useContext(AuthContext);
    const { productosDisplay, total, pageSelected, cantPerPage, totalPages, setPageSelected, setCantPerPage, getProductosByCategory, getProductos, categorias, setCategorieSelected, categorieSelected,buscarPorPalabrasClave } = useContext(ProductosContext);
    const { categoryId, searchParams } = useParams();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                if (categoryId) {
                    await getProductosByCategory(categoryId, pageSelected);
                    setCategorieSelected(categorias?.find(categoria => categoria.id == categoryId) || {});
                } else if (searchParams) {
                    await buscarPorPalabrasClave(searchParams);
                } else {
                    await getProductos();
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
    
        fetchProductos();
    }, [categoryId, searchParams, pageSelected, cantPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPageSelected(page);
        }
    };

    const handleCantidadChange = (event) => {
        setCantPerPage(event.target.value);
    };
    const generarPaginas = () => {
        const paginas = [];
        paginas.push(1); // Primera página
        for (let i = pageSelected; i <= Math.min(pageSelected + 3, totalPages); i++) {
            if (i !== 1 && i !== totalPages) {
                paginas.push(i);
            }
        }
        if (totalPages > 1) paginas.push(totalPages); // Última página

        return paginas;
    };

    if (productosDisplay && !loading) {
        return (
            <div className="flex flex-col relative w-full">
                <Slider />
                <div className="main m-0 flex flex-row gap-12 w-full">
                    <div className="categories w-fit">
                        <CategoriesList />
                    </div>
                    <div className="body flex flex-col items-center w-full">
                        {categorieSelected.length>0 && <div className="font-bold text-2xl uppercase">CATEGORÍA {categorieSelected.nombre}</div>}
                        <div className="grid grid-flow-row gap-x-24 grid-cols-4 justify-start items-center">
                            {productosDisplay.map(producto => (
                                <ProductContainer key={producto.id} product={producto} />
                            ))}
                        </div>
                        {productosDisplay.length > 0 && <div className="my-4">
                            <label htmlFor="cantidadPorPag" className="mr-2">Productos por página:</label>
                            <select
                                id="cantidadPorPag"
                                value={cantPerPage}
                                onChange={handleCantidadChange}
                                className="p-2 border"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>}

                        {productosDisplay.length > 0 && <div className="paginacion my-4 flex flex-row justify-between w-full">
                            <p>{total} resultados</p>
                            <nav aria-label="paginacion-label">
                                <ul className="inline-flex -space-x-px text-sm">
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(pageSelected - 1)}
                                            className={`flex items-center justify-center px-3 h-8 ${pageSelected === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-500'} bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
                                            disabled={pageSelected === 1}
                                        >
                                            {'<'}
                                        </button>
                                    </li>

                                    {generarPaginas().map((page) => (
                                        <li key={page}>
                                            <button
                                                onClick={() => handlePageChange(page)}
                                                className={`flex items-center justify-center px-3 h-8 leading-tight ${pageSelected === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                    <li>
                                        <button
                                            onClick={() => handlePageChange(pageSelected + 1)}
                                            className={`flex items-center justify-center px-3 h-8 ${pageSelected === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-gray-500'} bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
                                            disabled={pageSelected === totalPages}
                                        >
                                            {'>'}
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>}
                        {productosDisplay.length <= 0 && <div className="h-full flex mt-40">NO SE HAN ENCONTRADO PRODUCTOS</div>}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-64 flex items-center text-center mx-auto bg-red-300 w-full">
                <p className='text-center flex'>Ha habido un error al obtener los productos</p>
            </div>
        );
    }
};
