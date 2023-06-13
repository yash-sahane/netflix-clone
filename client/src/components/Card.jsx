import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaThumbsUp, FaThumbsDown, FaCheck, FaPlus, FaChevronDown } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { toast } from 'react-toastify';
import axios from 'axios';

const Card = ({ movie }) => {
    const { name, image } = movie;
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const server = import.meta.env.VITE_SERVER

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate('/login');
    })

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

    const handleLikeClick = async () => {

    };

    const handleDislikeClick = () => {
    };

    const handleAddToListClick = async () => {
        try {
            const { data } = await axios.post(`${server}/user/add`, { email, data: movie });
            if (data.success === 'false') {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "dark",
                });
                console.log(data);
                return
            }
            toast.success(data.message, {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
            console.log(data);
        } catch (e) {
            console.log(e);
            toast.error(e, {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
        }
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
            className={`relative transition-transform duration-300 rounded-sm ${isHovered ? 'scale-x-[1.40] scale-y-[1.35] z-10' : ''
                }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="w-64 cursor-pointer rounded-lg shadow-lg">
                <img
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt="movie"
                    onClick={handleCardClick}
                />
            </div>
            {isHovered && (
                <div className="absolute -top-16 left-0 right-0 z-10">
                    <video
                        src="../../src/assets/video.mp4"
                        autoPlay
                        loop
                        muted
                        onClick={handleCardClick}
                    />
                    <div className="bg-gray-900 p-4">
                        <h3
                            onClick={handleCardClick}
                            className="text-white text-sm font-medium cursor-pointer"
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
                            <ul className="flex flex-wrap gap-5 mt-2 text-white">
                                {movie.genres.map((genre, index) => {
                                    return (
                                        <li
                                            className="text-[10px]"
                                            key={index}
                                            style={{
                                                listStyleType: index === 0 ? 'none' : 'disc',
                                            }}
                                        >
                                            {genre}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;