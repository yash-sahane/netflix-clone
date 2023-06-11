import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const CardSlider = ({ title, data }) => {
    const [showControls, setShowControls] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const listRef = useRef();

    const handleMouseEnter = () => {
        setShowControls(true);
    };

    const handleMouseLeave = () => {
        setShowControls(false);
    };

    const handleDirection = (direction) => {
        if (direction === 'left' && sliderPosition > 0) {
            setSliderPosition((prevPosition) => prevPosition - 1);
        }
        if (direction === 'right' && sliderPosition < 4) {
            setSliderPosition((prevPosition) => prevPosition + 1);
        }
    };

    useEffect(() => {
        const distance = sliderPosition * 250;
        listRef.current.style.transform = `translateX(-${distance}px)`;
    }, [sliderPosition]);

    return (
        <div
            className={`flex flex-col gap-4 w-max translate-x-0 py-10 transition-all duration-300 bg-[#111011] relative z-[0] hover:z-[10]`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h1 className="text-white ml-10 font-bold text-xl">{title}</h1>
            <div className="flex justify-center items-center z-50">
                <div
                    className={`absolute left-0 z-[1] transition-opacity duration-300 ${!showControls && 'opacity-0'}`}
                    onClick={() => handleDirection('left')}
                >
                    <FaAngleLeft className="text-4xl text-white" />
                </div>
                <div className="flex w-max gap-4 translate-x-0 ml-10 mr-10" ref={listRef}>
                    {data && data.map((movie) => <Card key={movie.name} movie={movie} />)}
                </div>
                <div
                    className={`absolute left-[95vw] transition-opacity duration-300 ${!showControls && 'opacity-0'}`}
                    onClick={() => handleDirection('right')}
                >
                    <FaAngleRight className="text-4xl text-white" />
                </div>
            </div>
        </div>
    );
};

export default CardSlider;