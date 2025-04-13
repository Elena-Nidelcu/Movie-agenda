function MovieForm({ form, handleChange, handleSubmit, editIndex }) {
    return (
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
    )
  }
  
  export default MovieForm
  