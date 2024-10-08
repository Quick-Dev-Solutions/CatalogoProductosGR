import { useState } from 'react';
import RightArrow from '../../assets/right-arrow.svg'
const images = [
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400/ff6347',
    'https://via.placeholder.com/800x400/4682b4',
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
        <div className="relative mx-auto bg-gradient-to-b from-orange-400 to-white w-full">
            <div className="overflow-hidden relative h-64">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div className="min-w-full relative" key={index}>
                            <img src={image} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
                            <div
                                className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white `}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={prevSlide}
                className="absolute top-16 left-0 p-4 disable:text-slate-100 text-slate-400 fill-slate-400"
                disabled={currentIndex  === 0}
                >
                <img src={RightArrow} alt="Flecha a la derecha"
                 className='size-12 transfrm rotate-180 fill-slate-400'
                 disabled={currentIndex  === 0}
                  />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-16 right-0 p-4 disabled:cursor-not-allowed`"
                disabled={currentIndex + 1 === images.length}
            >
                <img src={RightArrow} alt="Flecha a la derecha" className={`size-12 `} />
            </button>
        </div>
    );
};

export default Slider;
