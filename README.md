# E-Commerce Application

A full-stack e-commerce application built with React.js frontend and Node.js backend, using Supabase as the database.

## 🚀 Features

- **User Authentication**: Login, register, and user management
- **Product Catalog**: Browse products with categories and search functionality
- **Shopping Cart**: Add, remove, and update cart items with persistent storage
- **Advanced Filtering**: Filter products by category, price range, and search terms
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Cart updates in real-time across the application

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Context API** - State management
- **React Router** - Navigation
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **ES6 Modules** - Modern JavaScript

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) account

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd commerce
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Supabase Configuration

1. Create a new project on [Supabase](https://supabase.com/)
2. Go to Settings > API to get your URL and anon key
3. **Disable Email Confirmation** (Important):
   - Navigate to Authentication > Settings in your Supabase dashboard
   - Find "Email Confirmation" setting
   - Turn OFF "Enable email confirmations"
   - Save the changes
4. Update the `.env` file with your credentials

#### Database Schema

Create the following tables in your Supabase database:

```sql
-- Users table (handled by Supabase Auth)

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

### Start the Frontend

```bash
cd client
npm start
```

The application will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
commerce/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   ├── utils/          # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── .env               # Environment variables
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Main server file
│   ├── .env              # Environment variables
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Frontend (client/)
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend (server/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌐 Environment Variables

### Client (.env)
- `VITE_API_URL` - Base URL for the backend server
- `VITE_API_BASE_URL` - Base URL for API endpoints

### Server (.env)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `PORT` - Port for the server (default: 5000)
- `CORS_ORIGIN` - Allowed origin for CORS (default: http://localhost:3000)
- `NODE_ENV` - Environment (development/production)

## 🌟 Key Components

### Cart Context (`client/src/context/CartContext.jsx`)
Manages shopping cart state using React's useReducer hook:
- Add items to cart
- Update item quantities
- Remove items from cart
- Calculate totals
- Persist cart data

### API Configuration (`client/src/config/api.js`)
Centralized API endpoint management:
- Environment-based URL configuration
- Consistent API endpoint definitions
- Easy to modify for different environments

### Products Page (`client/src/pages/ProductsPage.jsx`)
Main shopping interface featuring:
- Product grid with responsive design
- Left-sidebar filters
- Category and price filtering
- Search functionality
- Add to cart functionality

## 🔄 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's orders

## 🎨 Styling

The application uses vanilla CSS with:
- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS Custom Properties for theming
- Mobile-first responsive design
- Smooth transitions and hover effects

## 🚧 Troubleshooting

### Common Issues

1. **Supabase Error**: "supabaseUrl is required"
   - Make sure your `.env` file exists in the server directory
   - Verify your Supabase credentials are correct

2. **Email confirmation required**
   - Go to Supabase Dashboard > Authentication > Settings
   - Disable "Enable email confirmations"
   - Users will be able to sign in immediately after registration

3. **Images not loading**
   - Check image URLs in your database
   - Fallback images are implemented for missing images

4. **Cart not persisting**
   - Ensure user authentication is working
   - Check Supabase connection

5. **CORS errors**
   - Verify `CORS_ORIGIN` in server `.env` matches your frontend URL
   - Check that both frontend and backend are running

6. **API endpoint errors**
   - Verify `VITE_API_BASE_URL` in client `.env` is correct
   - Ensure backend server is running on the correct port

7. **Environment variables not loading**
   - Make sure `.env` files are in the correct directories
   - Restart your development servers after changing `.env` files
   - Use `VITE_` prefix for client-side environment variables

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Express.js](https://expressjs.com/) - Web framework
- [Node.js](https://nodejs.org/) - Runtime environment

## 📞 Support

If you have any questions or run into issues, please:
1. Check the troubleshooting section above
2. Verify your environment variables are set correctly
3. Search existing issues in the repository
4. Create a new issue with detailed information

---

Made with ❤️ for learning and development
