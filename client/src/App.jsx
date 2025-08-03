import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import OrderConfirmation from './pages/OrderConfirmation';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

