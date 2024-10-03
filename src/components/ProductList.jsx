import { useParams } from 'react-router-dom';
import { ProductContainer } from './ProductContainer';
import { useContext, useEffect, useState } from 'react';
import { ProductosContext } from '../contexts/ProductosContext';
import { AuthContext } from '../auth/AuthContext';
import { CategoriesList } from './CategoriesList';

export const ProductList = () => {
    const { loading, error } = useContext(AuthContext);
    const { getProductos, productosDisplay, total, pageSelected,cantPerPage, totalPages, setPageSelected, setCantPerPage } = useContext(ProductosContext);

    const [cantProductos, setCantProductos] = useState(0);

    const fetchProductos = async (pagina, cantidadPorPag) => {
        try {
            const response = await getProductos(pagina, cantidadPorPag);
            const respuestaFiltro = response.data.data;

            if (response.data) {
                setCantProductos(respuestaFiltro.total);
                setCantPerPage(respuestaFiltro.perPage);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
        // Primera página
        paginas.push(1);
        // Páginas intermedias (desde la actual hasta 4 páginas más adelante)
        for (let i = pageSelected; i <= Math.min(pageSelected + 3, totalPages); i++) {
            if (i !== 1 && i !== totalPages) {
                paginas.push(i);
            }
        }

        // Última página
        if (totalPages > 1) {
            paginas.push(totalPages);
        }

        return paginas;
    };

    if (productosDisplay && !loading) {
        return (
            <div className="main m-0 grid grid-flow-col">
                <CategoriesList />
                <div className="body flex flex-col items-center">
                    <div className="grid grid-flow-row gap-x-24 grid-cols-4 justify-start items-center">
                        {productosDisplay && productosDisplay.map(producto => (
                            <ProductContainer key={producto.id} product={producto} />
                        ))}
                    </div>
                    <div className="my-4">
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
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div className="paginacion my-4 flex flex-row justify-between w-full">
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

                                {/* Generar botones de paginación */}
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
