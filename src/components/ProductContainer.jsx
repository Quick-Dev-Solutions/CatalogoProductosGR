/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductContainer = ({ product }) => {
    const { id, images, nombre } = product;
    return (
        <Link to={`/producto/${id}`}>
            <div className="w-48  p-4 rounded-sm flex flex-col    col-span-1 transition-all hover:text-blue-600 hover:underline">
                <div className="image-stock row-span-1 shadow-lg h-[260px] w-[260px] pb-6 items-center aspect-square">
                    <img
                        src={images[0]}
                        className="object-contain object-center h-full w-full"
                        alt={nombre}
                    />
                </div>
                <div className="name-desc w-[260px] font-bold">
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
