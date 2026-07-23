import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-stone-700"
        >
          🏛 Virtual Museum
        </Link>

        <div className="flex gap-8 text-gray-600 font-medium">

          <Link to="/">Home</Link>

          <Link to="/explore">Explore</Link>

          <Link to="/about">About</Link>
          <Link
            to="/admin"
            className="hover:text-amber-500 transition"
          >
            Admin
          </Link>
        </div>

      </div>
    </nav>
  );
}