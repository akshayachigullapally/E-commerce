import { useState, useEffect } from 'react';

const FilterSidebar = ({ filters, onFiltersChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category) => {
    onFiltersChange({ ...filters, category, page: 1 });
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    onFiltersChange({ ...filters, minPrice, maxPrice, page: 1 });
  };

  const handleSortChange = (sortBy, sortOrder) => {
    onFiltersChange({ ...filters, sortBy, sortOrder, page: 1 });
  };

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      category: '',
      minPrice: 0,
      maxPrice: 999999,
      sortBy: 'name',
      sortOrder: 'asc',
      page: 1
    });
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow-md h-fit`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">All Categories</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={filters.category === category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange(e.target.value || 0, filters.maxPrice)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice === 999999 ? '' : filters.maxPrice}
                onChange={(e) => handlePriceChange(filters.minPrice, e.target.value || 999999)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handlePriceChange(0, 50)}
                className="block w-full text-left text-sm text-gray-700 hover:text-indigo-600"
              >
                Under $50
              </button>
              <button
                onClick={() => handlePriceChange(50, 100)}
                className="block w-full text-left text-sm text-gray-700 hover:text-indigo-600"
              >
                $50 - $100
              </button>
              <button
                onClick={() => handlePriceChange(100, 200)}
                className="block w-full text-left text-sm text-gray-700 hover:text-indigo-600"
              >
                $100 - $200
              </button>
              <button
                onClick={() => handlePriceChange(200, 999999)}
                className="block w-full text-left text-sm text-gray-700 hover:text-indigo-600"
              >
                Over $200
              </button>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Sort By</h4>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              handleSortChange(sortBy, sortOrder);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
