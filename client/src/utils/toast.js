import { toast } from 'react-toastify';

// Toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Toast utility functions
export const showToast = {
  success: (message) => toast.success(message, toastConfig),
  error: (message) => toast.error(message, toastConfig),
  info: (message) => toast.info(message, toastConfig),
  warning: (message) => toast.warn(message, toastConfig),
};

// Predefined toast messages
export const toastMessages = {
  auth: {
    loginSuccess: "Successfully logged in!",
    loginError: "Failed to log in. Please check your credentials.",
    registerSuccess: "Account created successfully!",
    registerError: "Failed to create account. Please try again.",
    logoutSuccess: "Successfully logged out!",
    logoutError: "Failed to log out. Please try again.",
    passwordChanged: "Password updated successfully!",
    passwordError: "Failed to update password. Please try again.",
  },
  cart: {
    addSuccess: "Item added to cart!",
    addError: "Failed to add item to cart.",
    removeSuccess: "Item removed from cart!",
    removeError: "Failed to remove item from cart.",
    updateSuccess: "Cart updated successfully!",
    updateError: "Failed to update cart.",
  },
  wishlist: {
    addSuccess: "Item added to wishlist!",
    addError: "Failed to add item to wishlist.",
    removeSuccess: "Item removed from wishlist!",
    removeError: "Failed to remove item from wishlist.",
  },
  general: {
    success: "Operation completed successfully!",
    error: "Something went wrong. Please try again.",
    loading: "Loading...",
    networkError: "Network error. Please check your connection.",
  }
};
