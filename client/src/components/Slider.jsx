import React from 'react';
import CardSlider from './CardSlider';

const Slider = ({ movies }) => {
    const fetchMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };

    const cardSlider = [
        { id: '1', title: 'Trending Now', data: fetchMoviesFromRange(0, 9) },
        { id: '2', title: 'New Releases', data: fetchMoviesFromRange(10, 19) },
        { id: '3', title: 'Blockbuster Movies', data: fetchMoviesFromRange(20, 29) },
        { id: '4', title: 'Popular on Netflix', data: fetchMoviesFromRange(30, 39) },
        { id: '5', title: 'Action Movies', data: fetchMoviesFromRange(40, 49) },
        { id: '6', title: 'Epics', data: fetchMoviesFromRange(51, 60) },
    ];

    return (
        <>
            {cardSlider.map(cardData => {
                const { id, title, data } = cardData;
                return <div key={id} className=''>
                    <CardSlider title={title} data={data} />
                </div>
            })}
        </>
    );
};

export default Slider;