import axios from "axios";
import { useEffect, useState } from "react";

import CardGrid from "../components/CardGrid";
import Dashboard from "../components/Dashboard";
import FeaturedArtifact from "../components/FeaturedArtifacts";
import FilterBar from "../components/FilterBar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
export default function Home() {
  const [artifacts, setArtifacts] = useState([]);

  const [search, setSearch] = useState("");
  const [museum, setMuseum] = useState("All");
  const [dynasty, setDynasty] = useState("All");
  const [material, setMaterial] = useState("All");
  const [period, setPeriod] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/artifacts")
      .then((res) => {
        setArtifacts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching artifacts:", err);
      });
  }, []);

  const filteredArtifacts = artifacts.filter((artifact) => {
    return (
      artifact.title.toLowerCase().includes(search.toLowerCase()) &&
      (museum === "All" || artifact.museum === museum) &&
      (dynasty === "All" || artifact.dynasty === dynasty) &&
      (material === "All" || artifact.material === material) &&
      (period === "All" || artifact.period === period)
    );
  });
  console.log({
    museum,
    dynasty,
    material,
    period,
    search,
  });

  return (
    <>
      <Hero />
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <FilterBar
        museum={museum}
        setMuseum={setMuseum}
        dynasty={dynasty}
        setDynasty={setDynasty}
        material={material}
        setMaterial={setMaterial}
        period={period}
        setPeriod={setPeriod}
      />
      ...
      <section className="max-w-7xl mx-auto px-6 mt-4">
        <button
          onClick={() => {
            setSearch("");
            setMuseum("All");
            setDynasty("All");
            setMaterial("All");
            setPeriod("All");
          }}
          className="bg-stone-700 text-white px-5 py-2 rounded-lg hover:bg-stone-800"
        >
          Clear Filters
        </button>
      </section>
      <Dashboard artifacts={artifacts} />

      <FeaturedArtifact artifacts={artifacts} />


      <section
        id="collection"
        className="max-w-7xl mx-auto px-6 mt-8"
      ></section>

      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Featured Collection
          </h2>

          <span className="text-gray-500">
            {filteredArtifacts.length} Artifacts
          </span>
        </div>
      </section>

      {filteredArtifacts.length > 0 ? (
        <CardGrid artifacts={filteredArtifacts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-3xl font-semibold">
            No artifacts found
          </h2>

          <p className="text-gray-500 mt-3">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </>
  );
}