export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="mb-5 text-sm uppercase tracking-[0.4em] text-amber-300">
          India's Living Heritage
        </p>

        <h1 className="font-serif text-5xl font-bold sm:text-6xl md:text-7xl">
          Virtual Museum
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-200">
          Discover India's rich cultural heritage through immersive 3D
          experiences featuring artifacts from museums across the country.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#collection"
            className="rounded-md bg-amber-500 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-amber-600"
          >
            Explore Collection
          </a>

          <a
            href="#about"
            className="rounded-md border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-black"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}