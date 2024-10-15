import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';
import { AuthContext } from '../auth/AuthContext';
import { ProductContainer } from './ProductContainer';
import { CategoriesList } from './CategoriesList';

export const ProductList = () => {
    const { loading, setLoading } = useContext(AuthContext);
    const { productosDisplay, total, totalPages, getProductosByCategory, getProductos, buscarPorPalabrasClave, getOfertas, categorias, searchParams, setSearchParams, pageSelected, cantPerPage, query } = useContext(ProductosContext);
    const [cantEnCompo, setCantEnCompo] = useState(cantPerPage)
    const [pageEnCompo, setPageEnCompo] = useState(parseInt(pageSelected))
    const { categoryId, ofertas } = useParams();
    const [categoriaEn, setCategoriaEn] = useState(null)

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setCategoriaEn(null);
                if (ofertas) { await getOfertas() }
                else if (categoryId) {
                    // Si hay una categoría seleccionada, obtenemos los productos por categoría
                    await getProductosByCategory(categoryId, 1);
                    if (categorias) {
                        setCategoriaEn(categorias.find(categoria => categoria.id === categoryId));
                    }
                } else if (searchParams.get('query')) {
                    // Si hay una búsqueda, obtenemos los productos filtrados por búsqueda
                    await buscarPorPalabrasClave(searchParams.get('query'));
                } else {
                    // Si no hay categoría, búsqueda o estamos en ofertas, obtenemos todos los productos
                    await getProductos();
                }
            } catch (error) {
                throw new Error({ message: 'Error al buscar productos:', error })
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [searchParams, categoryId]);


    const handlePageChange = (page) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        setPageEnCompo(page)
        // Actualizar solo el valor de page
        const updatedParams = {
            ...currentParams,
            page
        };

        // Si no hay valor en query, no se añade
        if (!updatedParams.query) {
            delete updatedParams.query; // Elimina el parámetro query si está vacío
        }

        // Actualiza los searchParams
        setSearchParams(updatedParams);
    };

    const handleCantidadChange = (event) => {
        const newCantPerPage = event.target.value;
        setCantEnCompo(newCantPerPage)
        // Obtener los parámetros actuales
        const currentParams = Object.fromEntries(searchParams.entries());
        // Actualizar solo el valor de cantPerPage
        const updatedParams = {
            ...currentParams,
            cantPerPage: newCantPerPage || undefined, // Si no hay valor, se pone undefined
        };

        // Si no hay valor en query, no se añade
        if (!updatedParams.query) {
            delete updatedParams.query; // Elimina el parámetro query si está vacío
        }

        // Actualiza los searchParams
        setSearchParams(updatedParams);
    };
    const generarPaginas = (paginaActual) => {
        if (totalPages) {
            const paginas = [];
            paginas.push(1); // Siempre añadir la primera página
            let parsePaginaActual = parseInt(paginaActual)
            if (totalPages <= 5) {
                // Si hay 5 o menos páginas, las mostramos todas
                for (let i = 2; i < totalPages; i++) {
                    paginas.push(i);
                }
            } else {
                let inicio = Math.max(2, parsePaginaActual - 1); // Determina desde dónde comenzar, sin ir antes de la página 2
                let fin = Math.min(totalPages - 1, parsePaginaActual + 1); // Determina hasta dónde llegar, sin pasar la última página

                if (parsePaginaActual <= 2) {
                    fin = 4; // Si estamos al inicio, mostramos las primeras páginas
                } else if (parsePaginaActual >= totalPages - 1) {
                    inicio = totalPages - 3; // Si estamos cerca del final, mostramos las últimas páginas
                }

                // Añadimos las páginas intermedias
                for (let i = inicio; i <= fin; i++) {
                    paginas.push(i);
                }
            }

            paginas.push(totalPages); // Siempre añadir la última página

            return paginas;
        } else {
            return [1]
        }
    };


    if (productosDisplay && !loading) {
        return (
            <div className="main m-0 flex flex-1 w-full md:justify-between md:mt-4 ">
                <div className="categories hidden lg:block h-fit w-fit">
                    {<CategoriesList />}
                </div>
                <div className="body col-span-2 flex flex-col items-center w-full mx-12 lg:px-28">
                    {categoriaEn && <div className="font-bold text-2xl uppercase text-center">CATEGORÍA {categoriaEn.nombre}</div>}
                    <div className="grid grid-flow-row gap-x-32 md:gap-x-24 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center items-center">
                        {productosDisplay.map((producto, index) => (
                            <ProductContainer key={index} product={producto} />
                        ))}
                    </div>
                    {productosDisplay.length > 0 && <div className="my-4">
                        <label htmlFor="cantidadPorPag" className="mr-2">Productos por página:</label>
                        <select
                            id="cantidadPorPag"
                            onChange={(e) => handleCantidadChange(e)}
                            className="p-2 border"
                            defaultValue={20}
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
                                        onClick={() => handlePageChange(parseInt(pageSelected) - 1)}
                                        className={`flex items-center justify-center px-3 h-8 ${pageSelected === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-500'} bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
                                        disabled={pageSelected === 1}
                                    >
                                        {'<'}
                                    </button>
                                </li>

                                {generarPaginas(pageSelected).map((page) => (
                                    <li key={page}>
                                        <button
                                            onClick={() => handlePageChange(page)}
                                            className={`flex items-center justify-center px-3 h-8 leading-tight ${pageEnCompo === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}

                                <li>
                                    <button
                                        onClick={() => handlePageChange(parseInt(pageSelected) + 1)}
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
        );
    }

    return (
        <div className="flex flex-col gap-28 items-center justify-center w-full mt-4 text-2xl">
            <p>Ha habido un error al obtener los productos</p>
            <a className='text-blue-500 underline' href='/'>Volver al inicio</a>
        </div>
    );

}
