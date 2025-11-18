import { useState } from 'react';

const STORAGE_KEY = 'favorites';

function readFavs() {
  try {
    const r = localStorage.getItem(STORAGE_KEY);
    return r ? JSON.parse(r) : [];
  } catch {
    /* ignore storage read errors */ return [];
  }
}
function writeFavs(favs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch {
    /* ignore storage write errors */
  }
}

export default function ToggleFavoriteBtn({ item }) {
  const [favorited, setFavorited] = useState(() =>
    readFavs().some((f) => f.id === item.id && f.media_type === item.media_type)
  );

  function toggle() {
    const favs = readFavs();
    if (favorited) {
      writeFavs(
        favs.filter(
          (f) => !(f.id === item.id && f.media_type === item.media_type)
        )
      );
      setFavorited(false);
    } else {
      writeFavs([...favs, item]);
      setFavorited(true);
    }
  }

  return (
    <button
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      onClick={toggle}
      className={`text-xl ${
        favorited ? 'text-yellow-400' : 'text-gray-300'
      } hover:scale-110 transition`}
    >
      {favorited ? '★' : '☆'}
    </button>
  );
}
