import { useContext } from "react";
import { useParams } from "react-router-dom"
import { ProductosContext } from "../contexts/ProductosContext";
import { SliderProducto } from "./views/SilderProducto";
export const ProductoDetalle = () => {
    const { id } = useParams()
    const { productosDisplay } = useContext(ProductosContext)
    const productoSeleccionado = productosDisplay.filter((producto) => producto.id == id)[0]
    console.log(productoSeleccionado);
    return (
        <div className="bg-white flex flex-row w-full justify-center items-center h-[70vh] mt-2 gap-24">
            <div className="galeria ">
                <SliderProducto images={productoSeleccionado.images ? productoSeleccionado.images : []} />
            </div>
            <div className="infoprod h-full flex items-center flex-col max-w-[560px]">
                <p>{productoSeleccionado.nombre}</p>
                <div
                    dangerouslySetInnerHTML={{ __html: productoSeleccionado.descripcion }} 
                />
            </div>
        </div>
    )
}
