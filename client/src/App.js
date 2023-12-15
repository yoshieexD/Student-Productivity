import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home.js';
import Error404 from './page/Error404.js';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard/Dashboard.js';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Home />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;