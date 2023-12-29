import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
	FaAngleDoubleRight,
	FaRegThumbsUp,
	FaRegComment,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostHeader = ({ post, user }) => {
	const navigate = useNavigate();

	const redirectToPost = () => {
		return navigate(`/posts/${post._id}`);
	};

	return (
		<div className="flex flex-col items-center bg-slate-100 gap-3 pb-7">
			<Link
				to={`/posts/${post.id}`}
				className="text-3xl font-serif font-bold hover:animate-pulse focus:animate-pulse"
			>
				Featured Blog: {post.title}
			</Link>
			{user ? (
				<p className="text-lg">
					Created by:{" "}
					<Link
						to={`/author/${post.author._id}`}
						className="text-blue-800 font-medium hover:underline focus:underline"
					>
						@{post.author.username}
					</Link>
				</p>
			) : (
				<p className="text-sm font-semibold text-red-700">
					(Login to see the author)
				</p>
			)}
			<div className="w-[450px]">
				<img
					src={post.imgURL}
					alt={`${post.title} image`}
					className="w-full rounded-[5px] object-cover"
				></img>
			</div>
			<div className="flex gap-3 items-center">
				<div className="flex items-center gap-1">
					<p className="font-bold mr-1">Likes: </p>
					<FaRegThumbsUp></FaRegThumbsUp>
					<p>{post.likes.length}</p>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-bold mr-1">Comments: </p>
					<FaRegComment></FaRegComment>
					<p className="mb-[1px]">{post.comments.length}</p>
				</div>
			</div>
			<p className="text-center w-1/3">{post.content}</p>
			<button
				className="flex gap-2 items-center bg-red-700 text-white px-2 py-1 text-lg hover:bg-red-800 focus:bg-red-800 transition-colors rounded-sm"
				onClick={redirectToPost}
			>
				<FaAngleDoubleRight />
				Read full article
			</button>
		</div>
	);
};

export default PostHeader;
