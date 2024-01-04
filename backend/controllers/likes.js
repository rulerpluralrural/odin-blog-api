import PostLikes from "../models/postLikes.js";
import CommentLikes from "../models/commentLikes.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

export default {
	add_like_post: asyncHandler(async (req, res) => {
		const userID = req.user._id;
		const postID = req.params.id;

		const userPostLike = await PostLikes.findOne({
			user: userID,
			post: postID,
		});

		if (userPostLike) {
			await userPostLike.deleteOne({ _id: userPostLike._id });

			const likesCount = await PostLikes.countDocuments({ post: postID });

			return res.status(StatusCodes.OK).json({
				like: userPostLike,
				likesCount: likesCount,
				msg: "Like removed",
			});
		}

		const like = new PostLikes({
			user: userID,
			post: postID,
		});

		await like.save();
		const likesCount = await PostLikes.countDocuments({ post: postID });

		res
			.status(StatusCodes.CREATED)
			.json({ like: like, likesCount: likesCount });
	}),

	add_like_comment: asyncHandler(async (req, res) => {
		const userID = req.user._id;
		const commentID = req.params.id;

		const userCommentLike = await CommentLikes.findOne({
			user: userID,
			comment: commentID,
		});

		if (userCommentLike) {
			await userCommentLike.deleteOne({ _id: userCommentLike._id });

			const likesCount = await CommentLikes.countDocuments({
				comment: commentID,
			});

			return res.status(StatusCodes.OK).json({
				like: userCommentLike,
				msg: "Like removed",
				likesCount: likesCount,
			});
		}

		const like = new CommentLikes({
			user: userID,
			comment: commentID,
		});

		await like.save();
		const likesCount = await CommentLikes.countDocuments({
			comment: commentID,
		});

		res
			.status(StatusCodes.CREATED)
			.json({ like: like, likesCount: likesCount });
	}),
};
