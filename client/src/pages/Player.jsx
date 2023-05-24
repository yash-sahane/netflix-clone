import React from 'react'
import video from '../assets/video.mp4'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Player = ({ setPlayer }) => {
  const navigate = useNavigate();

  return (
    <div className='h-screen absolute top-0 left-0 w-screen'>
      <button className='absolute p-4 z-[1]'
        onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <video src={video} autoPlay loop muted controls className='w-screen h-screen' />
    </div>
  )
}

export default Player