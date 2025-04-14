import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import MovieForm from './components/MovieForm.jsx';
import Filters from './components/Filters.jsx';
import MovieList from './components/MovieList.jsx';
import './styles/Button.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem('watchedMovies');
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    director: '',
    duration: '',
  });

  const [editIndex, setEditIndex] = useState(null);

  const [filters, setFilters] = useState({
    minRating: '',
    maxRating: '',
    genre: '',
    minDuration: '',
    maxDuration: '',
    searchTitle: '',
    searchDirector: '',
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(movies));
  }, [movies]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.title && form.year && form.director) {
      if (editIndex !== null) {
        const updated = [...movies];
        updated[editIndex] = { ...form, liked: movies[editIndex].liked || false };
        setMovies(updated);
        setEditIndex(null);
      } else {
        setMovies([...movies, { ...form, liked: false }]);
      }

      setForm({
        title: '',
        year: '',
        genre: '',
        rating: '',
        director: '',
        duration: '',
      });
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(movies[index]);
  };

  const handleDelete = (index) => {
    const updated = movies.filter((_, i) => i !== index);
    setMovies(updated);
  };

  const toggleLike = (index) => {
    const updated = movies.map((movie, i) =>
      i === index ? { ...movie, liked: !movie.liked } : movie
    );
    setMovies(updated);
  };

  const filteredMovies = movies.filter((m) => {
    const rating = parseFloat(m.rating);
    const duration = parseInt(m.duration);

    const passesRating =
      (!filters.minRating || rating >= parseFloat(filters.minRating)) &&
      (!filters.maxRating || rating <= parseFloat(filters.maxRating));

    const passesGenre = !filters.genre || m.genre === filters.genre;

    const passesDuration =
      (!filters.minDuration || duration >= parseInt(filters.minDuration)) &&
      (!filters.maxDuration || duration <= parseInt(filters.maxDuration));

    const passesTitle =
      !filters.searchTitle || m.title.toLowerCase().includes(filters.searchTitle.toLowerCase());

    const passesDirector =
      !filters.searchDirector ||
      m.director.toLowerCase().includes(filters.searchDirector.toLowerCase());

    return (
      passesRating &&
      passesGenre &&
      passesDuration &&
      passesTitle &&
      passesDirector
    );
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-colors">
      <Header theme={theme} setTheme={setTheme} />
      <MovieForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editIndex={editIndex}
      />
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
      <MovieList
        movies={filteredMovies}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleLike={toggleLike}
      />
    </div>
  );
}

export default App;
