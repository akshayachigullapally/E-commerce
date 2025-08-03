import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order, shippingAddress } = location.state || {};
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    // Remove confetti after animation
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const items = JSON.parse(order.items);
  const address = JSON.parse(order.shipping_address);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)]
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-lg text-gray-500">
            Order ID: <span className="font-mono font-semibold text-indigo-600">#{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
              <h2 className="text-xl font-semibold text-white">Order Details</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">{order.payment_method.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-indigo-600">${order.total_price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600">
              <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-gray-600">{address.email}</p>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-900">{address.address}</p>
                  <p className="text-gray-900">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-gray-900">{address.country}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Estimated Delivery:</span> 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600">
            <h2 className="text-xl font-semibold text-white">Order Items</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6.5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
            </svg>
            <span>Continue Shopping</span>
          </Link>
          
          <button
            onClick={() => window.print()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Receipt</span>
          </button>
        </div>

        {/* What's Next */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-semibold">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Order Processing</h4>
              <p className="text-sm text-gray-600">We'll prepare your items for shipment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-semibold">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
              <p className="text-sm text-gray-600">Your order will be shipped within 1-2 business days</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-semibold">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Delivery</h4>
              <p className="text-sm text-gray-600">Expect delivery in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
