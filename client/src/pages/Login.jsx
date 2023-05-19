import React from 'react'

const Signup = () => {
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
                    className="w-full sm:w-auto bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                    placeholder="Email address"
                />
                <label htmlFor="" className='mt-3'>Password</label>
                <input
                    type="password"
                    className="w-full sm:w-auto bg-gray-800 text-white py-2 px-4 rounded placeholder-gray-500"
                    placeholder="Password"
                />
                <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded font-bold hover:bg-white hover:text-black">
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Signup