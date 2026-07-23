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
  return (
    <section className="max-w-7xl mx-auto px-6 mt-6">
      <div className="flex flex-wrap gap-4">

        <select
          value={museum}
          onChange={(e) => setMuseum(e.target.value)}
          className="border rounded-lg px-4 py-3"
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

        <select
          value={dynasty}
          onChange={(e) => setDynasty(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="All">All Dynasties</option>
          <option value="Chola">Chola</option>
          <option value="Gupta">Gupta</option>
          <option value="Hoysala">Hoysala</option>
          <option value="Pallava">Pallava</option>
        </select>

        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="All">All Materials</option>
          <option value="Bronze">Bronze</option>
          <option value="Stone">Stone</option>
          <option value="Granite">Granite</option>
        </select>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="All">All Periods</option>
          <option value="6th Century">6th Century</option>
          <option value="8th Century">8th Century</option>
          <option value="11th Century">11th Century</option>
          <option value="12th Century">12th Century</option>
        </select>

      </div>
    </section>
  );
}