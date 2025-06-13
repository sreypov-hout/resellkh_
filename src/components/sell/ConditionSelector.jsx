export default function ConditionSelector({ selected, onSelect }) {
  const conditions = ['Brand new', 'Like new', 'Lightly used', 'Well used', 'Heavily used'];

  return (
    <div className="p-4 border rounded-xl">
      <p className="font-medium mb-2">Condition</p>
      <div className="flex flex-wrap gap-2">
        {conditions.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`px-3 py-1 border rounded-full text-sm ${
              selected === c ? 'bg-orange-500 text-white' : 'bg-white border-gray-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-1">Tip: Add close-up photos to show defects</p>
    </div>
  );
}
