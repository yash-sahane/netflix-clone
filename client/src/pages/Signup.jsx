import React, { useEffect, useState } from 'react'

const Signup = () => {
    const [passInput, setPassInput] = useState(false);
    const [details, setDetails] = useState({
        email: '',
        pass: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const signupHandler = () => {
        const { email, pass } = details;

    }

    useEffect(() => {
        console.log(details);
    }, [details])

    return (
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
    )
}
export default Signup