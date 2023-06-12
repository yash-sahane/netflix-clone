import React, { useEffect, useState } from 'react'
import { Nav } from '../components'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay, FaExclamation } from 'react-icons/fa';
import { getGenres, getMovies } from '../store';
import Slider from '../components/Slider';

const Netflix = ({ loginPage, setLoginPage, updateLoginStatus, isScrolled }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector(state => state.netflix.genresLoaded);
    const movies = useSelector(state => state.netflix.movies);

    const playHandler = () => {
        navigate('/player');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    // useEffect(() => {
    //     if (genresLoaded) dispatch(getMovies({ type: 'all' }));
    // }, [genresLoaded]);

    return (
        <>
            <Nav loginPage={loginPage} setLoginPage={setLoginPage} updateLoginStatus={updateLoginStatus} isScrolled={isScrolled} />
            <div className='text-white' style={{ height: 'calc(100vh - 6rem)' }}>
                <img src="/src/assets/home.jpg" className='w-screen absolute h-screen object-cover top-0 left-0 -z-10 brightness-50' />
                <div className='absolute bottom-72 left-16'>
                    <img src="/src/assets/homeTitle.webp" className='bg-transparent' alt="" />
                    <div className='flex gap-4 mt-4'>
                        <button className="flex items-center bg-red-600 text-white font-bold py-2 px-4 mr-3 rounded hover:bg-red-700" onClick={playHandler}>
                            <FaPlay className="mr-1" />
                            Play
                        </button>
                        <button className="flex items-center bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
                            <FaExclamation className="mr-1" />
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-[#111011] pb-16'>
                <Slider movies={movies} />
            </div>
        </>
    )
}

export default Netflix