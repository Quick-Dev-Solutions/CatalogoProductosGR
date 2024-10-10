import { useState } from 'react';
import RightArrow from '../../assets/right-arrow.svg';

const images = [
    'https://http2.mlstatic.com/D_NQ_NP_905031-MLA74952578559_032024-OO.webp',
    'https://http2.mlstatic.com/D_NQ_NP_695288-MLA74952522705_032024-OO.webp',
    'https://http2.mlstatic.com/D_NQ_NP_738242-MLA74982791947_032024-OO.webp'
];

export const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative
         bg-gradient-to-b from-orange-400 md:mx-auto to-white w-[80vw] sm:w-full
         ">
            <div className="overflow-hidden relative h-[250px] w-[500px] mx-auto">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div className="min-w-full relative h-full" key={index}>
                            <img 
                                src={image} 
                                alt={`Slide ${index}`} 
                                className="w-full h-full object-contain" // Cambiado a object-contain
                            />
                            <div
                                className={`absolute top-0 left-0 w-full h-full `}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 p-4 text-slate-400 transform -translate-y-1/2"
                disabled={currentIndex === 0}
            >
                <img 
                    src={RightArrow} 
                    alt="Flecha a la izquierda"
                    className='size-12 transform rotate-180'
                />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 p-4 transform -translate-y-1/2"
                disabled={currentIndex + 1 === images.length}
            >
                <img src={RightArrow} alt="Flecha a la derecha" className={`size-12`} />
            </button>
        </div>
    );
};

export default Slider;
