import ArtifactCard from "./ArtifactCard";

export default function CardGrid({ artifacts }) {
  return (
    <section className="mx-auto max-w-7xl px-6 mt-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
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
