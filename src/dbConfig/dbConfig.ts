import mongoose from "mongoose";


export async function connectDB() { 
    try { 
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection failed");
            console.log(error);
            process.exit();
        })
        
    } catch (error) {
        console.log("something went wrong with db connection");
        console.log(error);
    }
}