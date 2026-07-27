import axios from "axios";
import { useEffect, useState } from "react";

export default function ArtifactForm({
  onArtifactAdded,
  editingArtifact,
  onUpdateComplete,
}) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    museum: "",
    dynasty: "",
    material: "",
    period: "",
    description: "",
    likes: 0,
    views: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!editingArtifact) {
      clearForm();
      return;
    }

    setForm({
      id: editingArtifact.id || "",
      title: editingArtifact.title || "",
      museum: editingArtifact.museum || "",
      dynasty: editingArtifact.dynasty || "",
      material: editingArtifact.material || "",
      period: editingArtifact.period || "",
      description: editingArtifact.description || "",
      likes: editingArtifact.likes || 0,
      views: editingArtifact.views || 0,
    });

    setImagePreview(editingArtifact.image || "");
    setImageFile(null);
    setModelFile(null);
  }, [editingArtifact]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      id: "",
      title: "",
      museum: "",
      dynasty: "",
      material: "",
      period: "",
      description: "",
      likes: 0,
      views: 0,
    });

    setImageFile(null);
    setModelFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (imageFile) data.append("image", imageFile);
      if (modelFile) data.append("model", modelFile);

      if (editingArtifact) {
        await axios.put(
          `/api/artifacts/${editingArtifact._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Artifact updated successfully!");

        clearForm();

        if (onUpdateComplete) {
          onUpdateComplete();
        }
      } else {
        await axios.post(
          "/api/artifacts",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Artifact added successfully!");

        clearForm();

        if (onArtifactAdded) {
          onArtifactAdded();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        {editingArtifact ? "Edit Artifact" : "Add New Artifact"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="museum"
          placeholder="Museum"
          value={form.museum}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="dynasty"
          placeholder="Dynasty"
          value={form.dynasty}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={form.material}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="period"
          placeholder="Period"
          value={form.period}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="col-span-2">
          <label className="font-semibold block mb-2">
            Artifact Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-64 rounded-lg shadow"
            />
          )}
        </div>

        <div className="col-span-2">
          <label className="font-semibold block mb-2">
            3D Model (.glb / .gltf)
          </label>

          <input
            type="file"
            accept=".glb,.gltf"
            className="border p-2 rounded w-full"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setModelFile(file);
            }}
          />

          {modelFile && (
            <p className="mt-2 text-green-600 font-medium">
              🗿 {modelFile.name}
            </p>
          )}
        </div>

      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4"
        rows="5"
      />

      <button
        type="submit"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
      >
        {editingArtifact ? "Update Artifact" : "Add Artifact"}
      </button>
    </form>
  );
}