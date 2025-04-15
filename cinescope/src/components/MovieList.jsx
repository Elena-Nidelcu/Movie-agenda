import '../styles/MovieList.css';

export default function MovieList({ movies, handleEdit, handleDelete, toggleLike }) {
  return (
    <div className="movie-list-wrapper">
      <h2 className="movie-list-heading">🎬 Movie Collection</h2>
      <ul className="movie-list">
        {movies.map((movie, index) => (
          <li key={index} className="movie-card">
            <button
              onClick={() => toggleLike(index)}
              className="like-button"
              aria-label="Toggle Like"
            >
              {movie.liked ? '❤️' : '🤍'}
            </button>

            <h3 className="movie-title">
              {movie.title} <span className="movie-year">({movie.year})</span>
            </h3>

            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
            <p><strong>Rating:</strong> {movie.rating || 'N/A'}</p>
            <p><strong>Duration:</strong> {movie.duration || 'N/A'} min</p>

            <div className="card-actions">
              <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
