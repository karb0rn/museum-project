export default function FilterBar({
  museum,
  setMuseum,
  dynasty,
  setDynasty,
  material,
  setMaterial,
  period,
  setPeriod,
}) {
  const selectClasses =
    "w-full appearance-none border-0 border-b border-stone-300 bg-transparent px-1 py-3 text-sm text-stone-700 focus:border-stone-900 focus:outline-none";

  const wrapperClasses = "relative flex-1 min-w-[180px]";

  const labelClasses =
    "mb-2 block text-[11px] font-medium uppercase tracking-widest text-stone-400";

  const Chevron = () => (
    <svg
      className="pointer-events-none absolute right-1 top-[42px] h-3 w-3 text-stone-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <section className="mx-auto max-w-7xl px-6 mt-10">
      <div className="flex flex-wrap gap-x-10 gap-y-6 border-y border-stone-200 py-8">

        <div className={wrapperClasses}>
          <label className={labelClasses}>Museum</label>
          <select
            value={museum}
            onChange={(e) => setMuseum(e.target.value)}
            className={selectClasses}
          >
            <option value="All">All Museums</option>
            <option value="Government Museum, Chennai">
              Government Museum, Chennai
            </option>
            <option value="National Museum, New Delhi">
              National Museum, New Delhi
            </option>
            <option value="Indian Museum, Kolkata">
              Indian Museum, Kolkata
            </option>
          </select>
          <Chevron />
        </div>

        <div className={wrapperClasses}>
          <label className={labelClasses}>Dynasty</label>
          <select
            value={dynasty}
            onChange={(e) => setDynasty(e.target.value)}
            className={selectClasses}
          >
            <option value="All">All Dynasties</option>
            <option value="Chola">Chola</option>
            <option value="Gupta">Gupta</option>
            <option value="Hoysala">Hoysala</option>
            <option value="Pallava">Pallava</option>
          </select>
          <Chevron />
        </div>

        <div className={wrapperClasses}>
          <label className={labelClasses}>Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className={selectClasses}
          >
            <option value="All">All Materials</option>
            <option value="Bronze">Bronze</option>
            <option value="Stone">Stone</option>
            <option value="Granite">Granite</option>
          </select>
          <Chevron />
        </div>

        <div className={wrapperClasses}>
          <label className={labelClasses}>Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={selectClasses}
          >
            <option value="All">All Periods</option>
            <option value="6th Century">6th Century</option>
            <option value="8th Century">8th Century</option>
            <option value="11th Century">11th Century</option>
            <option value="12th Century">12th Century</option>
          </select>
          <Chevron />
        </div>

      </div>
    </section>
  );
}