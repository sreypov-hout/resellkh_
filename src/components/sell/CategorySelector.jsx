import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = [
  'Accessories', 'Beauty', 'Equipment Bag & Shoes', 'Book', 'Fashion',
  'Home', 'Sports & Kids', 'Electronic', 'Vehicle', 'Other'
];

export default function CategorySelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = categories.filter(c =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative z-10">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center border p-4 rounded-xl bg-white shadow-sm"
      >
        <span className="text-gray-700">
          {selected || 'Select a category'}
        </span>
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-md max-h-80 overflow-y-auto">
          <input
            type="text"
            placeholder="Search for category"
            className="w-full px-4 py-2 border-b"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filtered.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  onSelect(cat);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
