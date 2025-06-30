const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/cart/:customer_id', async (req, res) => {
    const { customer_id } = req.params;
    try{
        const [cart] = await pool.query(`
            select
                users.id,
                first_name,
                last_name,
                email,
                product_id,
                json_arrayagg(
                    json_object(
                        'title', cart.title,
                        'author', cart.author,
                        'price', cart.price,
                        'quantity', cart.quantity,
                        'added_at', cart.added_at
                    )
                ) as cart
            from users left join cart
            on users.id = cart.customer_id
            where customer_id = ${customer_id}
        `);
        console.log(cart[0] , cart);
        res.json(cart[0] || null);
    }catch(err){
        console.log('Error fetching users. ', err);
        res.status(500).json({message: 'Server error', error: err.message});
    }
})

// Add to cart
router.post('/cart', async (req, res) => {
    const { customer_id, product_id, title, author, price, quantity} = req.body;
    console.log(req.body);
    if(!customer_id || !product_id){
        return res.status(400).json({message: 'All fields are required.'});
    }
    try{
        await pool.query(
          'INSERT INTO cart (customer_id, product_id, title, author, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
          [customer_id, product_id, title, author, price, quantity]
        )
        res.status(201).json({message: "Book added to cart successfully."})
    }
    catch(err){
        console.error('Add to cart error:', err);
        res.status(500).json({message: "Server error", error: err.message})
    }
})

module.exports = router;