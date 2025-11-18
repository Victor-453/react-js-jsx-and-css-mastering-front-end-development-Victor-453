import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchMulti } from '../api/tmdb.js';
import { useFetch } from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorBox from '../components/ErrorBox.jsx';
import Grid from '../components/Grid.jsx';
import Card from '../components/Card.jsx';
import Pagination from '../components/Pagination.jsx';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const pageParam = parseInt(params.get('page') || '1', 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  const results = useFetch(() => searchMulti(q, page), {
    deps: [q, page],
    enabled: !!q,
  });

  function handlePageChange(next) {
    const p = Math.max(1, next);
    params.set('page', p.toString());
    navigate(`/search?${params.toString()}`);
  }

  if (!q) return <p className='text-gray-400'>Enter a search term above.</p>;

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Results for "{q}"</h2>
      {results.loading && <Loader />}
      {results.error && (
        <ErrorBox message={results.error.message} onRetry={results.refetch} />
      )}
      {results.data && (
        <>
          <Grid>
            {results.data.results.map((r) => (
              <Card key={`${r.media_type}-${r.id}`} item={r} />
            ))}
          </Grid>
          <Pagination
            page={page}
            totalPages={results.data.total_pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
