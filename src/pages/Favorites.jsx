import { useEffect, useState } from 'react';
import Grid from '../components/Grid.jsx';
import Card from '../components/Card.jsx';

const STORAGE_KEY = 'favorites';
function readFavs() {
  try {
    const r = localStorage.getItem(STORAGE_KEY);
    return r ? JSON.parse(r) : [];
  } catch {
    /* ignore */ return [];
  }
}

export default function Favorites() {
  const [items, setItems] = useState(() => readFavs());

  useEffect(() => {
    function sync(e) {
      if (e.key === STORAGE_KEY) setItems(readFavs());
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  function remove(id, media_type) {
    const next = items.filter(
      (f) => !(f.id === id && f.media_type === media_type)
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setItems(next);
  }

  if (!items.length) return <p className='text-gray-400'>No favorites yet.</p>;

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Your Favorites</h2>
      <Grid>
        {items.map((it) => (
          <div key={`${it.media_type}-${it.id}`} className='relative'>
            <Card item={it} />
            <button
              aria-label='Remove favorite'
              onClick={() => remove(it.id, it.media_type)}
              className='absolute top-2 left-2 bg-red-700 text-xs px-2 py-1 rounded hover:bg-red-600'
            >
              Remove
            </button>
          </div>
        ))}
      </Grid>
    </div>
  );
}
