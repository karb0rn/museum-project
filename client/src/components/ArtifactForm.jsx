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
      console.error("Axios Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);

        alert(
          err.response.data?.message ||
          JSON.stringify(err.response.data)
        );
      } else if (err.request) {
        console.log("No response from server");
        alert("No response from server.");
      } else {
        console.log(err.message);
        alert(err.message);
      }
    }
  };

  const inputClasses =
    "w-full border-0 border-b border-stone-300 bg-transparent px-1 py-2.5 text-stone-800 placeholder-stone-400 focus:border-stone-900 focus:outline-none";

  const labelClasses =
    "mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-stone-400";

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-8 font-serif text-2xl text-stone-800">
        {editingArtifact ? "Edit Artifact" : "Add New Artifact"}
      </h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">

        <div>
          <label className={labelClasses}>ID</label>
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={form.id}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Museum</label>
          <input
            type="text"
            name="museum"
            placeholder="Museum"
            value={form.museum}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Dynasty</label>
          <input
            type="text"
            name="dynasty"
            placeholder="Dynasty"
            value={form.dynasty}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Material</label>
          <input
            type="text"
            name="material"
            placeholder="Material"
            value={form.material}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Period</label>
          <input
            type="text"
            name="period"
            placeholder="Period"
            value={form.period}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClasses}>Artifact Image</label>

          <input
            type="file"
            accept="image/*"
            className="w-full border-0 border-b border-stone-300 bg-transparent py-2.5 text-sm text-stone-600 file:mr-4 file:border file:border-stone-300 file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-stone-600 hover:file:border-stone-900 hover:file:text-stone-900"
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
              className="mt-4 w-64 border border-stone-200"
            />
          )}
        </div>

        <div className="col-span-2">
          <label className={labelClasses}>
            3D Model (.glb / .gltf / .ply)
          </label>

          <input
            type="file"
            accept=".glb,.gltf,.ply"
            className="w-full border-0 border-b border-stone-300 bg-transparent py-2.5 text-sm text-stone-600 file:mr-4 file:border file:border-stone-300 file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-stone-600 hover:file:border-stone-900 hover:file:text-stone-900"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              setModelFile(file);
            }}
          />

          {modelFile && (
            <p className="mt-2 text-sm text-stone-600">
              {modelFile.name}
            </p>
          )}
        </div>

      </div>

      <div className="mt-6">
        <label className={labelClasses}>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-stone-300 bg-transparent p-3 text-stone-800 placeholder-stone-400 focus:border-stone-900 focus:outline-none"
          rows="5"
        />
      </div>

      <button
        type="submit"
        className="mt-8 bg-stone-900 px-10 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-amber-600"
      >
        {editingArtifact ? "Update Artifact" : "Add Artifact"}
      </button>
    </form>
  );
}