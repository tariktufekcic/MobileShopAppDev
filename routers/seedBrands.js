// seedBrands.js

const mongoose = require('mongoose');
const Brand = require('../models/brandModel'); // Putanja do vašeg brandModela

const brands = [
    { name: 'Samsung' },
    { name: 'Xiaomi' },
    { name: 'iPhone' },
    { name: 'Nokia' },
    { name: 'Vivo' },
    { name: 'Sony' },
    { name: 'Huawei' }
];

const seedBrands = async () => {
    try {
        await mongoose.connect('mongodb+srv://trktfkcc:PowQB3pqWtdmsKxW@cluster1.3qezmjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true });
        
        await Brand.deleteMany({}); // Brisanje svih postojećih brendova (opcionalno)
        
        await Brand.insertMany(brands);
        
        console.log('Brands have been seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding brands:', error);
    }
};

seedBrands();
