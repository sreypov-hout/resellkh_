export default function DealMethod({ location, setLocation, telegram, setTelegram }) {
  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-lg">Deal Method</p>

      <div>
        <p className="text-sm font-medium mb-1">Meet-up</p>
        <input
          type="text"
          placeholder="Add location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-2xl bg-gray-100 px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
        />
      </div>

      <div>
        <p className="text-sm font-medium mb-1">Telegram</p>
        <input
          type="text"
          placeholder="Add link or username"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          className="w-full rounded-2xl bg-gray-100 px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none"
        />
      </div>
    </div>
  );
}
