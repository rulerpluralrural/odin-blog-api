import Posts from "../models/post.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { check, validationResult } from "express-validator";

export default {
	// POST request for creating a post
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

			console.log(req.user);
			await post.save();

			res.status(StatusCodes.CREATED).json({ post });
		}),
	],

	// GET request for a single post
	get_post: asyncHandler(async (req, res) => {
		const postId = req.params.id;

		const post = await Posts.findOne({ _id: postId }).populate("author").exec();

		if (!post) {
			throw new NotFoundError(`No post with the id ${postId}`);
		}

		res.status(StatusCodes.OK).json({ post });
	}),

	// GET request for all posts
	get_posts: asyncHandler(async (req,res) => {
		const posts = await Posts.find({}).exec()

		if (!posts) {
			throw new NotFoundError(`There are no posts!`)
		}

		res.status(StatusCodes.OK).json({posts})
	})
};
