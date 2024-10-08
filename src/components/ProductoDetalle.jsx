import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductosContext } from "../contexts/ProductosContext";
import { SliderProducto } from "./views/SilderProducto";

export const ProductoDetalle = () => {
    const { getProductosDetalles } = useContext(ProductosContext);
    const [producto, setProducto] = useState(null);
    const { idProducto } = useParams();

    useEffect(() => {
        const fetchProducto = async () => {
            const prodResponse = await getProductosDetalles(idProducto); // Espera a la respuesta
            setProducto(prodResponse.data); // Establece el producto en el estado
        };
        fetchProducto();
    }, [idProducto]); // Incluye getProductosDetalles como dependencia

    console.log(producto);
    if(!producto) return;
    return (
        <div className="bg-white flex flex-row w-full justify-center items-center h-[70vh] gap-24">
            <div className="galeria max-w-[400px]"> {/* Ajusta el contenedor de la imagen */}
                <SliderProducto images={producto.images ? producto.images : []} />
            </div>
            <div className="infoprod h-full flex items-center flex-col max-w-[560px]">
                <p>{producto.nombre}</p>
                <div
                    dangerouslySetInnerHTML={{ __html: producto.descripcion }}
                />
            </div>
        </div>
    );
};
