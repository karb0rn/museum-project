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
    image: "",
    model: "",
    likes: 0,
    views: 0,
  });

  useEffect(() => {
    if (editingArtifact) {
      setForm({
        id: editingArtifact.id || "",
        title: editingArtifact.title || "",
        museum: editingArtifact.museum || "",
        dynasty: editingArtifact.dynasty || "",
        material: editingArtifact.material || "",
        period: editingArtifact.period || "",
        description: editingArtifact.description || "",
        image: editingArtifact.image || "",
        model: editingArtifact.model || "",
        likes: editingArtifact.likes || 0,
        views: editingArtifact.views || 0,
      });
    }
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
      image: "",
      model: "",
      likes: 0,
      views: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingArtifact) {
        await axios.put(
          `/api/artifacts/${editingArtifact._id}`,
          form
        );

        alert("Artifact updated successfully!");

        clearForm();

        if (onUpdateComplete) {
          onUpdateComplete();
        }
      } else {
        await axios.post("/api/artifacts", form);

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
      <h2 className="text-2xl font-bold mb-4">
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

        <input
          type="text"
          name="image"
          placeholder="/images/example.jpg"
          value={form.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="model"
          placeholder="/models/example.glb"
          value={form.model}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4"
        rows="4"
      />

      <button
        type="submit"
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        {editingArtifact ? "Update Artifact" : "Add Artifact"}
      </button>
    </form>
  );
}