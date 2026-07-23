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

  const stats = [
    {
      title: "Artifacts",
      value: totalArtifacts,
      icon: "🏺",
    },
    {
      title: "Museums",
      value: totalMuseums,
      icon: "🏛️",
    },
    {
      title: "Dynasties",
      value: totalDynasties,
      icon: "👑",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: "❤️",
    },
    {
      title: "Views",
      value: totalViews,
      icon: "👁️",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <div className="grid md:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-4xl">
              {stat.icon}
            </div>

            <h3 className="text-gray-500 mt-3">
              {stat.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}