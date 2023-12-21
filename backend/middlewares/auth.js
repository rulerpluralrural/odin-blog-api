import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { UnauthenticatedError } from "../errors/index.js";

const auth = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith("Bearer")) {
		const token = authHeader.split(" ")[1];
		try {
			const payload = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(payload.id);
			next();
		} catch (error) {
			throw new UnauthenticatedError("Authentication Invalid");
		}
	} 

	if (!authHeader) {
		throw new UnauthenticatedError("Not Authorized, no token");
	}
});

export default auth;
