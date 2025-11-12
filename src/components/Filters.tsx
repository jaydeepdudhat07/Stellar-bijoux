'use client';

interface FiltersProps {
  colors: string[];
  carats: string[];
  stones: { _id: string; name: string }[];
  selectedColor: string;
  selectedCarat: string;
  selectedStone: string;
  onColorChange: (color: string) => void;
  onCaratChange: (carat: string) => void;
  onStoneChange: (stone: string) => void;
  onReset: () => void;
}

export default function Filters({
  colors,
  carats,
  stones,
  selectedColor,
  selectedCarat,
  selectedStone,
  onColorChange,
  onCaratChange,
  onStoneChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold heading-font">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-yellow-600 hover:text-yellow-700"
        >
          Reset
        </button>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Color</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={(e) => onColorChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Carat Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Carat</h4>
        <div className="space-y-2">
          {carats.map((carat) => (
            <label key={carat} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="carat"
                value={carat}
                checked={selectedCarat === carat}
                onChange={(e) => onCaratChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700">{carat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stone Filter */}
      {stones.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Stones</h4>
          <div className="space-y-2">
            {stones.map((stone) => (
              <label key={stone._id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="stone"
                  value={stone._id}
                  checked={selectedStone === stone._id}
                  onChange={(e) => onStoneChange(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{stone.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

