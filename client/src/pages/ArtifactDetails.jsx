import { Html } from "@react-three/drei";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArtifactModel from "../components/ArtifactModel";
import ModelViewer from "../components/ModelViewer";

export default function ArtifactDetails() {
  const { id } = useParams();

  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        // Increment views
        await axios.put(
          `https://museum-project-el4m.onrender.com/api/artifacts/${id}/view`
        );

        // Get updated artifact
        const res = await axios.get(
          `https://museum-project-el4m.onrender.com/api/artifacts/${id}`
        );

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
      const res = await axios.put(
        `https://museum-project-el4m.onrender.com/api/artifacts/${artifact._id}/like`
      );

      setArtifact(res.data);
    } catch (err) {
      console.error("Error liking artifact:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-2xl mt-20">
        Loading...
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="text-center text-2xl mt-20">
        Artifact not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        ← Back to Collection
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 mt-8">
        <ModelViewer>
          <Suspense
            fallback={
              <Html center>
                Loading 3D Model...
              </Html>
            }
          >
            <ArtifactModel modelPath={artifact.model} />
          </Suspense>
        </ModelViewer>

        <div>
          <h1 className="text-4xl font-bold">
            {artifact.title}
          </h1>

          <div className="space-y-4 mt-8">
            <p>
              <strong>Museum:</strong> {artifact.museum}
            </p>

            <p>
              <strong>Dynasty:</strong> {artifact.dynasty}
            </p>

            <p>
              <strong>Material:</strong> {artifact.material}
            </p>

            <p>
              <strong>Period:</strong> {artifact.period}
            </p>

            <p className="leading-8">
              {artifact.description}
            </p>

            <div className="flex gap-8 pt-6 items-center">
              <button
                onClick={handleLike}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                ❤️ Like
              </button>

              <span className="font-semibold">
                ❤️ {artifact.likes} Likes
              </span>

              <span className="font-semibold">
                👁️ {artifact.views} Views
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}