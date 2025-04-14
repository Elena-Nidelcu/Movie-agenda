import React, { useState } from 'react';
import '../styles/Form.css';

export default function MovieForm({ form, handleChange, handleSubmit, editIndex }) {
  return (
    <div className="movie-form-container">
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <input
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            placeholder="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            <option>Action</option>
            <option>Animation</option>
            <option>Biography</option>
            <option>Comedy</option>
            <option>Crime</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>History</option>
            <option>Horror</option>
            <option>Mistery</option>
            <option>Music</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Sport</option>
            <option>Thriller</option>
            <option>War</option>
            <option>Western</option>
          </select>
          <input
            placeholder="Rating (1–10)"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Director"
            name="director"
            value={form.director}
            onChange={handleChange}
          />
          <input
            placeholder="Duration (e.g. 120)"
            name="duration"
            value={form.duration}
            onChange={handleChange}
          />
        </div>
        <button className="form-button">
          {editIndex !== null ? "Edit Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
}
