import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { check, validationResult } from "express-validator";

export default {
	// Display all users on GET
	users_get: asyncHandler(async (req, res) => {
		const users = await User.find()
			.sort([["username", "ascending"]])
			.select("-password")
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

		req.session.token = token;

		res
			.status(StatusCodes.OK)
			.json({ user: { username: user.username, id: user._id }, token });
	}),

	// Handle sign-up on POST
	sign_up_post: [
		check("username")
			.trim()
			.isLength({ min: 1 })
			.escape()
			.withMessage("Username is required")
			.custom(async (value) => {
				const existingUsername = await User.findOne({ username: value });
				if (existingUsername) {
					throw new BadRequestError(
						"Username already in use, Please choose a different one"
					);
				}
			}),
		check("email")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Email is required")
			.custom(async (value) => {
				const existingEmail = await User.findOne({ existingEmail: value });
				if (existingEmail) {
					throw new BadRequestError(
						"E-mail is not available, Please choose a different one."
					);
				}
			})
			.isEmail()
			.withMessage("Email is not valid"),
		check("password")
			.trim()
			.isLength({ min: 6 })
			.withMessage(
				"Password is required and must be at least 5 characters long"
			),
		check("password2").custom(async (value, { req }) => {
			if (value !== req.body.password) {
				throw new BadRequestError(
					"Password confirmation does not match password"
				);
			}
		}),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}
			const user = await User.create({ ...req.body });

			if (user) {
				const token = user.createJWT();
				req.session.token = token;

				res.status(StatusCodes.CREATED).json({
					user: { id: user._id, username: user.username, email: user.email },
					token,
				});
			} else {
				throw new BadRequestError("Invalid user data");
			}
		}),
	],

	// Handle user logout POST
	logout: asyncHandler(async (req, res) => {
		res.cookie("token", "logout", {
			httpOnly: true,
			expires: new Date(Date.now() + 1000),
		});
		req.session.token = undefined;
		res.status(StatusCodes.OK).json({ msg: "User logged out" });
	}),

	// Check user session
	check_user_session: asyncHandler(async (req, res) => {
		res.status(StatusCodes.OK).json({ user: req.user });
	}),
};
