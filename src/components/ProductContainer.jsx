import { Link } from "react-router-dom";

export const ProductContainer = ({ product }) => {
    const { id, descripcion, id_categoria, images, nombre } = product;
    return (
        <Link to={`/producto/${id}`}>
            <div className="w-48  p-4 rounded-sm flex flex-col    col-span-1 transition-all hover:scale-110 hover:underline">
                <div className="image-stock row-span-1 shadow-lg h-[260px] w-[260px] pb-6 items-center ">
                    <img
                        src={images[0]}
                        className="size-fit object-fit h-64 w-64"
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
