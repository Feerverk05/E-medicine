const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer(); 

const dataFilePath = path.join(__dirname, 'data.json');

// Function to read data from file
const readData = () => {
    const jsonData = fs.readFileSync(dataFilePath);
    return JSON.parse(jsonData);
};

// Function to write data to file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Get all medicines
app.get('/products', (req, res) => {
    const medicines = readData();
    res.json(medicines);
});

// Add new medicine
// Add new medicine
app.post('/products', upload.none(), (req, res) => {
    const medicines = readData();
    
    // Check if medicines array is empty
    let newId;
    if (medicines.length === 0) {
        newId = 1; // Start with 1 if there are no medicines
    } else {
        // Generate a new unique ID
        newId = medicines.reduce((maxId, medicine) => Math.max(maxId, parseInt(medicine.id)), 0) + 1;
    }

    const newMedicine = { id: newId.toString(), ...req.body }; // Ensure ID is a string
    medicines.push(newMedicine);
    writeData(medicines);
    res.status(201).json(newMedicine);
});

// Update medicine
app.put('/products/:id', (req, res) => {
    const medicines = readData();
    const medicineIndex = medicines.findIndex(m => m.id === req.params.id); // Compare as strings
    if (medicineIndex === -1) {
        return res.status(404).json({ message: 'Medicine not found' });
    }
    medicines[medicineIndex] = { id: req.params.id, ...req.body }; // Keep the ID as a string
    writeData(medicines);
    res.json(medicines[medicineIndex]);
});

// Delete medicine
app.delete('/products/:id', (req, res) => {
    const medicines = readData();
    const filteredMedicines = medicines.filter(m => m.id !== req.params.id); // Compare as strings
    if (medicines.length === filteredMedicines.length) {
        return res.status(404).json({ message: 'Medicine not found' });
    }
    writeData(filteredMedicines);
    res.json({ message: 'Medicine deleted' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
