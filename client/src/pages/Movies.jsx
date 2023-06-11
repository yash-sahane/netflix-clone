import React, { useEffect, useState } from 'react'
import { Nav } from '../components'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux'
import { FaPlay, FaExclamation } from 'react-icons/fa';
import { getGenres, getMovies } from '../store';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const Movies = ({ loginPage, setLoginPage, updateLoginStatus, isScrolled }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector(state => state.netflix.genresLoaded);
    const movies = useSelector(state => state.netflix.movies);
    const genres = useSelector(state => state.netflix.genres);

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

    useEffect(() => {
        if (genresLoaded) dispatch(getMovies({ type: 'movie' }));
    }, [genresLoaded]);

    return (
        <div className='bg-[#111011]'>
            <Nav loginPage={loginPage} setLoginPage={setLoginPage} updateLoginStatus={updateLoginStatus} isScrolled={isScrolled} />
            <SelectGenre genres={genres} />
            <div>
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </div>
    )
}

export default Movies