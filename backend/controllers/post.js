import Post from "../models/post.js";
import Comments from "../models/comment.js";
import PostLikes from "../models/postLikes.js";
import CommentLikes from "../models/commentLikes.js";
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
			const filter = { featured: true };

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const post = new Post({
				title: req.body.title,
				content: req.body.content,
				author: req.user._id,
				published: req.body.published,
				featured: req.body.featured,
				imgURL: req.body.imgURL,
			});

			if (post.featured === true) {
				await Post.findOneAndUpdate(filter, { featured: false }, { new: true });
			}

			// console.log(req.user);
			await post.save();

			res.status(StatusCodes.CREATED).json({ post });
		}),
	],

	// GET request for a single post
	get_post: asyncHandler(async (req, res) => {
		const postId = req.params.id;

		const post = await Post.findOne({ _id: postId })
			.populate("author", "username")
			.populate({
				path: "comments",
				populate: [{ path: "user", select: "username" }, { path: "likes" }],
				options: {
					sort: {
						createdAt: -1,
					},
				},
			})
			.populate("likes")
			.exec();

		if (!post) {
			throw new NotFoundError(`No post with the id ${postId}`);
		}

		res.status(StatusCodes.OK).json({ post });
	}),

	// GET request for all posts
	get_posts: asyncHandler(async (req, res) => {
		const posts = await Post.find()
			.populate("author", "username")
			.populate("comments")
			.populate("likes")
			.exec();

		if (!posts) {
			throw new NotFoundError(`There are no posts!`);
		}

		res.status(StatusCodes.OK).json({ posts: posts });
	}),

	// POST request for post update
	update_post: [
		check("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
		check("content")
			.trim()
			.isLength({ min: 1 })
			.withMessage("Content is required"),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);
			const postID = req.params.id;
			const filter = { featured: true };

			if (!errors.isEmpty()) {
				throw new BadRequestError(errors.array());
			}

			const post = new Post({
				title: req.body.title,
				content: req.body.content,
				author: req.user._id,
				published: req.body.published,
				featured: req.body.featured,
				imgURL: req.body.imgURL,
				_id: req.params.id,
			});

			if (!post) {
				throw new NotFoundError(`No post found with this id ${postID}`);
			}

			if (post.featured === true) {
				await Post.findOneAndUpdate(filter, { featured: false }, { new: true });
			}

			await Post.findByIdAndUpdate({ _id: postID }, post, {
				new: true,
			});

			res.status(StatusCodes.CREATED).json({ post });
		}),
	],

	delete_post: asyncHandler(async (req, res) => {
		const postID = req.params.id;
		const post = await Post.findById({ _id: postID });

		if (!post) {
			throw new NotFoundError(`No post with this id ${postID}`);
		}

		await post.deleteOne()

		res.status(StatusCodes.OK).json({
			msg: `Post deleted successfully`,
			id: post._id,
			title: post.title,
		});
	}),
};
