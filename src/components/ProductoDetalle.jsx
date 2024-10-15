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

    if (!producto) return;
    return (
        <div className="bg-white flex md:flex-row flex-col w-full size-full  justify-center items-center my-2 md:h-[70vh] gap-24">
            <div className="galeria max-w-[400px]"> {/* Ajusta el contenedor de la imagen */}
                <SliderProducto images={producto.images ? producto.images : []} />
            </div>
            <div className="infoprod h-full flex items-center justify-center flex-col gap-3 max-w-[560px]">
                <h3 className="font-bold">{producto.nombre}</h3>
                {producto.descripcion && <div className="max-h-[80vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: producto.descripcion }}
                />}
                {!producto.descripcion && 
                <div className="text-slate-500">
                    <p>No se ha incluido una descripción del producto.</p>
                </div>}
                <a target="_blank" href={`https://api.whatsapp.com/send?phone=541138540896&text=¡Hola! Estoy en la tienda online GR LLAVES y quiero pedir más información acerca del producto ${producto.nombre}.`}
                    className="bg-green-500 px-2 py-1 rounded-full text-white font-semibold flex gap-2 flex-row-reverse">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#ffffff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#ffffff"></path> </g></svg>
                    Contactános
                </a>
            </div>
        </div>
    );
};
