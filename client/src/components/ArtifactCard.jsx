import { Link } from "react-router-dom";

export default function ArtifactCard({ artifact }) {
  return (
    <Link to={`/artifact/${artifact._id}`} className="group block">
      <div className="overflow-hidden bg-stone-100">
        <img
          src={artifact.image}
          alt={artifact.title}
          className="h-80 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="pt-5">
        <h3 className="font-serif text-xl text-stone-800">
          {artifact.title}
        </h3>

        <p className="mt-1 text-sm text-stone-500">
          {artifact.museum}
        </p>

        <div className="mt-4 flex items-center gap-5 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
              <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3.5C14 6 15.5 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
            </svg>
            {artifact.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {artifact.views}
          </span>
        </div>
      </div>
    </Link>
  );
}