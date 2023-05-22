import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = ({ loginPage, setLoginPage, isLoggedIn }) => {
    const navigate = useNavigate();
    const buttonHandler = () => {
        setLoginPage(prevState => !prevState);
        navigate(loginPage ? '/signup' : '/login');
    }

    const links = [
        { name: 'Home', link: '/' },
        { name: 'TV Shows', link: '/tv' },
        { name: 'Movies', link: '/movies' },
        { name: 'My List', link: '/mylist' }
    ]

    return (
        !isLoggedIn ?
            <div className="h-20 w-screen flex justify-between items-center px-0 pr-5 sm:px-12 absolute top-0 left-0">
                <img src="../../src/assets/logo.png" alt="" className="h-full" />
                <button className="bg-red-600 text-white font-bold py-2 px-4 mr-3 rounded hover:bg-red-700"
                    onClick={buttonHandler}>
                    {loginPage ? 'Sign Up' : 'Sign In'}
                </button>
            </div> :
            <div>
                <div className="h-20 w-screen flex justify-between items-center px-0 pr-5 sm:px-12 absolute top-0 left-0">
                    <img src="../../src/assets/logo.png" alt="" className="h-full" />
                    <div>
                        {links.map(({ name, link }) => {

                        })}
                    </div>
                    <button className="bg-red-600 text-white font-bold py-2 px-4 mr-3 rounded hover:bg-red-700"
                        onClick={buttonHandler}>
                    </button>
                </div>
            </div>
    )
}

export default Nav