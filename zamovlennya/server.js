const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

// File path for storing orders
const ordersFilePath = 'orders.json';

// Endpoint to get all orders
app.get('/orders', (req, res) => {
    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading orders data');
        }
        const orders = JSON.parse(data);
        res.json(orders);
    });
});

// Endpoint to add a new order
app.post('/orders', (req, res) => {
    const newOrder = req.body;

    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading orders data');
        }

        const orders = JSON.parse(data);
        newOrder.id = orders.length ? Math.max(orders.map(order => order.id)) + 1 : 1; // Assign new ID
        orders.push(newOrder);

        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), err => {
            if (err) {
                return res.status(500).send('Error saving order');
            }
            res.status(201).json(newOrder);
        });
    });
});

// Endpoint to update an order
app.put('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const updatedOrder = req.body;

    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading orders data');
        }

        const orders = JSON.parse(data);
        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex === -1) {
            return res.status(404).send('Order not found');
        }

        orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };

        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), err => {
            if (err) {
                return res.status(500).send('Error saving order');
            }
            res.json(orders[orderIndex]);
        });
    });
});

// Endpoint to delete an order
app.delete('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);

    fs.readFile(ordersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading orders data');
        }

        const orders = JSON.parse(data);
        const filteredOrders = orders.filter(order => order.id !== orderId);

        if (orders.length === filteredOrders.length) {
            return res.status(404).send('Order not found');
        }

        fs.writeFile(ordersFilePath, JSON.stringify(filteredOrders, null, 2), err => {
            if (err) {
                return res.status(500).send('Error deleting order');
            }
            res.status(204).send(); // Send status 204 (No Content)
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
