require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('./db');

const products = [
  {
    name: "Nike Air Max",
    price: 129.99,
    description: "Classic Nike Air Max sneakers with superior comfort and style",
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww",
    stock: 50
  },
  {
    name: "Adidas Ultraboost",
    price: 159.99,
    description: "Premium running shoes with responsive boost cushioning",
    imageUrl: "https://placehold.co/400x300?text=Adidas+Ultraboost",
    stock: 40
  },
  {
    name: "Puma RS-X",
    price: 99.99,
    description: "Retro-inspired chunky sneakers with modern technology",
    imageUrl: "https://placehold.co/400x300?text=Puma+RS-X",
    stock: 30
  },
  {
    name: "New Balance 574",
    price: 79.99,
    description: "Classic lifestyle sneakers with excellent comfort",
    imageUrl: "https://placehold.co/400x300?text=New+Balance+574",
    stock: 45
  },
  {
    name: "Converse Chuck Taylor",
    price: 59.99,
    description: "Timeless high-top canvas sneakers",
    imageUrl: "https://placehold.co/400x300?text=Converse+Chuck",
    stock: 60
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Delete existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} products`);

    // Log created products with their IDs
    createdProducts.forEach((product) => {
      console.log(`Created product: ${product.name} (${product._id})`);
    });

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();