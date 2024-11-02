const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Endpoint для отримання статистики продажів
app.get('/sales/statistics', (req, res) => {
    fs.readFile('sales.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading sales data');
        }
        
        const sales = JSON.parse(data);
        const totalSales = sales.reduce((acc, sale) => acc + sale.quantity, 0);
        
        res.json({ totalSales, sales });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
