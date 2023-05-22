import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Netflix, Signup } from './pages/index';
import { Nav } from './components/index'
import { ToastContainer } from 'react-toastify';
import './app.css'

const App = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Nav loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route exact path='/login' element={<Login loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path='/signup' element={<Signup loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path='/' element={<Netflix />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  )
}

export default App