export default function Badge({ children, variant = 'primary' }) {
  const cls =
    variant === 'secondary'
      ? 'bg-gray-700 text-gray-200'
      : 'bg-yellow-500 text-black';
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${cls}`}>
      {children}
    </span>
  );
}
