import PostLikes from "../models/postLikes.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export default {
	add_like: asyncHandler(async (req, res) => {
		const like = new PostLikes({
			user: req.user._id,
			post: req.params.id,
		});

		await like.save();

		res.status(StatusCodes.CREATED).json({ like });
	}),
};
