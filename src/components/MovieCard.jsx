export default function MovieCard({ movie, onDelete, onToggleLike }) {
    return (
      <div className="border p-4 rounded shadow bg-white dark:bg-zinc-800 dark:text-white">
        <h2 className="text-lg font-semibold">{movie.title} ({movie.year})</h2>
        <div className="mt-2">
          <button onClick={onToggleLike} className="text-yellow-500 mr-2">
            {movie.liked ? '★' : '☆'}
          </button>
          <button onClick={onDelete} className="text-red-500">
            🗑 Delete
          </button>
        </div>
      </div>
    )
  }
  