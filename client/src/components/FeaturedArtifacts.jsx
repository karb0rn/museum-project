import { Link } from "react-router-dom";

export default function FeaturedArtifact({ artifacts }) {
  if (!artifacts.length) return null;

  const featured = [...artifacts].sort(
    (a, b) => b.views - a.views
  )[0];

  return (
    <section className="mt-20">
      <div className="bg-stone-900 text-white">
        <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-2">

          <img
            src={featured.image}
            alt={featured.title}
            className="h-96 w-full object-cover md:h-full"
          />

          <div className="flex flex-col justify-center px-8 py-14 md:px-16">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
              Featured Artifact
            </p>

            <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-white md:text-5xl">
              {featured.title}
            </h2>

            <p className="mt-6 max-w-md leading-7 text-stone-300">
              {featured.description}
            </p>

            <div className="mt-8 flex items-center gap-6 text-sm text-stone-300">
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3.5C14 6 15.5 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
                </svg>
                {featured.likes}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {featured.views}
              </span>
            </div>

            <Link
              to={`/artifact/${featured._id}`}
              className="mt-10 inline-block w-fit border border-white/70 px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:border-amber-300 hover:bg-white hover:text-stone-900"
            >
              Explore in 3D
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}