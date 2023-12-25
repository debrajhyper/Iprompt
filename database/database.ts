import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('---------------------- MongoDB is already connected ----------------------');
        return;
    }

    const options = {
        dbName: "i_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, options)

        isConnected = true;
        console.log("MongoDB Connected.....................")
    } catch (error) {
        console.log(error)
    }
}