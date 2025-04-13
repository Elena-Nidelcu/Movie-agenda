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

  const [editIndex, setEditIndex] = useState(null)

  const [filters, setFilters] = useState({
    minRating: '',
    maxRating: '',
    genre: '',
    minDuration: '',
    maxDuration: '',
    searchTitle: '',
    searchDirector: ''
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.title && form.year && form.director) {
      if (editIndex !== null) {
        const updated = [...movies]
        updated[editIndex] = { ...form, liked: movies[editIndex].liked || false }
        setMovies(updated)
        setEditIndex(null)
      } else {
        setMovies([...movies, { ...form, liked: false }])
      }

      setForm({
        title: '',
        year: '',
        genre: '',
        rating: '',
        director: '',
        duration: ''
      })
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setForm(movies[index])
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

  const filteredMovies = movies.filter(m => {
    const rating = parseFloat(m.rating)
    const duration = parseInt(m.duration)

    const passesRating =
      (!filters.minRating || rating >= parseFloat(filters.minRating)) &&
      (!filters.maxRating || rating <= parseFloat(filters.maxRating))

    const passesGenre =
      !filters.genre || m.genre === filters.genre

    const passesDuration =
      (!filters.minDuration || duration >= parseInt(filters.minDuration)) &&
      (!filters.maxDuration || duration <= parseInt(filters.maxDuration))

    const passesTitle =
      !filters.searchTitle ||
      m.title.toLowerCase().includes(filters.searchTitle.toLowerCase())

    const passesDirector =
      !filters.searchDirector ||
      m.director.toLowerCase().includes(filters.searchDirector.toLowerCase())

    return passesRating && passesGenre && passesDuration && passesTitle && passesDirector
  })

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎥 Watched Movies</h1>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="px-4 py-2 border rounded">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="grid gap-2 max-w-md mb-6">
        <input className="border p-2" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="border p-2" name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <select className="border p-2" name="genre" value={form.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="War">War</option>
          <option value="Thriller">Thriller</option>
          <option value="Biography">Biography</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Romance">Romance</option>
          <option value="Animation">Animation</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Music">Music</option>
          <option value="Sport">Sport</option>
          <option value="Western">Western</option>
          <option value="Mystery">Mystery</option>
        </select>
        <input className="border p-2" name="rating" placeholder="Rating (1-10)" value={form.rating} onChange={handleChange} />
        <input className="border p-2" name="director" placeholder="Director" value={form.director} onChange={handleChange} />
        <input className="border p-2" name="duration" placeholder="Duration (e.g. 120)" value={form.duration} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          {editIndex !== null ? 'Save Changes' : 'Add Movie'}
        </button>
      </form>

      {/* Filters */}
      <div className="grid gap-2 max-w-md mb-6">
        <h2 className="text-lg font-semibold">🔍 Filter Movies</h2>
        <input className="border p-2" name="searchTitle" placeholder="Search by Title" value={filters.searchTitle} onChange={handleFilterChange} />
        <input className="border p-2" name="searchDirector" placeholder="Search by Director" value={filters.searchDirector} onChange={handleFilterChange} />
        <input className="border p-2" name="minRating" placeholder="Min Rating" value={filters.minRating} onChange={handleFilterChange} />
        <input className="border p-2" name="maxRating" placeholder="Max Rating" value={filters.maxRating} onChange={handleFilterChange} />
        <select className="border p-2" name="genre" value={filters.genre} onChange={handleFilterChange}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="War">War</option>
          <option value="Thriller">Thriller</option>
          <option value="Biography">Biography</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Romance">Romance</option>
          <option value="Animation">Animation</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="History">History</option>
          <option value="Music">Music</option>
          <option value="Sport">Sport</option>
          <option value="Western">Western</option>
          <option value="Mystery">Mystery</option>
        </select>
        <input className="border p-2" name="minDuration" placeholder="Min Duration (min)" value={filters.minDuration} onChange={handleFilterChange} />
        <input className="border p-2" name="maxDuration" placeholder="Max Duration (min)" value={filters.maxDuration} onChange={handleFilterChange} />
      </div>

      {/* Movie List */}
      <ul className="grid gap-4">
        {filteredMovies.map((m, i) => (
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
    </div>
  )
}

export default App
