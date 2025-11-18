export default function ErrorBox({ message, onRetry }) {
  return (
    <div
      className='bg-red-900/40 border border-red-700 p-4 rounded text-red-200 flex flex-col gap-2'
      role='alert'
    >
      <p className='text-sm font-semibold'>
        {message || 'Something went wrong.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className='self-start px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-sm'
          aria-label='Retry request'
        >
          Retry
        </button>
      )}
    </div>
  );
}
