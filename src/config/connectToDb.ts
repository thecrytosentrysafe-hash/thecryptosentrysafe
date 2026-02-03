// "use server";

// import mongoose from "mongoose";

// const connectToDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI!);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("Database connection error:", error);
//     process.exit(1);
//   }
// }

// export default connectToDb;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectToDb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectToDb;
