function MovieList({ movies, handleEdit, handleDelete, toggleLike }) {
    return (
      <ul className="grid gap-4">
        {movies.map((m, i) => (
          <li key={i} className="border p-4 rounded shadow bg-white dark:bg-zinc-800 dark:text-white relative">
            <h2 className="text-lg font-semibold">{m.title} ({m.year})</h2>
            <p>🎬 Directed by: {m.director}</p>
            <p>🎞 Genre: {m.genre || 'N/A'}</p>
            <p>⭐ Rating: {m.rating || 'N/A'}</p>
            <p>⏱ Duration: {m.duration || 'N/A'} min</p>
            <button
              onClick={() => handleEdit(i)}
              className="absolute bottom-2 right-20 px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(i)}
              className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => toggleLike(i)}
              className="absolute top-2 left-2 text-xl"
              aria-label="Toggle Like"
            >
              {m.liked ? '❤️' : '🤍'}
            </button>
          </li>
        ))}
      </ul>
    )
  }
  
  export default MovieList
  