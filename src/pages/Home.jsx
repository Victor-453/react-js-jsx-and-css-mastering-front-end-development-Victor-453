import { useState } from 'react';
import { getPopularMovies, getPopularTv } from '../api/tmdb.js';
import { useFetch } from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorBox from '../components/ErrorBox.jsx';
import Grid from '../components/Grid.jsx';
import Card from '../components/Card.jsx';
import Pagination from '../components/Pagination.jsx';

export default function Home() {
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);

  const movies = useFetch(() => getPopularMovies(moviePage), {
    deps: [moviePage],
  });
  const tv = useFetch(() => getPopularTv(tvPage), { deps: [tvPage] });

  return (
    <div className='space-y-10'>
      <section>
        <h2 className='text-xl font-semibold mb-4'>Popular Movies</h2>
        {movies.loading && <Loader />}
        {movies.error && (
          <ErrorBox message={movies.error.message} onRetry={movies.refetch} />
        )}
        {movies.data && (
          <>
            <Grid>
              {movies.data.results.map((m) => (
                <Card key={`m-${m.id}`} item={{ ...m, media_type: 'movie' }} />
              ))}
            </Grid>
            <Pagination
              page={moviePage}
              totalPages={movies.data.total_pages}
              onPageChange={setMoviePage}
            />
          </>
        )}
      </section>
      <section>
        <h2 className='text-xl font-semibold mb-4'>Popular TV Series</h2>
        {tv.loading && <Loader />}
        {tv.error && (
          <ErrorBox message={tv.error.message} onRetry={tv.refetch} />
        )}
        {tv.data && (
          <>
            <Grid>
              {tv.data.results.map((t) => (
                <Card key={`t-${t.id}`} item={{ ...t, media_type: 'tv' }} />
              ))}
            </Grid>
            <Pagination
              page={tvPage}
              totalPages={tv.data.total_pages}
              onPageChange={setTvPage}
            />
          </>
        )}
      </section>
    </div>
  );
}
