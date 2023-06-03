import React from 'react';
import Card from './Card';

const CardSlider = ({ title, data }) => {
    console.log(data);
    return (
        <div className='flex flex-wrap'>
            {data && data.map(movie => (
                <Card key={movie.name} movie={movie} />
            ))}
        </div>
    );
};

export default CardSlider;