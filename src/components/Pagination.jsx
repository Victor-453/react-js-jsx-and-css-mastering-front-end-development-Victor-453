export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className='flex items-center gap-4 justify-center my-6'>
      <button
        aria-label='Previous page'
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className='px-3 py-2 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600'
      >
        Prev
      </button>
      <span className='text-sm text-gray-300'>
        Page {page} {totalPages ? `of ${totalPages}` : ''}
      </span>
      <button
        aria-label='Next page'
        disabled={totalPages && page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className='px-3 py-2 rounded bg-gray-700 disabled:opacity-40 hover:bg-gray-600'
      >
        Next
      </button>
    </div>
  );
}
