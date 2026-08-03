import { Html } from "@react-three/drei";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArtifactModel from "../components/ArtifactModel";
import ModelViewer from "../components/ModelViewer";

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-4 w-4"
  >
    <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3.5C14 6 15.5 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="h-4 w-4"
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function ArtifactDetails() {
  const { id } = useParams();

  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        // Increment views
        await axios.put(`/api/artifacts/${id}/view`);

        // Get updated artifact
        const res = await axios.get(`/api/artifacts/${id}`);


        setArtifact(res.data);
      } catch (err) {
        console.error("Error fetching artifact:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.put(`/api/artifacts/${artifact._id}/like`);

      setArtifact(res.data);
    } catch (err) {
      console.error("Error liking artifact:", err);
    }
  };

  if (loading) {
    return (
      <div className="mt-32 text-center text-sm uppercase tracking-widest text-stone-400">
        Loading
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="mt-32 text-center font-serif text-2xl text-stone-600">
        Artifact not found.
      </div>
    );
  }

  const details = [
    { label: "Museum", value: artifact.museum },
    { label: "Dynasty", value: artifact.dynasty },
    { label: "Material", value: artifact.material },
    { label: "Period", value: artifact.period },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/"
        className="text-xs font-medium uppercase tracking-widest text-stone-500 transition hover:text-stone-900"
      >
        ← Back to Collection
      </Link>

      <div className="mt-10 grid gap-14 lg:grid-cols-2">
        <ModelViewer>
          <Suspense
            fallback={
              <Html center>
                <span className="text-xs uppercase tracking-widest text-stone-400">
                  Loading 3D Model…
                </span>
              </Html>
            }
          >
            <ArtifactModel modelPath={artifact.model} />
          </Suspense>
        </ModelViewer>

        <div>
          <h1 className="font-serif text-4xl leading-tight text-stone-800 md:text-5xl">
            {artifact.title}
          </h1>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-stone-200 py-8">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
                  {d.label}
                </dt>
                <dd className="mt-1 text-stone-800">{d.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-xl leading-8 text-stone-600">
            {artifact.description}
          </p>

          <div className="mt-10 flex items-center gap-8">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 border border-stone-300 px-6 py-3 text-xs font-medium uppercase tracking-widest text-stone-600 transition hover:border-red-400 hover:text-red-500"
            >
              <HeartIcon filled={false} />
              Like
            </button>

            <span className="flex items-center gap-2 text-sm text-stone-500">
              <HeartIcon filled />
              {artifact.likes}
            </span>

            <span className="flex items-center gap-2 text-sm text-stone-500">
              <EyeIcon />
              {artifact.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}