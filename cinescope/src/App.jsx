import { useEffect, useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light')
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('watchedMovies')
    return stored ? JSON.parse(stored) : []
  })

  const [form, setForm] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    director: '',
    duration: '' 
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(movies))
  }, [movies])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.title && form.year && form.director) {
      setMovies([...movies, form])
      setForm({ title: '', year: '', genre: '', rating: '', director: '' })
    }
    if (form.title && form.year && form.director) {
      setMovies([...movies, { ...form, liked: false }])
      setForm({ title: '', year: '', genre: '', rating: '', director: '' })
    }
  }

  const handleDelete = (index) => {
    const updated = movies.filter((_, i) => i !== index)
    setMovies(updated)
  }  

  const toggleLike = (index) => {
    const updated = movies.map((movie, i) =>
      i === index ? { ...movie, liked: !movie.liked } : movie
    )
    setMovies(updated)
  }
  

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎥 Watched Movies</h1>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="px-4 py-2 border rounded">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-2 max-w-md mb-6">
        <input className="border p-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="border p-2" name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input className="border p-2" name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <input className="border p-2" name="rating" placeholder="Rating (1-10)" value={form.rating} onChange={handleChange} />
        <input className="border p-2" name="director" placeholder="Director" value={form.director} onChange={handleChange} />
        <input className="border p-2" name="duration" placeholder="Duration (e.g. 120 min)" value={form.duration} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Add Movie</button>
      </form>

      <ul className="grid gap-4">
        {movies.map((m, i) => (
          <li key={i} className="border p-4 rounded shadow bg-white dark:bg-zinc-800 dark:text-white relative">
            <h2 className="text-lg font-semibold">{m.title} ({m.year})</h2>
            <p>🎬 Directed by: {m.director}</p>
            <p>🎞 Genre: {m.genre || 'N/A'}</p>
            <p>⭐ Rating: {m.rating || 'N/A'}</p>
            <p>⏱ Duration: {m.duration || 'N/A'}</p>
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

    </div>
  )
}

export default App
