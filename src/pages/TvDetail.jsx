import { useParams } from 'react-router-dom';
import { getTv, getTvCredits, getSimilarTv } from '../api/tmdb.js';
import { useFetch } from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorBox from '../components/ErrorBox.jsx';
import Card from '../components/Card.jsx';
import Grid from '../components/Grid.jsx';
import ToggleFavoriteBtn from '../components/ToggleFavoriteBtn.jsx';

export default function TvDetail() {
  const { id } = useParams();
  const tv = useFetch(() => getTv(id), { deps: [id] });
  const credits = useFetch(() => getTvCredits(id), { deps: [id] });
  const similar = useFetch(() => getSimilarTv(id), { deps: [id] });

  if (tv.loading) return <Loader />;
  if (tv.error)
    return <ErrorBox message={tv.error.message} onRetry={tv.refetch} />;
  if (!tv.data) return null;

  const t = tv.data;
  const poster = t.poster_path
    ? `https://image.tmdb.org/t/p/w500${t.poster_path}`
    : '';

  return (
    <div className='space-y-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        {poster && (
          <img src={poster} alt={t.name} className='w-64 rounded shadow' />
        )}
        <div className='flex-1 space-y-4'>
          <h1 className='text-3xl font-bold'>{t.name}</h1>
          <p className='text-gray-300 max-w-prose'>{t.overview}</p>
          <p className='text-sm text-gray-400'>
            First Air: {t.first_air_date || 'N/A'} | Episodes:{' '}
            {t.number_of_episodes || 'N/A'}
          </p>
          <div className='flex items-center gap-3'>
            <ToggleFavoriteBtn
              item={{
                id: t.id,
                media_type: 'tv',
                title: t.name,
                poster_path: t.poster_path,
              }}
            />
          </div>
          {credits.data && (
            <div>
              <h2 className='font-semibold mt-4 mb-2'>Cast</h2>
              <ul className='flex flex-wrap gap-3 text-sm text-gray-200'>
                {credits.data.cast.slice(0, 6).map((c) => (
                  <li key={c.credit_id}>{c.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Similar Series</h2>
        {similar.loading && <Loader />}
        {similar.error && (
          <ErrorBox message={similar.error.message} onRetry={similar.refetch} />
        )}
        {similar.data && (
          <Grid>
            {similar.data.results.slice(0, 8).map((s) => (
              <Card key={s.id} item={{ ...s, media_type: 'tv' }} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
