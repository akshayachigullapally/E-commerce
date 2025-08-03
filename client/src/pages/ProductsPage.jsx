import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS } from '../config/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All Categories']);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart, getItemQuantity } = useCart();

  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity }
  ];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, priceRange, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.products);
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.products || []);
      } else {
        console.error('Error fetching products:', data.error);
        // Fallback to mock data with better image URLs
        const mockProducts = [
          {
            id: 1,
            name: 'Awesome Gold Computer',
            price: 99.69,
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
            category: 'Electronics',
            stock: 12,
            rating: 4.3,
            description: 'New tan Computer with ergonomic design for...'
          },
          {
            id: 2,
            name: 'Awesome Marble Shirt',
            price: 121.39,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
            category: 'Clothing',
            stock: 15,
            rating: 4.8,
            description: 'Stylish Shirt designed to make you stand out wit...'
          },
          {
            id: 3,
            name: 'Awesome Steel Table',
            price: 139.25,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            category: 'Home & Garden',
            stock: 28,
            rating: 3.8,
            description: 'Savor the juicy essence in our table, designed...'
          },
          {
            id: 4,
            name: 'Awesome Steel Soap',
            price: 77.09,
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
            category: 'Beauty',
            stock: 25,
            rating: 4.1,
            description: 'Savor the rich essence in our Soap, designed for...'
          }
        ];
        setProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Enhanced fallback with proper images
      const mockProducts = [
        {
          id: 1,
          name: 'Awesome Gold Computer',
          price: 99.69,
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
          category: 'Electronics',
          stock: 12,
          rating: 4.3,
          description: 'New tan Computer with ergonomic design for...'
        },
        {
          id: 2,
          name: 'Awesome Marble Shirt',
          price: 121.39,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
          category: 'Clothing',
          stock: 15,
          rating: 4.8,
          description: 'Stylish Shirt designed to make you stand out wit...'
        }
      ];
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.categories);
      const data = await response.json();
      
      if (response.ok) {
        setCategories(['All Categories', ...data]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = priceRange.min === '' ? 0 : parseFloat(priceRange.min);
        const max = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="products-content">
        {/* Filters Section - Left Side */}
        <div className="filters-section">
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">Clear All</button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4>Categories</h4>
            {categories.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
            {priceRanges.map((range, index) => (
              <button
                key={index}
                className="price-range-btn"
                onClick={() => setPriceRange({ min: range.min, max: range.max === Infinity ? '' : range.max })}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Right Side */}
        <div className="products-section">
          <div className="products-info">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'} 
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300/f0f0f0/666666?text=Product+Image';
                    }}
                  />
                  <div className="product-category">{product.category}</div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <div className="product-rating">
                    <span className="stars">★ {product.rating}</span>
                  </div>
                  <div className="product-price">
                    <span className="price">${product.price}</span>
                    <span className="stock">{product.stock} in stock</span>
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                    {getItemQuantity(product.id) > 0 && (
                      <span className="cart-quantity">({getItemQuantity(product.id)})</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
