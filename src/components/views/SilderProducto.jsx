import { useState } from 'react';
import RightArrow from '../../assets/right-arrow.svg';

export const SliderProducto = ({ images }) => {
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
        <div className="relative mx-auto" style={{ width: '300px' }}>
            <div className="relative overflow-hidden" style={{ height: '300px' }}> {/* Ajuste del tamaño */}
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div className="min-w-full relative" key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-contain"
                                style={{ maxWidth: '300px', maxHeight: '300px' }}
                            />
                            <div
                                className="absolute top-0 left-0 w-full h-full"
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className={`absolute left-0 p-4 top-[80px] text-slate-400 ${currentIndex === 0 ? 'opacity-0 disabled:cursor-not-allowed' : ''
                    }`}
                disabled={currentIndex === 0}
            >
                <img
                    src={RightArrow}
                    alt="Flecha a la izquierda"
                    className={`size-12 transform rotate-180 ${currentIndex === 0 ? 'cursor-not-allowed' : 'text-slate-400'
                        }`}
                />
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-[80px] right-0 p-4"
            >
                <img src={RightArrow} alt="Flecha a la derecha" className="size-12" />
            </button>
        </div>
    );
};
