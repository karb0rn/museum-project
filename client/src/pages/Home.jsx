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
    axios.get("/api/artifacts")
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

      <section className="mx-auto max-w-7xl px-6 mt-6 flex justify-end">
        <button
          onClick={() => {
            setSearch("");
            setMuseum("All");
            setDynasty("All");
            setMaterial("All");
            setPeriod("All");
          }}
          className="border border-stone-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-stone-500 transition hover:border-stone-900 hover:text-stone-900"
        >
          Clear Filters
        </button>
      </section>

      <Dashboard artifacts={artifacts} />

      <FeaturedArtifact artifacts={artifacts} />

      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 mt-20"
      >
        <div className="flex items-end justify-between border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
              Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl text-stone-800">
              Featured Collection
            </h2>
          </div>

          <span className="text-xs uppercase tracking-widest text-stone-400">
            {filteredArtifacts.length} Artifacts
          </span>
        </div>
      </section>

      {filteredArtifacts.length > 0 ? (
        <CardGrid artifacts={filteredArtifacts} />
      ) : (
        <div className="py-20 text-center">
          <h2 className="font-serif text-3xl text-stone-800">
            No artifacts found
          </h2>

          <p className="mt-3 text-stone-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </>
  );
}