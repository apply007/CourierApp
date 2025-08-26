import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  //|| 'mongodb://127.0.0.1:27017/courier_db';
  await mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Mongo error =>", err.message));
};
export default connectDB;
