import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database.js";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error-handler.js";
import session from "express-session";
import cors from "cors";

const app = express();

// ROUTERS
import indexRouter from "./routes/index.js";

// MIDDLEWARES
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			signed: true,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);

// Routes
app.get("/", (req, res) => {
	res.redirect("/api/blog/posts");
});
app.use("/api/blog", indexRouter);

// Error Handler
app.use(errorHandler);

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
