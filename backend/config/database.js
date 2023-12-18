import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async (url) => {
	return await mongoose.connect(url);
};

export default connectDB;
