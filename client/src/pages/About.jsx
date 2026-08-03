export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
        About
      </p>

      <h1 className="mt-3 font-serif text-5xl leading-tight text-stone-800">
        Preserving Heritage,
        <br />
        Digitally.
      </h1>

      <p className="mt-8 max-w-2xl leading-8 text-stone-600">
        Virtual Museum brings India's rich cultural heritage to a global
        audience through high-fidelity 3D digitization. From temple
        sculptures to bronze icons, each artifact is carefully scanned and
        preserved, allowing anyone, anywhere, to explore centuries of
        craftsmanship in stunning detail.
      </p>

      <div className="mt-16 grid gap-10 border-y border-stone-200 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-2xl text-stone-800">Our Mission</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            To make India's museums and their artifacts accessible beyond
            physical walls, reaching students, historians, and curious
            minds everywhere.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-stone-800">
            The Technology
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Every artifact is captured through 3D scanning and photogrammetry,
            producing accurate, explorable models that reveal detail
            invisible to the naked eye in a display case.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-stone-800">
            Our Partners
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            We work with museums across India, including the Government
            Museum Chennai, Indian Museum Kolkata, and National Museum
            New Delhi, to responsibly document and share their collections.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-3xl text-stone-800">Get in Touch</h2>
        <p className="mt-3 max-w-xl leading-7 text-stone-600">
          Interested in partnering with us, or want to learn more about a
          specific artifact? Reach out and we'll be happy to help.
        </p>
      </div>

    </div>
  );
}