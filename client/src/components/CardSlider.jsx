import React, { useRef, useState } from 'react';
import Card from './Card';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CardSlider = ({ title, data }) => {
    const [showControls, setShowControls] = useState(false);
    const listRef = useRef();

    return (
        <div className="flex flex-col gap-4 relative py-4" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
            <h1 className="ml-[50px]">{title}</h1>
            <div className="flex justify-center items-center">
                <div className={`${!showControls && 'opacity-0'}`}>
                    <FaArrowLeft />
                </div>
                <div className="flex w-max gap-4 translate-x-0 ml-[50px] overflow-x-hidden" ref={listRef}>
                    {data &&
                        data.map((movie) => (
                            <Card key={movie.name} movie={movie} />
                        ))}
                </div>
                <div className={`${!showControls && 'opacity-0'}`}>
                    <FaArrowRight />
                </div>
            </div>
        </div>
    );
};

export default CardSlider;