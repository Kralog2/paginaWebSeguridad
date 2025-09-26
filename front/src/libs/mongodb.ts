import "server-only"; // Ensure this module is only used in server-side code and not bundled for client-side
import mongoose, { Connection } from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

// Define a global variable to hold the cached connection
type MongooseGlobal = {
  conn: Connection | typeof mongoose | null;
  promise: Promise<Connection | typeof mongoose> | null;
};

declare global {
  var _mongoose: MongooseGlobal | undefined;
}

const cached: MongooseGlobal = global._mongoose || {
  conn: null,
  promise: null,
};

if (!global._mongoose) {
  global._mongoose = cached;
}

const options: Parameters<typeof mongoose.connect>[1] = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, options);
    }
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise on failure to allow retries
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to MongoDB");
  }
  console.log("MongoDB is connected");
  return cached.conn;
};
