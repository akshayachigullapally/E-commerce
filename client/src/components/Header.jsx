import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSearch = (searchTerm) => {
    // If not on products page, navigate to products with search
    if (!isProductsPage) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
    // If on products page, the SearchBar in Products.jsx will handle it
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            ShopEase
          </Link>
          
          {/* Search Bar - Only show on larger screens and not on products page */}
          {!isProductsPage && (
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <SearchBar onSearch={handleSearch} placeholder="Search products..." />
            </div>
          )}
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Products
            </Link>
            
            {user && (
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                </svg>
                Cart
              </Link>
            )}
            
            {user?.email === 'admin@admin.com' && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <span className="text-gray-700 text-sm">Welcome, </span>
                  <span className="font-medium text-gray-900">{user.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 sm:space-x-4">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Only show when not on products page */}
        {!isProductsPage && (
          <div className="md:hidden px-4 pb-4">
            <SearchBar onSearch={handleSearch} placeholder="Search products..." />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
