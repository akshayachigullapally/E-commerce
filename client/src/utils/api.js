import { API_ENDPOINTS } from '../config/api';

class ApiService {
  static async request(url, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get(endpoint) {
    return this.request(endpoint);
  }

  static async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  static async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Specific API methods
  static getProducts(params = {}) {
    const searchParams = new URLSearchParams(params);
    const url = `${API_ENDPOINTS.products}?${searchParams}`;
    return this.get(url);
  }

  static getCategories() {
    return this.get(API_ENDPOINTS.categories);
  }

  static createOrder(orderData) {
    return this.post(API_ENDPOINTS.orders, orderData);
  }
}

export default ApiService;
