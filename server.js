import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(express.json());

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://VaiS:vais123@cluster0.pndblqp.mongodb.net/?retryWrites=true&w=majority&dbname=revpay");
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

//Routes                                                                      
app.use('/api/users', userRoutes);


app.listen(8000, () => {
   connect();
    console.log("Backend server is running!");
  });