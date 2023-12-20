import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export default {
	// Display login form on GET
	users_get: asyncHandler(async (req, res) => {
		const users = await User.find()
			.sort([["username", "ascending"]])
			.exec();

		res.status(StatusCodes.OK).json(users);
	}),

	// Handle login on POST
	login_post: asyncHandler(async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new BadRequestError("Please provide your username and password");
		}

		const user = await User.findOne({ username });
		if (!user) {
			throw new UnauthenticatedError("Invalid Username");
		}

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			throw new UnauthenticatedError("Invalid Password");
		}

		const token = user.createJWT();
		res
			.status(StatusCodes.OK)
			.json({ user: { username: user.username }, token });
	}),

	// Handle sign-up form on POST
	sign_up_post: asyncHandler(async (req, res) => {
		const { username, password, email } = req.body;

		if (!username || !password || !email) {
			throw new BadRequestError("Please provide all fields");
		}

		const [existingUsername, existingEmail] = await Promise.all([
			User.findOne({ username }),
			User.findOne({ email }),
		]);

		if (existingUsername) {
			throw new BadRequestError("Username already exists");
		} else if (existingEmail) {
			throw new BadRequestError("Email already exists");
		}

		const user = await User.create({ ...req.body });
		if (user) {
			const token = user.createJWT();
			res.status(StatusCodes.CREATED).json({
				user: { id: user._id, username: user.username, email: user.email },
				token,
			});
		} else {
			throw new BadRequestError("Invalid user data");
		}
	}),
};
