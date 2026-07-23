import { Link } from "react-router-dom";

export default function ArtifactCard({ artifact }) {
  return (
    <Link to={`/artifact/${artifact._id}`}>
      <div
        className="
          bg-white
          rounded-xl
          overflow-hidden
          shadow-sm
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <div className="overflow-hidden">
          <img
            src={artifact.image}
            alt={artifact.title}
            className="
              w-full
              h-72
              object-cover
              transition-transform
              duration-300
              hover:scale-110
            "
          />
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg">
            {artifact.title}
          </h3>

          <p className="text-gray-500">
            {artifact.museum}
          </p>

          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>❤️ {artifact.likes}</span>
            <span>👁️ {artifact.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}