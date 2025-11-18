export default function Loader() {
  return (
    <div
      className='flex justify-center py-10'
      role='status'
      aria-label='Loading'
    >
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-yellow-400' />
    </div>
  );
}
