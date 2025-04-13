function Header({ theme, setTheme }) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎥 Watched Movies</h1>
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="px-4 py-2 border rounded">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    )
  }
  
  export default Header
  