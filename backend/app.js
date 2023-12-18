import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database.js";

import express from "express";

// ROUTERS
import indexRouter from "./routes/index.js";

const app = express();

app.use("/", indexRouter);

const PORT = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`App is connected to the database...`);
        
		app.listen(PORT, () => {
			console.log(`App is listening to PORT ${PORT}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
