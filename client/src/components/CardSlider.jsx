import React, { useRef, useState } from 'react';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const CardSlider = ({ title, data }) => {
    const [showControls, setShowControls] = useState(false);
    const listRef = useRef();

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    return (
        <div className="flex flex-col gap-4 w-max translate-x-0 py-8" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <h1 className="ml-7 font-bold text-xl">{title}</h1>
            <div className="flex justify-center items-center z-50">
                <div className={`transition-opacity duration-300 ${!showControls && 'opacity-0'}`}>
                    <FaAngleLeft className="text-4xl" />
                </div>
                <div className="flex w-max gap-4 translate-x-0 ml-3" ref={listRef}>
                    {data && data.map((movie) => <Card key={movie.name} movie={movie} />)}
                </div>
                <div className={`absolute left-[95vw] transition-opacity duration-300 ${!showControls && 'opacity-0'}`}>
                    <FaAngleRight className="text-4xl" />
                </div>
            </div>
        </div>
    );
};

export default CardSlider;