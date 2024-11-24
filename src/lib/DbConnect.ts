import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection: ConnectionObject = {};

  export async function connectDb(): Promise<void> {
    if (connection.isConnected) {
      console.log("already connected");
      return;
    }
    try {
        const db= await mongoose.connect(process.env.MONGO_URI || '', {});

        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB Succesfully");

    } catch (error) {
        console.log("Error connecting to MongoDB", error);
      process.exit(1);
    }
    
  }

  // export default connectDb;