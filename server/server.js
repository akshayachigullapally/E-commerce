import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cartRoutes from './routes/cart.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cart', cartRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Products routes
app.get('/api/products', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search = '', 
      category = '', 
      minPrice = 0, 
      maxPrice = 999999,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply category filter
    if (category) {
      query = query.eq('category', category);
    }

    // Apply price range filter
    query = query.gte('price', minPrice).lte('price', maxPrice);

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(from, to);

    const { data, error, count } = await query;
    
    if (error) throw error;

    res.json({
      products: data,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      hasNextPage: to < count - 1,
      hasPreviousPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category');
    
    if (error) throw error;
    
    const categories = [...new Set(data.map(item => item.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
