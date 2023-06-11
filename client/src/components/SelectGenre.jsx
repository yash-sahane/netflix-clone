import React, { useState } from 'react';

const SelectGenre = ({ genres }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${isOpen ? 'open' : ''}`}>
            <div
                className="cursor-pointer py-2 px-4 bg-black text-white rounded-md transition-colors duration-300 z-10"
                onClick={handleSelectToggle}
            >
                <div className="flex justify-between">
                    <div>
                        <span className="mr-2">Genre:</span>
                        <span className="font-medium">Select Genre</span>
                    </div>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''
                            }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
            <ul
                className={`z-20 absolute left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ top: 'calc(100% + 0.5rem)' }}
            >
                {genres.map((genre) => (
                    <li
                        key={genre.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectGenre;