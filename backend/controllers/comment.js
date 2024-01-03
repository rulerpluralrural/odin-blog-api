import Comment from "../models/comment.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import { check, validationResult } from "express-validator";
import user from "../models/user.js";

export default {
	create_comment: [
		check("comment")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Comment is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: errors.array() });
			}

			const comment = new Comment({
				user: req.user._id,
				post: req.params.id,
				comment: req.body.comment,
			});

			await comment.save();

			await comment.populate("user", "username");

			res.status(StatusCodes.CREATED).json({
				comment,
			});
		}),
	],

	get_comment: asyncHandler(async (req, res) => {
		const commentId = req.params.id;
		const comment = await Comment.findOne({ _id: commentId });

		if (!comment) {
			throw new NotFoundError(`There are no comment with this id ${commentId}`);
		}

		res.status(StatusCodes.OK).json({ comment });
	}),

	get_comments: asyncHandler(async (req, res) => {
		const comments = await Comment.find({})
			.sort([["timestamps", "descending"]])
			.exec();

		if (!comments) {
			throw new NotFoundError("There are no comments");
		}

		res.status(StatusCodes.OK).json({ comments });
	}),

	update_comment: [
		check("comment")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Comment is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);
			const commentId = req.params.id;

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: errors.array() });
			}

			const comment = new Comment({
				comment: req.body.comment,
				_id: commentId,
			});

			await Comment.findByIdAndUpdate(commentId, comment, {
				new: true,
			});

			if (!comment) {
				throw new NotFoundError(`No comment with this id ${commentId}`);
			}

			res.status(StatusCodes.OK).json({ comment });
		}),
	],

	delete_comment: asyncHandler(async (req, res) => {
		const commentId = req.params.id;
		const comment = await Comment.findByIdAndDelete(commentId);

		if (!comment) {
			throw new NotFoundError(`No comment with this id ${commentId}`);
		}

		res.status(StatusCodes.OK).json({
			msg: "Comment successfully deleted",
			id: commentId,
			comment: comment.comment,
		});
	}),
};
