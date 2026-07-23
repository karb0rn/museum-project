import { Link } from "react-router-dom";

export default function FeaturedArtifact({ artifacts }) {
  if (!artifacts.length) return null;

  const featured = [...artifacts].sort(
    (a, b) => b.views - a.views
  )[0];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-12">
      <div className="bg-stone-900 text-white rounded-2xl overflow-hidden shadow-xl">

        <div className="grid md:grid-cols-2 items-center">

          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-10">

            <p className="text-amber-400 font-semibold text-lg">
              ⭐ Featured Artifact
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {featured.title}
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              {featured.description}
            </p>

            <div className="flex gap-8 mt-8 text-lg">
              <span>❤️ {featured.likes}</span>
              <span>👁️ {featured.views}</span>
            </div>

            <Link
              to={`/artifact/${featured._id}`}
              className="inline-block mt-10 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Explore in 3D
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}