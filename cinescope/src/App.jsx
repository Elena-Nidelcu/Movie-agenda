import { useEffect, useState } from 'react'
import Header from './components/Header'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'

function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movies')
    return saved ? JSON.parse(saved) : []
  })

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 transition-colors">
      <Header theme={theme} setTheme={setTheme} />
      <MovieForm onAdd={(movie) => setMovies([...movies, movie])} />
      <MovieList movies={movies} setMovies={setMovies} />
    </div>
  )
}

export default App
