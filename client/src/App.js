// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Header from './components/Header';
import Home from './components/Home';
import Register from './pages/Register/Register';
import GetInTouch from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import './App.css';
import Blog from './pages/Blog/Blog';
import NewPost from './pages/Blog/NewPost';
import Search from './pages/Search/Search';
import Team from './pages/Team/Team';

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/" element={<Header />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<GetInTouch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
