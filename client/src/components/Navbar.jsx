import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link
          to="/"
          className="font-serif text-2xl tracking-wide text-stone-800"
        >
          Virtual Museum
        </Link>

        <div className="flex items-center gap-10 text-xs font-medium uppercase tracking-widest text-stone-500">

          <Link to="/" className="transition hover:text-stone-900">
            Home
          </Link>

          <Link to="/explore" className="transition hover:text-stone-900">
            Explore
          </Link>

          <Link to="/about" className="transition hover:text-stone-900">
            About
          </Link>

          <Link
            to="/admin"
            className="border border-stone-300 px-4 py-2 tracking-widest text-stone-600 transition hover:border-amber-500 hover:text-amber-600"
          >
            Admin
          </Link>
        </div>

      </div>
    </nav>
  );
}