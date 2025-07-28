export default function ItemDetailForm({ title, setTitle, description, setDescription }) {
  // Constants for character limits
  const TITLE_MAX_LENGTH = 50;
  const DESCRIPTION_MAX_LENGTH = 250;

  // Handler functions with character limits
  const handleTitleChange = (e) => {
    if (e.target.value.length <= TITLE_MAX_LENGTH) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= DESCRIPTION_MAX_LENGTH) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="p-5 border rounded-3xl bg-white space-y-4">
      <p className="font-semibold text-[17px]">Item Detail</p>

      {/* Title input with character counter */}
      <div className="relative">
        <input
          type="text"
          placeholder="Listing title"
          value={title}
          onChange={handleTitleChange}
          maxLength={TITLE_MAX_LENGTH}
          className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 focus:outline-none pr-12"
        />
        <p className="text-xs text-gray-500 absolute bottom-3 right-4">
          {title.length}/{TITLE_MAX_LENGTH}
        </p>
      </div>

      {/* Tip */}
      <p className="text-sm text-gray-700">
        With these additional details, buyers can find your listing more easily and ask fewer questions.
      </p>

      {/* Description box with character counter */}
      <div className="relative">
        <textarea
          placeholder="Description (Optional)"
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
          maxLength={DESCRIPTION_MAX_LENGTH}
          className="w-full rounded-2xl bg-[#f1edef] px-5 py-3 placeholder-gray-500 text-gray-800 resize-none focus:outline-none pb-8"
        />
        <p className="text-xs text-gray-500 absolute bottom-2 right-4">
          {description.length}/{DESCRIPTION_MAX_LENGTH}
        </p>
      </div>
    </div>
  );
}