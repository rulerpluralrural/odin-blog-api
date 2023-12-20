import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database.js";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error-handler.js";

// AUTHENTICATION
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "./models/user.js";

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
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport JS
// passport.use(
// 	new LocalStrategy(async (username, password, done) => {
// 		try {
// 			const user = await User.findOne({ username: username });

// 			if (!user) return done(null, false, { message: "Username not found" });

// 			bcrypt.compare(password, user.password, (err, res) => {
// 				if (res) {
// 					return done(null, user);
// 				} else {
// 					return done(null, false, { message: "Invalid password" });
// 				}
// 			});
// 		} catch (error) {
// 			return done(error);
// 		}
// 	})
// );

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {
// 	User.findById(userId)
// 		.then((user) => {
// 			done(null, user);
// 		})
// 		.catch((err) => done(err));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/");
app.use("/", indexRouter);

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
