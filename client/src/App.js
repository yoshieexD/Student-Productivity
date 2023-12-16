import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from './page/Home.js';
import Error404 from './page/Error404.js';
import Todo from './todo/Todo.js';
import useAuthCheck from './context/authCheck.js';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = () => {
  useAuthCheck();
  return (
    <div>
      <Outlet />
    </div>
  )
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Home />} />
        <Route path='/forgot-password' element={<Home />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/auth' element={<ProtectedRoute />}>
          <Route path='todo' element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;