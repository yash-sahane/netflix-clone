import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Netflix, Signup } from './pages/index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Netflix />} />
      </Routes>
    </Router>
  )
}

export default App