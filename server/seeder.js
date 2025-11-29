// server/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // We will create this next
const products = require('./data/products'); // ✅ Looks inside server/data
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create sample users (Admin & User)
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // The first user will be Admin

    // 3. Add Admin as the "owner" of the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}