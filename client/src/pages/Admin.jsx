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

  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-stone-800">
              🏛 Museum Admin
            </h1>

            <p className="text-stone-500 mt-2">
              Manage artifacts in your virtual museum
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Total Artifacts
            </p>

            <h2 className="text-4xl font-bold text-amber-600">
              {artifacts.length}
            </h2>
          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Artifacts</p>

            <h2 className="text-4xl font-bold">
              {artifacts.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Likes</p>

            <h2 className="text-4xl font-bold text-red-500">
              {artifacts.reduce((sum, a) => sum + a.likes, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Views</p>

            <h2 className="text-4xl font-bold text-blue-500">
              {artifacts.reduce((sum, a) => sum + a.views, 0)}
            </h2>
          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">

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

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="px-6 py-5 border-b">
            <h2 className="text-2xl font-bold">
              Artifact Collection
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-stone-800 text-white">

              <tr>

                <th className="p-4">Image</th>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Museum</th>

                <th className="p-4 text-left">Dynasty</th>

                <th className="p-4">❤️</th>

                <th className="p-4">👁</th>

                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {artifacts.map((artifact) => (

                <tr
                  key={artifact._id}
                  className="border-b hover:bg-stone-50 transition"
                >

                  <td className="p-3">

                    <img
                      src={artifact.image}
                      alt={artifact.title}
                      className="w-20 h-20 object-cover rounded-lg shadow"
                    />

                  </td>

                  <td className="font-semibold">
                    {artifact.title}
                  </td>

                  <td>
                    {artifact.museum}
                  </td>

                  <td>
                    {artifact.dynasty}
                  </td>

                  <td className="text-center">
                    {artifact.likes}
                  </td>

                  <td className="text-center">
                    {artifact.views}
                  </td>

                  <td>

                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={() => setEditingArtifact(artifact)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteArtifact(artifact._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        🗑
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