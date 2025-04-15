import '../styles/Header.css';
import '../styles/ToggleSwitch.css';
import '../styles/Button.css';

export default function Header({ theme, setTheme }) {
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  
  return (
    <header className={`header-container ${theme}-theme`}>
      <div className="logo-section">
        <span className="logo">🎬</span>
        <h1 className="app-title">CineScope</h1>
      </div>
      
      <div className="theme-toggle-section">
        <span className="theme-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
        <label className="switch">
          <input 
            type="checkbox" 
            onChange={toggleTheme} 
            checked={theme === 'dark'} 
            aria-label="Toggle theme"
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
}