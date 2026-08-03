export default function SearchBar({ search, setSearch }) {
  return (
    <section className="mx-auto max-w-7xl px-6 mt-10">
      <div className="relative border-b border-stone-300 focus-within:border-stone-900">
        <svg
          className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search artifacts..."
          className="w-full border-0 bg-transparent py-4 pl-8 pr-1 text-stone-700 placeholder-stone-400 focus:outline-none"
        />
      </div>
    </section>
  );
}