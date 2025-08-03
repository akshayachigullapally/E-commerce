import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Home = () => {
  const { user } = useAuth();

  const categories = [
    {
      title: "Up to 75% off | Electronics & Accessories",
      items: [
        { name: "Laptops", image: "💻", discount: "60% off" },
        { name: "Headphones", image: "🎧", discount: "45% off" },
        { name: "Smartphones", image: "📱", discount: "30% off" },
        { name: "Tablets", image: "📱", discount: "50% off" }
      ],
      bgColor: "bg-blue-50"
    },
    {
      title: "Up to 80% off | Home, kitchen & more",
      items: [
        { name: "Kitchen essentials", image: "🍽️", discount: "70% off" },
        { name: "Home decor", image: "🏺", discount: "65% off" },
        { name: "Furniture", image: "🪑", discount: "55% off" },
        { name: "Home improvement", image: "🔧", discount: "60% off" }
      ],
      bgColor: "bg-green-50"
    },
    {
      title: "Up to 65% off | Offers on home appliances",
      items: [
        { name: "Washing machines", image: "🧽", discount: "40% off" },
        { name: "Refrigerators", image: "❄️", discount: "35% off" },
        { name: "Air conditioners", image: "❄️", discount: "45% off" },
        { name: "Chimneys", image: "🏠", discount: "50% off" }
      ],
      bgColor: "bg-yellow-50"
    },
    {
      title: "Sign in for your best experience",
      isSignIn: true,
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Festival Banner */}
      <section className="relative bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Festival Logo */}
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <div className="inline-block bg-white rounded-full p-8 shadow-lg mb-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-orange-600 mb-2">Great</h2>
                  <h2 className="text-2xl font-bold text-orange-600 mb-2">Freedom</h2>
                  <h2 className="text-2xl font-bold text-orange-600 mb-2">Festival</h2>
                  <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                    Shop Now
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Co-Powered by Intel Core</p>
                </div>
              </div>
            </div>

            {/* Cashback Offer */}
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Get 20% cashback*
              </h1>
              <p className="text-xl mb-6">Collect your offer now</p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold">SBI</span>
                  <span className="text-gray-800">Card</span>
                  <span className="text-sm text-gray-600">10% Instant Discount*</span>
                </div>
                <p className="text-xs text-gray-500">*T&C apply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${category.bgColor}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 leading-tight">
                  {category.title}
                </h3>
                
                {category.isSignIn ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <img 
                        src="/api/placeholder/200/100" 
                        alt="Sign in benefits" 
                        className="mx-auto rounded-lg"
                      />
                    </div>
                    {!user ? (
                      <Link
                        to="/login"
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        Sign in securely
                      </Link>
                    ) : (
                      <Link
                        to="/products"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        Shop Now
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-center">
                        <div className="bg-white rounded-lg p-3 mb-2 shadow-sm">
                          <div className="text-3xl mb-2">{item.image}</div>
                          <p className="text-sm font-medium text-gray-700">{item.name}</p>
                          <p className="text-xs text-green-600 font-semibold">{item.discount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!category.isSignIn && (
                  <Link
                    to="/products"
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    See more →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Promotional Sections */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Deal */}
          <div className="lg:col-span-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Deal of the Day</h2>
            <p className="text-lg mb-6">Limited time offer - Don't miss out!</p>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold">70% OFF</span>
              <Link
                to="/products"
                className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/products" className="block text-blue-600 hover:text-blue-800">
                All Products →
              </Link>
              <Link to="/products?category=electronics" className="block text-blue-600 hover:text-blue-800">
                Electronics →
              </Link>
              <Link to="/products?category=fashion" className="block text-blue-600 hover:text-blue-800">
                Fashion →
              </Link>
              <Link to="/products?category=home" className="block text-blue-600 hover:text-blue-800">
                Home & Kitchen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {!user && (
        <section className="bg-gray-800 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest deals and offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
