const mongoose = require("mongoose");

const connectDB = async () => 
{
  try 
  {
    if (!process.env.MONGO_URI) 
        {
         throw new Error("MONGO_URI is not defined in .env");
        }

    const conn = await mongoose.connect(process.env.MONGO_URI, 
        {
         serverSelectionTimeoutMS: 10000,
        });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);

    mongoose.connection.on("error", (err) => 
        {
         console.error("❌ MongoDB connection error:", err.message);
        });

    mongoose.connection.on("disconnected", () => 
        {
          console.warn("⚠️  MongoDB disconnected");
        });

    return conn;
  } 
  catch (error) 
  {
    console.error("❌ MongoDB connection FAILED:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;