import React, { useEffect, useState } from 'react'
import { firebaseAuth } from '../utils/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ({ setIsLoggedIn }) => {
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
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, pass);
            setIsLoggedIn(true);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error('User not found');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Wrong password');
            } else {
                toast.error(error.message);
            }
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

    return (
        <div className=" text-white flex flex-col items-center justify-center px-5 sm:px-10 md:px-24 lg:px-32 xl:px-40 h-screen w-screen">
            <div
                className="bg-opacity-90 absolute top-0 left-0 w-full h-full -z-10"
                style={{
                    backgroundImage: "url('/src/assets/login.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(40%)',
                }}
            ></div>
            <div className="flex flex-col gap-2 p-6 bg-black bg-opacity-70">
                <h1 className='text-lg text-center mb-3'>Login</h1>
                <label htmlFor="">Email</label>
                <input
                    type="email"
                    name='email'
                    className=" w-64 bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                    placeholder="Email address"
                    onChange={onChangeHandler}
                />
                <label htmlFor="" className='mt-3'>Password</label>
                <input
                    type="password"
                    name='pass'
                    className="w-64 bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                    placeholder="Password"
                    onChange={onChangeHandler}
                />
                <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded font-bold hover:bg-white hover:text-black" onClick={signupHandler}>
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Signup