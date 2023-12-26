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
import Profile from './auth/Profile.js';
import LinkSaver from './page/LinkSaver.js';
import Untitled from './page/Untitled.js';
import IndividualNotes from './page/IndividualNotes.js';
import User from './page/User.js';
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
          <Route path='notes/untitled=1' element={<Untitled />} />
          <Route path='friend/list' element={<FriendList />} />
          <Route path='link' element={<LinkSaver />} />
          <Route path='leaderboard' element={<Leaderboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='notes/page/:id' element={<IndividualNotes />} />
          <Route path='user/:id' element={<User />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;