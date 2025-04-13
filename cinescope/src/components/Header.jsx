export default function Header({ theme, setTheme }) {
    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  
    return (
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 CineScope</h1>
        <button onClick={toggleTheme} className="px-4 py-2 border rounded">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
    )
  }
  