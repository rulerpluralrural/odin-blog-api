import Posts from "../models/post.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { check, validationResult } from "express-validator";

export default {
	// GET all posts
	create_post: [
		check("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
		check("content")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Content is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json({ msg: errors.array() });
			}

			const post = new Posts({
				title: req.body.title,
				content: req.body.content,
				author: req.user._id,
				published: req.body.published,
			});

            console.log(req.user)
			await post.save();

			res.status(StatusCodes.CREATED).json({ post });
		}),
	],
};
