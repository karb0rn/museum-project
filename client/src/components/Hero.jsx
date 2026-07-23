
export default function Hero() {
  return (
    <section className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-6xl font-extrabold">
          🏛️ Virtual Museum
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto">
          Discover India's rich cultural heritage through
          immersive 3D artifacts from renowned museums across
          the country.
        </p>

        <div className="mt-10">
          <a
            href="#collection"
            className="bg-amber-500 hover:bg-amber-600 px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
}