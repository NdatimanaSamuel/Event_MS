const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URLI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to Database`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
