import ArtifactCard from "./ArtifactCard";

export default function CardGrid({ artifacts }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {artifacts.map((artifact) => (
          <ArtifactCard
            key={artifact._id}
            artifact={artifact}
          />
        ))}
      </div>
    </section>
  );
}