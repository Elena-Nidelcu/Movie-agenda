import '../styles/Filters.css';

function Filters({ filters, handleFilterChange }) {
  return (
    <div className="filter-form-container">
      <h2 className="text-lg font-semibold mb-2">🔍 Filter Movies</h2>
      <form className="filter-form">
        <div className="filter-group">
          <input name="searchTitle" placeholder="Search by Title" value={filters.searchTitle} onChange={handleFilterChange} />
          <input name="searchDirector" placeholder="Search by Director" value={filters.searchDirector} onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <input name="minRating" placeholder="Min Rating" value={filters.minRating} onChange={handleFilterChange} />
          <input name="maxRating" placeholder="Max Rating" value={filters.maxRating} onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
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
        </div>
        <div className="filter-group">
          <input name="minDuration" placeholder="Min Duration (min)" value={filters.minDuration} onChange={handleFilterChange} />
          <input name="maxDuration" placeholder="Max Duration (min)" value={filters.maxDuration} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
}

export default Filters;
