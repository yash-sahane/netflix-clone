import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Netflix, Signup } from './pages/index';
import { Nav } from './components/index'
import { ToastContainer } from 'react-toastify';
import './app.css'
import Player from './pages/Player';

const App = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(JSON.parse(loggedInStatus));
    }
  }, []);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} updateLoginStatus={updateLoginStatus} />} />
        <Route exact path='/signup' element={<Signup loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} updateLoginStatus={updateLoginStatus} />} />
        <Route exact path='/' element={<Netflix loginPage={loginPage} setLoginPage={setLoginPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} updateLoginStatus={updateLoginStatus} isScrolled={isScrolled} />} />
        <Route exact path='/player' element={<Player />} />
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