import React, { useEffect, useState } from "react";
import {
	FaAt,
	FaRegClock,
	FaRegThumbsUp,
	FaThumbsUp,
	FaRegUser,
	FaRegThumbsDown,
} from "react-icons/fa";
import { toast } from "react-toastify";

const PostContent = ({ post, user }) => {
	return (
		<>
			<PostDetails post={post} user={user} />
			<PostForm user={user} />
			{post.comments.length === 0 ? (
				<div className="self-center py-10">
					<p className="font-semibold">
						There are no comments yet on this post!
					</p>
				</div>
			) : (
				<PostComments post={post} user={user} />
			)}
		</>
	);
};

const PostDetails = ({ post, user }) => {
	const [isLiked, setIsLiked] = useState(null);
	const [likesCount, setLikesCount] = useState(post.likes.length)

	const addPostLike = async () => {
		try {
			if (!user) {
				const notify = toast.warning("Log in to leave a like");

				setTimeout(() => {
					toast.dismiss(notify);
				}, 5000);
			} else {
				const data = await fetch(
					`http://localhost:8000/api/blog/posts/${post._id}/like`,
					{
						method: "POST",
						credentials: "include",
						headers: {
							["Content-Type"]: "application/json; charset=utf-8",
						},
					}
				).then((res) => res.json());
				setIsLiked(data.like !== undefined);
				setLikesCount(data.likesCount)
			}
		} catch (error) {
			console.log(error);
		}
	};

	console.log(isLiked);

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
						{isLiked === true ? (
							<FaThumbsUp
								className="cursor-pointer hover:animate-bounce hover:text-blue-800 focus:animate-bounce focus-within:text-blue-800 text-2xl text-blue-800"
								onClick={addPostLike}
							/>
						) : (
							<FaRegThumbsUp
								className="cursor-pointer hover:animate-bounce hover:text-blue-800 focus:animate-bounce focus-within:text-blue-800 text-2xl"
								onClick={addPostLike}
							/>
						)}
						<p className="ml-1 font-bold">{likesCount}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const PostForm = ({ user }) => {
	if (!user) {
		return (
			<div className="p-5 mt-6 flex self-center items-center justify-center w-[260px] border-[1px] border-green-400 rounded-md">
				<p className="font-semibold">Login to leave a comment</p>
			</div>
		);
	}

	return (
		<div className="p-5 self-center flex flex-col justify-center items-center w-[600px]">
			<form className="flex flex-col gap-2 items-center w-full">
				<label className="font-semibold text-xl font-serif">
					Leave a comment
				</label>
				<textarea
					type="text"
					name="comment"
					id="comment"
					placeholder="Add a comment..."
					className="w-full border-2 border-slate-300 rounded-sm p-2 h-28"
				/>
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

const PostComments = ({ post }) => {
	return (
		<div className="flex flex-col self-center py-10 w-[600px]">
			{post.comments.map((comment, index) => {
				return (
					<div
						key={index}
						className="grid grid-cols-[100px_1fr] gap-1 items-center mb-2 pb-2 border-b-[1px] border-slate-300"
					>
						<FaRegUser className="text-4xl w-full h-full p-5 rounded-sm border-[1px] border-slate-300" />
						<div className="w-full flex flex-col mb-2 ">
							<p className="font-bold font-serif text-blue-800">
								{comment.user.username}
							</p>
							<p className="py-1 flex-1">{comment.comment}</p>
							<div className="flex gap-3 items-center">
								<button type="button" className="text-blue-900">
									Like
								</button>
								<div className="flex items-center gap-1">
									<FaRegClock /> <em>{comment.date_formatted}</em>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default PostContent;
