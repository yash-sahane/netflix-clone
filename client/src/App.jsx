import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Netflix, Signup } from './pages/index';
import { Nav } from './components/index'
import './app.css'

const App = () => {
  const [loginPage, setLoginPage] = useState(true);
  return (
    <Router>
      <Nav loginPage={loginPage} setLoginPage={setLoginPage} />
      <Routes>
        <Route exact path='/login' element={<Login loginPage={loginPage} setLoginPage={setLoginPage} />} />
        <Route exact path='/signup' element={<Signup loginPage={loginPage} setLoginPage={setLoginPage} />} />
        <Route exact path='/net' element={<Netflix />} />
      </Routes>
    </Router>
  )
}

export default App