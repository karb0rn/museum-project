import axios from "axios";
import { useEffect, useState } from "react";
import ArtifactForm from "../components/ArtifactForm";

export default function Admin() {
  const [artifacts, setArtifacts] = useState([]);
  const [editingArtifact, setEditingArtifact] = useState(null);

  useEffect(() => {
    fetchArtifacts();
  }, []);
  async function fetchArtifacts() {
    try {
      const res = await axios.get("/api/artifacts");

      console.log("Response:", res.data);
      console.log("Is Array?", Array.isArray(res.data));

      setArtifacts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteArtifact(id) {
    if (!window.confirm("Delete this artifact?")) return;

    try {
      await axios.delete(`/api/artifacts/${id}`);

      setArtifacts((prev) =>
        prev.filter((artifact) => artifact._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete artifact.");
    }
  }

  const totalLikes = artifacts.reduce((sum, a) => sum + a.likes, 0);
  const totalViews = artifacts.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-stone-200 pb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl text-stone-800">
              Museum Admin
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Manage artifacts in your virtual museum
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
              Total Artifacts
            </p>
            <p className="mt-1 font-serif text-4xl text-stone-800">
              {artifacts.length}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-10 grid divide-y divide-stone-200 border border-stone-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-6 py-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
              Artifacts
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-800">
              {artifacts.length}
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
              Total Likes
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-800">
              {totalLikes}
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
              Total Views
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-800">
              {totalViews}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mb-10 border border-stone-200 bg-white p-8">
          <ArtifactForm
            onArtifactAdded={fetchArtifacts}
            editingArtifact={editingArtifact}
            onUpdateComplete={() => {
              setEditingArtifact(null);
              fetchArtifacts();
            }}
          />
        </div>

        {/* Table */}
        <div className="border border-stone-200 bg-white">
          <div className="border-b border-stone-200 px-6 py-5">
            <h2 className="font-serif text-2xl text-stone-800">
              Artifact Collection
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-stone-800 text-white">
              <tr>
                <th className="p-4 text-left font-medium uppercase tracking-wider text-xs">
                  Image
                </th>
                <th className="p-4 text-left font-medium uppercase tracking-wider text-xs">
                  Title
                </th>
                <th className="p-4 text-left font-medium uppercase tracking-wider text-xs">
                  Museum
                </th>
                <th className="p-4 text-left font-medium uppercase tracking-wider text-xs">
                  Dynasty
                </th>
                <th className="p-4 text-center font-medium uppercase tracking-wider text-xs">
                  Likes
                </th>
                <th className="p-4 text-center font-medium uppercase tracking-wider text-xs">
                  Views
                </th>
                <th className="p-4 text-center font-medium uppercase tracking-wider text-xs">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {artifacts.map((artifact) => (
                <tr
                  key={artifact._id}
                  className="border-b border-stone-100 transition hover:bg-stone-50"
                >
                  <td className="p-3">
                    <img
                      src={artifact.image}
                      alt={artifact.title}
                      className="h-16 w-16 object-cover"
                    />
                  </td>

                  <td className="font-medium text-stone-800">
                    {artifact.title}
                  </td>

                  <td className="text-stone-600">{artifact.museum}</td>

                  <td className="text-stone-600">{artifact.dynasty}</td>

                  <td className="text-center text-stone-600">
                    {artifact.likes}
                  </td>

                  <td className="text-center text-stone-600">
                    {artifact.views}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditingArtifact(artifact)}
                        className="border border-stone-300 px-3 py-2 text-xs font-medium uppercase tracking-wide text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteArtifact(artifact._id)}
                        className="border border-red-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}