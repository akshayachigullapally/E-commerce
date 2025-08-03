import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart, getItemQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 999999,
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 12
  });

  const location = useLocation();

  // Generate fake data (replace with API calls when you have a real backend)
  const generateProducts = useCallback(() => {
    const categoryList = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty'];
    
    const specificProducts = [
      // Electronics
      { name: "Fantastic Aluminum Tuna", description: "The Reduced client-driven focus group Chinese-market has been set up. A basic, simple interface to the system.", price: 63.05, category: "Electronics", rating: 4.6, inStock: false },
      { name: "Premium Wireless Headphones", description: "High-quality noise-canceling headphones with 30-hour battery life", price: 199.99, category: "Electronics", rating: 4.8, inStock: true },
      { name: "Smart Fitness Watch", description: "Track your health and fitness with this advanced smartwatch", price: 299.99, category: "Electronics", rating: 4.5, inStock: true },
      { name: "Bluetooth Speaker", description: "Portable speaker with excellent sound quality and waterproof design", price: 79.99, category: "Electronics", rating: 4.3, inStock: true },
      { name: "Wireless Charging Pad", description: "Fast wireless charging for compatible devices", price: 34.99, category: "Electronics", rating: 4.1, inStock: true },
      
      // Sports
      { name: "Fantastic Bamboo Towels", description: "The sleek and posh Shoes comes with high-speed fiber transmission cables.", price: 83.69, category: "Sports", rating: 4.1, inStock: false },
      { name: "Professional Basketball", description: "Official size basketball perfect for indoor and outdoor play", price: 45.99, category: "Sports", rating: 4.7, inStock: true },
      { name: "Yoga Mat Premium", description: "Non-slip exercise mat with extra cushioning for comfort", price: 39.99, category: "Sports", rating: 4.4, inStock: true },
      { name: "Running Shoes", description: "Lightweight running shoes with advanced cushioning technology", price: 129.99, category: "Sports", rating: 4.6, inStock: true },
      { name: "Resistance Bands Set", description: "Complete set of resistance bands for strength training", price: 24.99, category: "Sports", rating: 4.2, inStock: true },
      
      // Books
      { name: "Fantastic Wooden Keyboard", description: "Our smoky-inspired Keyboard brings a taste of the outdoors to your home office.", price: 337.55, category: "Books", rating: 4.2, inStock: true },
      { name: "Programming Fundamentals", description: "Complete guide to learning programming from scratch", price: 49.99, category: "Books", rating: 4.8, inStock: true },
      { name: "Digital Marketing Mastery", description: "Advanced strategies for modern digital marketing", price: 35.99, category: "Books", rating: 4.5, inStock: true },
      { name: "Design Principles", description: "Essential guide to modern design thinking and principles", price: 42.99, category: "Books", rating: 4.6, inStock: true },
      { name: "Business Strategy", description: "Comprehensive guide to building successful business strategies", price: 55.99, category: "Books", rating: 4.4, inStock: true },
      
      // Clothing
      { name: "Fantastic Wooden Soap", description: "The Delmer Sausages is the latest in a series of innovative cleaning products.", price: 161.07, category: "Clothing", rating: 4.0, inStock: true },
      { name: "Premium Cotton T-Shirt", description: "Comfortable and stylish cotton t-shirt in various colors", price: 29.99, category: "Clothing", rating: 4.3, inStock: true },
      { name: "Denim Jeans Classic", description: "Classic fit denim jeans made from premium materials", price: 89.99, category: "Clothing", rating: 4.5, inStock: true },
      { name: "Winter Jacket", description: "Warm and waterproof jacket perfect for cold weather", price: 179.99, category: "Clothing", rating: 4.7, inStock: true },
      { name: "Casual Sneakers", description: "Comfortable everyday sneakers with modern design", price: 75.99, category: "Clothing", rating: 4.2, inStock: true },
      
      // Home & Garden
      { name: "Indoor Plant Collection", description: "Set of 3 beautiful indoor plants perfect for home decoration", price: 45.99, category: "Home & Garden", rating: 4.6, inStock: true },
      { name: "Kitchen Knife Set", description: "Professional-grade kitchen knives with ergonomic handles", price: 129.99, category: "Home & Garden", rating: 4.8, inStock: true },
      { name: "Decorative Lamp", description: "Modern table lamp with adjustable brightness settings", price: 67.99, category: "Home & Garden", rating: 4.4, inStock: true },
      { name: "Garden Tool Set", description: "Complete set of essential gardening tools", price: 89.99, category: "Home & Garden", rating: 4.5, inStock: true },
      { name: "Storage Basket", description: "Woven storage basket perfect for organizing your home", price: 25.99, category: "Home & Garden", rating: 4.1, inStock: true },
      
      // Beauty
      { name: "Skincare Routine Kit", description: "Complete skincare set for daily facial care", price: 79.99, category: "Beauty", rating: 4.7, inStock: true },
      { name: "Professional Hair Dryer", description: "Salon-quality hair dryer with multiple heat settings", price: 159.99, category: "Beauty", rating: 4.6, inStock: true },
      { name: "Makeup Brush Set", description: "Professional makeup brushes for flawless application", price: 49.99, category: "Beauty", rating: 4.5, inStock: true },
      { name: "Face Moisturizer", description: "Hydrating face cream with natural ingredients", price: 34.99, category: "Beauty", rating: 4.3, inStock: true },
      { name: "Perfume Collection", description: "Set of 3 signature fragrances for different occasions", price: 95.99, category: "Beauty", rating: 4.4, inStock: true }
    ];

    // Generate additional products to reach 100 total
    const allProducts = [...specificProducts];
    
    while (allProducts.length < 100) {
      const category = faker.helpers.arrayElement(categoryList);
      allProducts.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 15, max: 300 })),
        image: `https://picsum.photos/400/400?random=${allProducts.length}`,
        category: category,
        rating: faker.number.float({ min: 3.8, max: 5, fractionDigits: 1 }),
        inStock: faker.datatype.boolean(0.8),
        stock: faker.number.int({ min: 0, max: 45 })
      });
    }

    // Add missing properties to specific products
    return {
      products: allProducts.map((product, index) => ({
        id: product.id || faker.string.uuid(),
        ...product,
        image: `https://picsum.photos/400/400?random=${index}`,
        stock: product.inStock ? faker.number.int({ min: 5, max: 39 }) : 0
      })),
      categories: categoryList
    };
  }, []);

  const filterProducts = useCallback((allProducts, filters) => {
    let filtered = [...allProducts];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { products: allProducts, categories: categoryList } = generateProducts();
    const filteredProducts = filterProducts(allProducts, filters);
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    setProducts(paginatedProducts);
    setCategories(categoryList);
    setPagination({
      currentPage: filters.page,
      totalPages: Math.ceil(filteredProducts.length / filters.limit),
      totalCount: filteredProducts.length,
      hasNextPage: endIndex < filteredProducts.length,
      hasPreviousPage: filters.page > 1
    });
    
    setLoading(false);
  }, [filters, generateProducts, filterProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Initialize search from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setFilters(prev => ({ ...prev, search: searchFromUrl }));
    }
  }, [location.search]);

  const handleSearch = useCallback((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity >= product.stock) {
      alert(`Only ${product.stock} items available in stock`);
      return;
    }
    
    addToCart(product, 1);
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Added to cart!</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Our Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover amazing products at great prices</p>
          </div>
          
          {/* Search Bar - Always visible on products page */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search products..." 
              initialValue={filters.search}
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="xl:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
              <div className="text-sm text-gray-600">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                ) : (
                  `Showing ${((pagination.currentPage - 1) * filters.limit) + 1}-${Math.min(pagination.currentPage * filters.limit, pagination.totalCount)} of ${pagination.totalCount} products`
                )}
              </div>
              
              {filters.search && (
                <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                  Search: <span className="font-medium text-blue-700">"{filters.search}"</span>
                  <button 
                    onClick={() => handleSearch('')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(12)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="w-full h-48 lg:h-56 bg-gray-300"></div>
                    <div className="p-4 lg:p-5">
                      <div className="h-4 bg-gray-300 rounded mb-3"></div>
                      <div className="h-6 bg-gray-300 rounded mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8-4-4-4 4m0 0v8" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    handleSearch('');
                    handleFiltersChange({
                      ...filters,
                      category: '',
                      minPrice: 0,
                      maxPrice: 999999,
                      page: 1
                    });
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => {
                  const cartQuantity = getItemQuantity(product.id);
                  const availableStock = product.stock - cartQuantity;
                  
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-sm">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="text-xs font-medium text-gray-700 ml-1">{product.rating}</span>
                          </div>
                        </div>
                        {cartQuantity > 0 && (
                          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                            <div className="bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              {cartQuantity} in cart
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 lg:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-indigo-600">
                            ${product.price}
                          </span>
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              product.inStock && availableStock > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.inStock && availableStock > 0 
                              ? `${availableStock} available` 
                              : 'Out of Stock'
                            }
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock || availableStock <= 0}
                          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            product.inStock && availableStock > 0
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {!product.inStock ? 'Out of Stock' 
                           : availableStock <= 0 ? 'No More Available'
                           : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  hasNextPage={pagination.hasNextPage}
                  hasPreviousPage={pagination.hasPreviousPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;