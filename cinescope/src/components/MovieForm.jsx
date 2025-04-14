import React, { useState } from 'react';
import '../styles/Form.css';

export default function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !year || !genre || !rating || !director || !duration) return;

    onAddMovie({ title, year, genre, rating, director, duration });
    setTitle('');
    setYear('');
    setGenre('');
    setRating('');
    setDirector('');
    setDuration('');
  };

  return (
    <div className="movie-form-container">
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="form-group">
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Thriller</option>
          </select>
          <input placeholder="Rating (1–10)" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div className="form-group">
          <input placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
          <input placeholder="Duration (e.g. 120)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <button className="form-button">Add Movie</button>
      </form>
    </div>
  );
}
