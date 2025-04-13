import MovieCard from './MovieCard'

export default function MovieList({ movies, setMovies }) {
  const handleDelete = (index) => {
    const newList = [...movies]
    newList.splice(index, 1)
    setMovies(newList)
  }

  const toggleLike = (index) => {
    const newList = [...movies]
    newList[index].liked = !newList[index].liked
    setMovies(newList)
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {movies.map((movie, i) => (
        <MovieCard key={i} movie={movie} onDelete={() => handleDelete(i)} onToggleLike={() => toggleLike(i)} />
      ))}
    </div>
  )
}
