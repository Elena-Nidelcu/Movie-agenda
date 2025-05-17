// MODIFIED App.jsx with JWT token, backend integration, and pagination support
import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import MovieForm from './components/MovieForm.jsx';
import Filters from './components/Filters.jsx';
import MovieList from './components/MovieList.jsx';
import './styles/Button.css';
import './styles/App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);

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

  const [offset, setOffset] = useState(0);
  const limit = 3; // Number of movies per page

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch(`http://localhost:8000/movies?offset=${offset}&limit=${limit}`)
      .then(res => res.json())
      .then(setMovies);
  }, [offset]);

  useEffect(() => {
    fetch("http://localhost:8000/token?role=ADMIN&permissions=WRITE", { method: "POST" })
      .then(res => res.json())
      .then(data => setToken(data.access_token));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.director || isNaN(parseInt(form.year))) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const payload = {
      id: editIndex !== null ? movies[editIndex].id : Date.now(),
      title: form.title.trim(),
      year: parseInt(form.year),
      genre: form.genre.trim() || null,
      rating: parseInt(form.rating),
      director: form.director.trim(),
      duration: parseInt(form.duration),
      liked: editIndex !== null ? movies[editIndex].liked : false
    };

    const method = editIndex !== null ? "PUT" : "POST";
    const url = editIndex !== null
      ? `http://localhost:8000/movies/${movies[editIndex].id}`
      : "http://localhost:8000/movies";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(movie => {
        if (editIndex !== null) {
          const updated = [...movies];
          updated[editIndex] = movie;
          setMovies(updated);
          setEditIndex(null);
        } else {
          setOffset(0); // Refresh first page
        }

        setForm({
          title: '',
          year: '',
          genre: '',
          rating: '',
          director: '',
          duration: '',
        });
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(movies[index]);
  };

  const handleDelete = (index) => {
    const id = movies[index].id;
    fetch(`http://localhost:8000/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(() => {
        setOffset(0); // Refresh after deletion
      });
  };

  const toggleLike = (index) => {
    const updatedMovie = { ...movies[index], liked: !movies[index].liked };
    fetch(`http://localhost:8000/movies/${updatedMovie.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedMovie)
    })
      .then(res => res.json())
      .then((updated) => {
        const updatedList = [...movies];
        updatedList[index] = updated;
        setMovies(updatedList);
      });
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
      <div className="container component-spacing">
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
        <div className="flex gap-4 justify-center mt-4">
          <button
            className="pagination-button"
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
          >
            Previous
          </button>
          <button
            className="pagination-button"
            onClick={() => setOffset(offset + limit)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
