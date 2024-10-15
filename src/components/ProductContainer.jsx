/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductContainer = ({ product }) => {
    const { id, images, nombre } = product;
    return (
        <Link to={`/producto/${id}`}>
            <div className="rounded-sm transition-colors hover:text-blue-600 hover:underline">
                <div className="image-stock bg-white row-span-1 shadow-lg sm:size-56 pb-6 items-center aspect-square">
                    <img
                        src={images[0]}
                        className="object-contain object-center h-full w-full"
                        alt={nombre}
                    />
                </div>
                <div className="name-desc font-bold">
                    <div className="two">
                        <div className="name text-sm">
                            <p>{nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
