// src/components/Bookshelf.jsx

import React, { useState, useEffect } from 'react';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBooks);
  }, []);

  const handleRemove = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="bookshelf">
      <h1>My Bookshelf</h1>
      {bookshelf.length > 0 ? (
        <div className="book-list">
          {bookshelf.map((book) => (
            <div className="book-card" key={book.key}>
              <h2>{book.title}</h2>
              <p>{book.author_name}</p>
              <button onClick={() => handleRemove(book)}>Remove from Bookshelf</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your bookshelf is empty.</p>
      )}
    </div>
  );
};

export default Bookshelf;
