import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  // Debounce search
  useEffect(() => {
    const handle = setTimeout(() => {
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [query, navigate]);

  return (
    <header className='sticky top-0 z-20 bg-gray-800 text-white shadow-md'>
      <div className='max-w-7xl mx-auto flex items-center gap-4 px-4 py-3'>
        <Link to='/' className='font-bold text-xl tracking-wide'>
          MovieFlix
        </Link>
        <nav className='flex gap-4 text-sm'>
          <Link className='hover:text-yellow-400' to='/'>
            Home
          </Link>
          <Link className='hover:text-yellow-400' to='/favorites'>
            Favorites
          </Link>
        </nav>
        <div className='flex-1' />
        <div className='flex items-center gap-2'>
          <input
            aria-label='Search titles'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search...'
            className='w-40 md:w-64 bg-gray-700 focus:bg-gray-600 transition-colors text-sm px-3 py-2 rounded outline-none'
          />
          <button
            aria-label='Toggle theme'
            onClick={toggleTheme}
            className='p-2 rounded bg-gray-700 hover:bg-gray-600'
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
