// src/components/Header.jsx
import '../styles/ToggleSwitch.css'
import '../styles/Button.css';

export default function Header({ theme, setTheme }) {
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">🎬 CineScope</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm">{theme === 'light' ? '☀️' : '🌙'}</span>
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  )
}
