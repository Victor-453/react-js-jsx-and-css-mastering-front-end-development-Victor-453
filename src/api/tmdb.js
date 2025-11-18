// WARNING: Do NOT commit your actual TMDB API key. It must come from the .env file as VITE_TMDB_API_KEY.
// This module provides low-level TMDB API functions with simple in-memory caching to reduce duplicate requests.

// Read API key from Vite environment. Ensure you have a .env with VITE_TMDB_API_KEY=your_key
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

// Simple in-memory cache (clears on page refresh). Keyed by full URL.
const _cache = new Map();

async function fetchWithCache(url) {
  if (!API_KEY) {
    throw new Error(
      'TMDB API key missing. Set VITE_TMDB_API_KEY in your .env file.'
    );
  }
  if (_cache.has(url)) {
    return _cache.get(url);
  }
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`TMDB request failed ${res.status}. ${text.slice(0, 120)}`);
  }
  const data = await res.json();
  _cache.set(url, data);
  return data;
}

function buildUrl(path, params = {}) {
  const qs = new URLSearchParams();
  qs.set('api_key', API_KEY || '');
  qs.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  return `${BASE}${path}?${qs.toString()}`;
}

export async function searchMulti(query, page = 1) {
  return fetchWithCache(
    buildUrl('/search/multi', { query, page, include_adult: 'false' })
  );
}

export async function getPopularMovies(page = 1) {
  return fetchWithCache(buildUrl('/movie/popular', { page }));
}

export async function getPopularTv(page = 1) {
  return fetchWithCache(buildUrl('/tv/popular', { page }));
}

export async function getMovie(id) {
  return fetchWithCache(buildUrl(`/movie/${id}`, {}));
}

export async function getTv(id) {
  return fetchWithCache(buildUrl(`/tv/${id}`, {}));
}

export async function getMovieCredits(id) {
  return fetchWithCache(buildUrl(`/movie/${id}/credits`, {}));
}

export async function getTvCredits(id) {
  return fetchWithCache(buildUrl(`/tv/${id}/credits`, {}));
}

export async function getSimilarMovies(id, page = 1) {
  return fetchWithCache(buildUrl(`/movie/${id}/similar`, { page }));
}

export async function getSimilarTv(id, page = 1) {
  return fetchWithCache(buildUrl(`/tv/${id}/similar`, { page }));
}

// Generic helper if needed elsewhere
export async function getByUrl(url) {
  return fetchWithCache(url);
}

// Expose cache size (debug)
export function getCacheSize() {
  return _cache.size;
}

// Utility to quickly verify key presence from components/tests
export function hasApiKey() {
  return Boolean(API_KEY);
}
