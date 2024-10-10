import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../contexts/ProductosContext';
import { AuthContext } from '../auth/AuthContext';
import { ProductContainer } from './ProductContainer';
import { CategoriesList } from './CategoriesList';

export const ProductList = () => {
    const { loading, error, setLoading } = useContext(AuthContext);
    const { productosDisplay, total, totalPages, getProductosByCategory, getProductos, buscarPorPalabrasClave, getOfertas, categorias, searchParams, setSearchParams, pageSelected, cantPerPage, query } = useContext(ProductosContext);

    const { categoryId } = useParams();
    const [categoriaEn, setCategoriaEn] = useState(null)
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setCategoriaEn(null);
                if (categoryId) {
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
                console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [searchParams, categoryId]); // Eliminé la dependencia 'url'


    const handlePageChange = (page) => {
        console.log(page);
        if (page >= 1 && page <= totalPages) {
            setSearchParams({query, page: page, cantPerPage })
        }
    };
    
    const handleCantidadChange = (event) => {
        const newCantPerPage = event.target.value;
    
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
            <div className="main m-0 flex flex-row w-64 md:w-full md:mt-4 md:mx-4">
                <meta name="description"
                    content={`Encontrá ${location.pathname == '/ofertas' ? 'nuestras ofertas en GR Llaves, comprá la mejor calidad al mejor precio. Tu seguridad, en nuestras manos..' : 'nuestra variedad de productos de GR Llaves, representantes de SOMET, BBS Motion, compras mayoristas y más. Tu seguridad, en nuestras manos...'}`}
                />
                <div className="categories w-fit">
                    {<CategoriesList />}
                </div>
                <div className="body flex flex-col items-center w-full">
                    {categoriaEn && <div className="font-bold text-2xl uppercase">CATEGORÍA {categoriaEn.nombre}</div>}
                    <div className="grid grid-flow-row gap-x-32 md:gap-x-24  grid-cols-2 md:grid-cols-4 justify-center items-center">
                        {productosDisplay.map((producto, index) => (
                            <ProductContainer key={index} product={producto} />
                        ))}
                    </div>
                    {productosDisplay.length > 0 && <div className="my-4">
                        <label htmlFor="cantidadPorPag" className="mr-2">Productos por página:</label>
                        <select
                            id="cantidadPorPag"
                            value={cantPerPage[0]}
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
