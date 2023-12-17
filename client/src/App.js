import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

//general pages
import Home from './page/Home.js';
import Error404 from './page/Error404.js';

import useAuthCheck from './context/authCheck.js';
import 'react-toastify/dist/ReactToastify.css';

//auth pages
import Todo from './page/Todo.js';
import Pomorodo from './page/Pomorodo.js';
import Notes from './page/Notes.js';
import FriendList from './page/FriendList.js';
import Leaderboard from './page/Leaderboard.js';
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
          <Route path='pomorodo' element={< Pomorodo />} />
          <Route path='notes' element={<Notes />} />
          <Route path='friend/list' element={<FriendList />} />
          <Route path='leaderboard' element={<Leaderboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;