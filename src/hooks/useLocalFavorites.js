import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'favorites';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    /* ignore */ return [];
  }
}

export function useLocalFavorites() {
  const [favorites, setFavorites] = useState(() => readStorage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const addFavorite = useCallback((item) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id && f.media_type === item.media_type)
        ? prev
        : [...prev, item]
    );
  }, []);

  const removeFavorite = useCallback((id, media_type) => {
    setFavorites((prev) =>
      prev.filter((f) => !(f.id === id && f.media_type === media_type))
    );
  }, []);

  const isFavorited = useCallback(
    (id, media_type) =>
      favorites.some((f) => f.id === id && f.media_type === media_type),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorited };
}
