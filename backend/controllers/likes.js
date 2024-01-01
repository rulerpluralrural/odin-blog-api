import PostLikes from "../models/postLikes.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";

export default {
	add_like: asyncHandler(async (req, res) => {
		const userID = req.user._id;
		const postID = req.params.id;

		const userPostLike = await PostLikes.findOne({
			user: userID,
			post: postID,
		});

		if (userPostLike) {
			await userPostLike.deleteOne({ _id: userPostLike._id });

			const likesCount = await PostLikes.countDocuments({ post: postID });

			return res.status(StatusCodes.OK).json({likesCount});
		}

		const like = new PostLikes({
			user: userID,
			post: postID,
		});

		await like.save();

		const likesCount = await PostLikes.countDocuments({ post: postID });
		
		res.status(StatusCodes.CREATED).json({ like: like, likesCount: likesCount });
	}),
};
