import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Booklist from './components/Booklist'; // Adjust path as necessary
import Bookshelf from './components/Bookshelf'; // Adjust path as necessary
import Home from './components/Home'; // Adjust path as necessary
import './App.css'; // Ensure this path is correct

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search Books</Link>
          </li>
          <li>
            <Link to="/bookshelf">My Bookshelf</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Booklist />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
    </div>
  );
};

export default App;
