import React, { useState } from "react";
import {
	FaAt,
	FaRegClock,
	FaRegThumbsUp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Comment from "../Comments/Comment";

const PostContent = ({ post, user, id }) => {
	const [comments, setComments] = useState(post.comments);

	return (
		<>
			<PostDetails post={post} user={user} id={id} />
			<PostForm
				user={user}
				setComments={setComments}
				comments={comments}
				id={id}
			/>
			{post.comments.length <= 0 ? (
				<div className="self-center py-10">
					<p className="font-semibold">
						There are no comments yet on this post!
					</p>
				</div>
			) : (
				<PostComments
					comments={comments}
					user={user}
					setComments={setComments}
				/>
			)}
		</>
	);
};

const PostDetails = ({ post, user, id }) => {
	const [likesCount, setLikesCount] = useState(post.likes.length);

	const addPostLike = async () => {
		try {
			if (!user) {
				const notify = toast.warning("Log in to leave a like");

				setTimeout(() => {
					toast.dismiss(notify);
				}, 5000);
			} else {
				const data = await fetch(
					`http://localhost:8000/api/blog/posts/${id}/like`,
					{
						method: "POST",
						credentials: "include",
						headers: {
							["Content-Type"]: "application/json; charset=utf-8",
						},
					}
				).then((res) => res.json());
				setLikesCount(data.likesCount);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] place-items-center bg-slate-100 text-center py-10 gap-2 px-0 lg:px-10 xl:px-32">
			<div className="flex flex-col items-center">
				<h1 className="font-serif font-semibold text-2xl p-3 underline">
					{post.title}
				</h1>
				<div className="w-full">
					<img
						src={post.imgURL}
						alt={`${post.title} image`}
						className=" rounded-md"
					/>
					<div className="flex justify-between py-2 px-1">
						<div className="flex items-center gap-1">
							<FaAt></FaAt>
							<p>{post.author.username}</p>
						</div>
						<div className="flex items-center gap-1 italic">
							<FaRegClock></FaRegClock>
							<p>{post.date_formatted}</p>
						</div>
					</div>
				</div>
				<hr className="border-[1px] border-slate-300 w-full" />
			</div>
			<div className="flex flex-col justify-center px-10 xl:px-20">
				<p className="text-center first-letter:font-bold first-letter:text-4xl first-letter:font-serif">
					{post.content}
				</p>
				<div className="flex flex-col items-center justify-center gap-1 font-serif text-lg mt-5">
					<p>Did you enjoy this post?</p>
					<div className="flex items-center justify-center">
						<p className="mr-2">Leave a like:</p>
							<FaRegThumbsUp
								className="cursor-pointer hover:animate-bounce hover:text-blue-800 focus:animate-bounce focus-within:text-blue-800 text-2xl"
								onClick={addPostLike}
							/>
						<p className="ml-1 font-bold">{likesCount}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const PostForm = ({ user, setComments, comments, id }) => {
	const [comment, setComment] = useState("");

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleComment = async (e) => {
		e.preventDefault();
		try {
			const data = await fetch(
				`http://localhost:8000/api/blog/posts/${id}/comment`,
				{
					method: "POST",
					body: JSON.stringify({ comment }),
					credentials: "include",
					headers: {
						["Content-Type"]: "application/json; charset=utf-8",
					},
				}
			).then((res) => res.json());
			e.target.reset();
			setComments([data.comment, ...comments]);
		} catch (error) {
			console.log(error);
		}
	};

	if (!user) {
		return (
			<div className="p-5 mt-6 flex self-center items-center justify-center w-[260px] border-[1px] border-green-400 rounded-md">
				<p className="font-semibold">Login to leave a comment</p>
			</div>
		);
	}

	return (
		<div className="p-5 self-center flex flex-col justify-center items-center w-[600px]">
			<form
				className="flex flex-col gap-2 items-center w-full"
				onSubmit={handleComment}
			>
				<label className="font-semibold text-xl font-serif">
					Leave a comment
				</label>
				<textarea
					type="text"
					name="comment"
					id="comment"
					placeholder="Add a comment..."
					className="w-full border-2 border-slate-300 rounded-sm p-2 h-28"
					onChange={handleChange}
				></textarea>
				<div className=" w-full items-center">
					<button
						type="submit"
						className="bg-red-700 text-white text-lg px-2 py-1 rounded-sm hover:bg-blue-600 transition-colors w-full"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

const PostComments = ({ comments, user, setComments }) => {
	return (
		<div className="flex flex-col self-center py-10 w-[600px]">
			{comments.map((comment, index) => (
				<Comment
					comment={comment}
					user={user}
					setComments={setComments}
					comments={comments}
					key={index}
				/>
			))}
		</div>
	);
};

export default PostContent;
