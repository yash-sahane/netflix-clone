import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaThumbsUp, FaThumbsDown, FaCheck, FaPlus, FaChevronDown } from 'react-icons/fa';

const Card = ({ movie }) => {
    const { name, image } = movie;
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="max-w-[230px] w-[230px] h-[340px] m-5 cursor-pointer relative overflow-hidden rounded-lg shadow-lg"
        >
            <div className='h-[130px]'>
                {!isHovered ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${image}`}
                        alt="movie"
                        onClick={() => navigate('/player')}
                    />
                ) : (
                    <video
                        src="../../src/assets/video.mp4"
                        autoPlay
                        loop
                        muted
                        onClick={() => navigate('/player')}
                        className=""
                    />
                )}
            </div>

            <div className="">
                <div className="">
                    <FaPlay />
                </div>
            </div>

            <div className="">
                <h3
                    onClick={() => navigate('/player')}
                    className=""
                >
                    {name}
                </h3>
                <div className="">
                    <div className="">
                        <FaPlay title="play" onClick={() => navigate('player')} />
                        <FaThumbsUp title="like" />
                        <FaThumbsDown title="dislike" />
                        {isLiked ? (
                            <FaCheck title="Remove from List" />
                        ) : (
                            <FaPlus title="Add to My List" />
                        )}
                    </div>
                    <div>
                        <FaChevronDown title="More Info" />
                    </div>
                </div>
                <div>
                    <ul className="mt-2">
                        {movie.genres.map((genre) => (
                            <li key={genre.id}>
                                {genre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Card;