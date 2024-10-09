/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const ProductContainer = ({ product }) => {
    const { id, images, nombre } = product;
    return (
        <div className="md:w-48 w-20 h-fit p-4 rounded-sm col-span-1 transition-all hover:text-blue-600 hover:underline">
            <Link to={`/producto/${id}`}>
                <div className="image-stock row-span-1 shadow-lg size-32 md:h-[260px] md:w-[260px] pb-6 items-center aspect-square">
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
            </Link>
        </div>
    );
}
