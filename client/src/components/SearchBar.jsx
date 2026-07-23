export default function SearchBar({ search, setSearch }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search artifacts..."
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-5
          py-4
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-stone-500
        "
      />
    </section>
  );
}