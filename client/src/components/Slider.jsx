import React from 'react';
import CardSlider from './CardSlider';

const Slider = ({ movies }) => {
    const fetchMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };

    const cardSlider = [
        { id: '1', title: 'Trending Now', data: fetchMoviesFromRange(0, 10) },
        { id: '2', title: 'New Releases', data: fetchMoviesFromRange(11, 20) },
        { id: '3', title: 'Blockbuster Movies', data: fetchMoviesFromRange(21, 30) },
        { id: '4', title: 'Popular on Netflix', data: fetchMoviesFromRange(31, 40) },
        { id: '5', title: 'Action Movies', data: fetchMoviesFromRange(41, 50) },
        { id: '6', title: 'Epics', data: fetchMoviesFromRange(51, 60) },
    ];

    return (
        <div>
            {cardSlider.map(cardData => {
                const { id, title, data } = cardData;
                return <CardSlider key={id} title={title} data={data} />
            })}
        </div>
    );
};

export default Slider;