import React, { useEffect, useState } from 'react'
import { firebaseAuth } from '../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Header from '../components/Header';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ({ setIsLoggedIn, updateLoginStatus }) => {
    const [passInput, setPassInput] = useState(false);
    const [details, setDetails] = useState({
        email: '',
        pass: ''
    })
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const signupHandler = async () => {
        const { email, pass } = details;

        if (!validator.isEmail(email)) {
            toast.error('Invalid Email', {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
            return;
        }

        if (!validator.isLength(pass, { min: 8 })) {
            toast.error('Password must be at least 8 characters long!', {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
            return;
        }
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, pass);
            setIsLoggedIn(true);
            updateLoginStatus(true);
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                navigate('/');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    useEffect(() => {
        console.log(details);
    }, [details])

    return (
        <>
            <div className=" text-white flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-24 lg:px-32 xl:px-40 h-screen w-screen">
                <div
                    className="bg-opacity-90 absolute top-0 left-0 w-full h-full -z-10"
                    style={{
                        backgroundImage: "url('/src/assets/login.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(40%)',
                    }}
                ></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Unlimited movies, TV <br /> shows and more
                </h1>
                <h2 className="text-xl md:text-2xl mb-6">
                    Watch anywhere. Cancel anytime.
                </h2>
                <h2 className="text-lg md:text-xl mb-8">
                    Ready to watch? Enter your email to create or restart membership
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input
                        type="email"
                        className="w-64 bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                        placeholder="Email address"
                        name='email'
                        onChange={onChangeHandler}
                    />
                    {passInput && <input
                        type="password"
                        className="w-64 bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                        placeholder="Password"
                        name='pass'
                        onChange={onChangeHandler}
                    />}
                    {!passInput && <button className="bg-red-600 text-white py-2 px-6 rounded font-bold hover:bg-red-700"
                        onClick={() => setPassInput(prevState => !prevState)}>
                        Get Started
                    </button>}
                </div>
                <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded font-bold hover:bg-white hover:text-black" onClick={signupHandler}>
                    Sign Up
                </button>
            </div >
        </>
    )
}
export default Signup