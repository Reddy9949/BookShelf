import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App'; 

const API_URL = 'https://openlibrary.org/search.json'; // Define your API_URL correctly

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    // Load bookshelf from localStorage on initial render
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`${API_URL}?q=${searchQuery}&limit=10&page=1`)
        .then(res => {
          console.log(res.data);
          setBooks(res.data.docs || []); // Adjusting to Open Library API response structure
        })
        .catch(err => console.log(err));
    } else {
      setBooks([]); // Clear books when search query is empty
    }
  }, [searchQuery]);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const isBookInBookshelf = (book) => {
    return bookshelf.some(b => b.key === book.key);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchQuery(searchQuery)} className="search-button">Search</button>
      </div>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card"> {/* Assuming index is unique for simplicity */}
              <h2>{book.title}</h2>
              <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
              <button
                onClick={() => addToBookshelf(book)}
                disabled={isBookInBookshelf(book)}
              >
                {isBookInBookshelf(book) ? 'Added' : 'Add to Bookshelf'}
              </button>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default Booklist;
