'use client';

interface FiltersProps {
  colors: string[];
  carats: string[];
  stones: { _id: string; name: string }[];
  categories?: { _id: string; name: string; slug: string }[];
  selectedColor: string;
  selectedCarat: string;
  selectedStone: string;
  selectedCategory?: string;
  onColorChange: (color: string) => void;
  onCaratChange: (carat: string) => void;
  onStoneChange: (stone: string) => void;
  onCategoryChange?: (category: string) => void;
  onReset: () => void;
}

export default function Filters({
  colors,
  carats,
  stones,
  categories,
  selectedColor,
  selectedCarat,
  selectedStone,
  selectedCategory,
  onColorChange,
  onCaratChange,
  onStoneChange,
  onCategoryChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20 max-h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold heading-font">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-yellow-600 hover:text-yellow-700"
        >
          Reset
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1 pr-2">

      {/* Category Filter */}
      {categories && categories.length > 0 && onCategoryChange && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category._id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category._id}
                  checked={selectedCategory === category._id}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}

