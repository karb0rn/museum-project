export default function Dashboard({ artifacts }) {
  const totalArtifacts = artifacts.length;

  const totalMuseums = new Set(
    artifacts.map((a) => a.museum)
  ).size;

  const totalDynasties = new Set(
    artifacts.map((a) => a.dynasty)
  ).size;

  const totalLikes = artifacts.reduce(
    (sum, a) => sum + a.likes,
    0
  );

  const totalViews = artifacts.reduce(
    (sum, a) => sum + a.views,
    0
  );

  const icons = {
    Artifacts: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M8 3h8l1 4H7l1-4z" />
        <path d="M6 7h12l-1 13a2 2 0 01-2 2H9a2 2 0 01-2-2L6 7z" />
      </svg>
    ),
    Museums: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M6 10v11M10 10v11M14 10v11M18 10v11" />
      </svg>
    ),
    Dynasties: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8z" />
      </svg>
    ),
    Likes: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3.5C14 6 15.5 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
      </svg>
    ),
    Views: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  };

  const stats = [
    { title: "Artifacts", value: totalArtifacts },
    { title: "Museums", value: totalMuseums },
    { title: "Dynasties", value: totalDynasties },
    { title: "Likes", value: totalLikes },
    { title: "Views", value: totalViews },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 mt-10">
      <div className="grid divide-y divide-stone-200 border border-stone-200 md:grid-cols-5 md:divide-x md:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col items-center gap-3 px-6 py-10 text-center"
          >
            <div className="text-stone-400">
              {icons[stat.title]}
            </div>

            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400">
              {stat.title}
            </p>

            <p className="font-serif text-4xl text-stone-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}