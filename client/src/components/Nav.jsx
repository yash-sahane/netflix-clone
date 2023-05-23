import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { firebaseAuth } from '../utils/firebase-config';
import { signOut } from 'firebase/auth';

const Nav = ({ loginPage, setLoginPage, isLoggedIn, updateLoginStatus }) => {
    const links = [
        { id: 1, name: 'Home', link: '/' },
        { id: 2, name: 'TV Shows', link: '/tv' },
        { id: 3, name: 'Movies', link: '/movies' },
        { id: 4, name: 'My List', link: '/mylist' }
    ]

    const [showInput, setShowInput] = useState(false);
    const navigate = useNavigate();

    const buttonHandler = () => {
        setLoginPage(prevState => !prevState);
        navigate(loginPage ? '/signup' : '/login');
    }

    const signoutHandler = async () => {
        try {
            await signOut(firebaseAuth);
            navigate('/login');
            updateLoginStatus(false);
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    return (
        !isLoggedIn ? <div className="h-20 w-screen flex justify-between items-center px-0 pr-5 sm:px-12 absolute top-0 left-0">
            <img src="../../src/assets/logo.png" alt="" className="h-full" />
            <button className="bg-red-600 text-white font-bold py-2 px-4 mr-3 rounded hover:bg-red-700"
                onClick={buttonHandler}>
                {loginPage ? 'Sign Up' : 'Sign In'}
            </button>
        </div> :
            <div>
                <div className="bg-black text-white h-20 w-screen flex justify-between items-center px-0 pr-5 sm:px-12 top-0 left-0">
                    <div className='h-full w-full flex items-center gap-5'>
                        <img src="../../src/assets/netflix-mobile.jpeg" alt="" className='h-4/5' />
                        <div className='flex gap-4'>
                            {links.map(({ id, name, link }) => {
                                return (
                                    <li key={id} className='list-none'>
                                        <Link to={link}>{name}</Link>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FaSearch className="text-white mr-3 cursor-pointer text-lg" onClick={() => setShowInput(prevState => !prevState)} />
                        {showInput && <input
                            type="search"
                            name="search"
                            className="w-32 bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500 transition-all"
                            placeholder="Search"
                        />}
                    </div>
                    <button onClick={signoutHandler} >
                        <FaPowerOff className='text-lg text-red-600 cursor-pointer' />
                    </button>
                </div>
            </div>
    )
}

export default Nav