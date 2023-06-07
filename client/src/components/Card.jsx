import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaThumbsUp, FaThumbsDown, FaCheck, FaPlus, FaChevronDown } from 'react-icons/fa';

const Card = ({ movie }) => {
    const { name, image } = movie;
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative bg-gray-600" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="w-[250px] cursor-pointer rounded-lg shadow-lg p-10" >
                <img
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt="movie"
                    onClick={() => navigate('/player')}
                />
            </div>
            {isHovered && (
                <div className="absolute -top-16 left-0 z-50 transform scale-110">
                    <video
                        src="../../src/assets/video.mp4"
                        autoPlay
                        loop
                        muted
                        onClick={() => navigate('/player')}
                        className=""
                    />
                    <div className="bg-[#262526] p-4">
                        <h3
                            onClick={() => navigate('/player')}
                            className="text-white text-md font-medium cursor-pointer"
                        >
                            {name}
                        </h3>
                        <div className="flex justify-between items-center text-white mt-2">
                            <div className="flex items-center">
                                <FaPlay
                                    title="play"
                                    onClick={() => navigate('player')}
                                    className="mr-2 cursor-pointer"
                                />
                                <FaThumbsUp
                                    title="like"
                                    className="mr-2 cursor-pointer"
                                />
                                <FaThumbsDown
                                    title="dislike"
                                    className="mr-2 cursor-pointer"
                                />
                                {isLiked ? (
                                    <FaCheck
                                        title="Remove from List"
                                        className="mr-2 cursor-pointer"
                                    />
                                ) : (
                                    <FaPlus
                                        title="Add to My List"
                                        className="mr-2 cursor-pointer"
                                    />
                                )}
                            </div>
                            <div>
                                <FaChevronDown
                                    title="More Info"
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                        <div>
                            <ul className="mt-2 text-white">
                                {movie.genres.map((genre) => (
                                    <li key={genre.id}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;