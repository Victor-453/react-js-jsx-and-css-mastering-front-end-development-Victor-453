# MovieFlix (React + Vite + Tailwind)

Single-page application for browsing movies & TV series using the [TMDB API](https://www.themoviedb.org/). Built with React, React Router, Tailwind CSS, and Vite.

## Features
* Popular Movies & TV lists with pagination
* Search (debounced) across movies & TV (multi search)
* Detail pages (movie / TV) with cast & similar titles
* Favorites stored in `localStorage` (persist between sessions)
* Light/Dark theme toggle (persisted)
* Reusable component library (cards, grid, pagination, loader, error box, badges)
* Simple in-memory request caching for repeated API calls
* Accessible alt text & aria labels

## Getting Started

Create a `.env` file (NOT committed) and add your TMDB key:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Install dependencies and run dev server:

```
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Project Structure
```
src/
	api/          // tmdb.js - low level API calls
	components/   // Reusable UI pieces
	context/      // ThemeContext
	hooks/        // useFetch, useLocalFavorites
	pages/        // Route pages
```

## Environment Variables
The API key is accessed via `import.meta.env.VITE_TMDB_API_KEY`. Never hardcode it; keep it only in `.env`.

If you see errors like `TMDB API key missing` or empty data results, double-check:
1. The `.env` file exists at the project root.
2. The variable name is exactly `VITE_TMDB_API_KEY`.
3. You restarted the dev server after creating/updating `.env`.
4. Your key is active (try it in a raw request: `curl "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY&language=en-US"`).

## Scripts
* `npm run dev` – start Vite dev server
* `npm run build` – production build
* `npm run preview` – preview production build

## Notes
This is a learning/demo project. For production you may want:
* Server-side rendering or hydration strategy
* More robust state management / caching (React Query, SWR, etc.)
* Better image placeholders / skeleton loaders
* Unit tests (Vitest / Testing Library)

## License
MIT (feel free to adapt).
