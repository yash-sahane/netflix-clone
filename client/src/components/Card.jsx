import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaThumbsUp, FaThumbsDown, FaCheck, FaPlus, FaChevronDown } from 'react-icons/fa';

const Card = ({ movie }) => {
    const { name, image } = movie;
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCardClick = () => {
        navigate('/player');
    };

    const handlePlayClick = () => {
        navigate('/player');
    };

    const handleLikeClick = () => {
        // Handle like button click
    };

    const handleDislikeClick = () => {
        // Handle dislike button click
    };

    const handleAddToListClick = () => {
        // Handle add to list button click
        setIsLiked(true);
    };

    const handleRemoveFromListClick = () => {
        // Handle remove from list button click
        setIsLiked(false);
    };

    const handleMoreInfoClick = () => {
        // Handle more info button click
    };

    return (
        <div
            className={`z-50 ${isHovered ? 'scale-x-110 scale-y-95' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-64 cursor-pointer rounded-lg shadow-lg z-[100]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt="movie"
                    onClick={handleCardClick}
                />
            </div>
            {isHovered && (
                <div className="absolute -top-16 left-0 z-50 transition-transform duration-300">
                    <video
                        src="../../src/assets/video.mp4"
                        autoPlay
                        loop
                        muted
                        onClick={handleCardClick}
                        className=""
                    />
                    <div className="bg-gray-900 p-4">
                        <h3
                            onClick={handleCardClick}
                            className="text-white text-md font-medium cursor-pointer"
                        >
                            {name}
                        </h3>
                        <div className="flex justify-between items-center text-white mt-2">
                            <div className="flex items-center">
                                <FaPlay
                                    title="Play"
                                    onClick={handlePlayClick}
                                    className="mr-2 cursor-pointer"
                                />
                                <FaThumbsUp
                                    title="Like"
                                    onClick={handleLikeClick}
                                    className="mr-2 cursor-pointer"
                                />
                                <FaThumbsDown
                                    title="Dislike"
                                    onClick={handleDislikeClick}
                                    className="mr-2 cursor-pointer"
                                />
                                {isLiked ? (
                                    <FaCheck
                                        title="Remove from List"
                                        onClick={handleRemoveFromListClick}
                                        className="mr-2 cursor-pointer"
                                    />
                                ) : (
                                    <FaPlus
                                        title="Add to My List"
                                        onClick={handleAddToListClick}
                                        className="mr-2 cursor-pointer"
                                    />
                                )}
                            </div>
                            <div>
                                <FaChevronDown
                                    title="More Info"
                                    onClick={handleMoreInfoClick}
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