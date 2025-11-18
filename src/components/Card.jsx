import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import ToggleFavoriteBtn from './ToggleFavoriteBtn.jsx';

export default function Card({ item }) {
  if (!item) return null;
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const linkTo = mediaType === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;
  const title = item.title || item.name;
  const vote = item.vote_average?.toFixed(1);
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : '';

  return (
    <div className='relative group bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-xl transition shadow-gray-900'>
      <Link
        to={linkTo}
        aria-label={`View details for ${title}`}
        className='block'
      >
        {poster ? (
          <img
            src={poster}
            alt={title}
            className='w-full h-64 object-cover group-hover:scale-105 transition-transform'
          />
        ) : (
          <div className='w-full h-64 flex items-center justify-center bg-gray-700'>
            No Image
          </div>
        )}
        <div className='p-3 space-y-2'>
          <h3 className='text-sm font-semibold line-clamp-1'>{title}</h3>
          <p className='text-xs text-gray-400 line-clamp-3'>
            {item.overview || 'No overview available.'}
          </p>
          <div className='flex items-center gap-2 flex-wrap'>
            {vote && <Badge>{vote}</Badge>}
            <Badge variant='secondary'>{mediaType}</Badge>
          </div>
        </div>
      </Link>
      <div className='absolute top-2 right-2'>
        <ToggleFavoriteBtn
          item={{
            id: item.id,
            media_type: mediaType,
            title,
            poster_path: item.poster_path,
          }}
        />
      </div>
    </div>
  );
}
