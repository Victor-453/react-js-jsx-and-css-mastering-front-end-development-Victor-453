import { useParams } from 'react-router-dom';
import { getMovie, getMovieCredits, getSimilarMovies } from '../api/tmdb.js';
import { useFetch } from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorBox from '../components/ErrorBox.jsx';
import Card from '../components/Card.jsx';
import Grid from '../components/Grid.jsx';
import ToggleFavoriteBtn from '../components/ToggleFavoriteBtn.jsx';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = useFetch(() => getMovie(id), { deps: [id] });
  const credits = useFetch(() => getMovieCredits(id), { deps: [id] });
  const similar = useFetch(() => getSimilarMovies(id), { deps: [id] });

  if (movie.loading) return <Loader />;
  if (movie.error)
    return <ErrorBox message={movie.error.message} onRetry={movie.refetch} />;
  if (!movie.data) return null;

  const m = movie.data;
  const poster = m.poster_path
    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
    : '';

  return (
    <div className='space-y-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        {poster && (
          <img src={poster} alt={m.title} className='w-64 rounded shadow' />
        )}
        <div className='flex-1 space-y-4'>
          <h1 className='text-3xl font-bold'>{m.title}</h1>
          <p className='text-gray-300 max-w-prose'>{m.overview}</p>
          <p className='text-sm text-gray-400'>
            Release: {m.release_date || 'N/A'} | Runtime:{' '}
            {m.runtime ? `${m.runtime} min` : 'N/A'}
          </p>
          <div className='flex items-center gap-3'>
            <ToggleFavoriteBtn
              item={{
                id: m.id,
                media_type: 'movie',
                title: m.title,
                poster_path: m.poster_path,
              }}
            />
          </div>
          {credits.data && (
            <div>
              <h2 className='font-semibold mt-4 mb-2'>Cast</h2>
              <ul className='flex flex-wrap gap-3 text-sm text-gray-200'>
                {credits.data.cast.slice(0, 6).map((c) => (
                  <li key={c.cast_id}>{c.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Similar Movies</h2>
        {similar.loading && <Loader />}
        {similar.error && (
          <ErrorBox message={similar.error.message} onRetry={similar.refetch} />
        )}
        {similar.data && (
          <Grid>
            {similar.data.results.slice(0, 8).map((s) => (
              <Card key={s.id} item={{ ...s, media_type: 'movie' }} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
