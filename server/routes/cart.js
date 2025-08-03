import express from 'express';
import { supabase } from '../server.js';

const router = express.Router();

// Create order
router.post('/orders', async (req, res) => {
  try {
    const { user_id, items, total_price, shipping_address, payment_method } = req.body;
    
    if (!user_id || !items || !total_price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id,
        items: JSON.stringify(items),
        total_price,
        shipping_address: JSON.stringify(shipping_address),
        payment_method,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      order: data,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/orders/:userId/:orderId', async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

