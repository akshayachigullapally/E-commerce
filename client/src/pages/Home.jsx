import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

const Home = () => {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Generate dynamic testimonials using faker
    const generateTestimonials = () => {
      return Array.from({ length: 3 }, () => ({
        name: faker.person.fullName(),
        rating: 5,
        comment: faker.lorem.sentence({ min: 8, max: 15 }),
        avatar: faker.person.firstName().charAt(0) + faker.person.lastName().charAt(0)
      }));
    };
    
    setTestimonials(generateTestimonials());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                ShopEase
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <Link
                to="/products"
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
              >
                Shop Now
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShopEase?
            </h2>
            <p className="text-gray-600 text-lg">
              We provide the best shopping experience with these amazing features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our express shipping options.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
              <p className="text-gray-600">Curated selection of high-quality products from trusted brands.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Shopping</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Don't take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-indigo-600">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of satisfied customers and experience the best online shopping.
            </p>
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
