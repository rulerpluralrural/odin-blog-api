import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

const PostHeader = ({ post, isLoggedIn }) => {
	return (
		<div className="flex flex-col items-center bg-slate-100 gap-3 pb-7">
			<Link to={`/posts/${post.id}`} className="text-3xl font-serif font-bold hover:animate-pulse focus:animate-pulse">
				{post.title}
			</Link>
			{isLoggedIn ? (
				<Link>@{post.author.username}</Link>
			) : (
				<p className="text-sm font-semibold text-red-700">(Login to see the author)</p>
			)}
			<div>
				<img
					src={post.imgURL}
					alt={`${post.title} image`}
					className="w-full rounded-[5px] object-cover border-[1px] border-slate-900"
				></img>
			</div>
			<p className="text-center w-1/3">{post.content}</p>
			<button className="flex gap-2 items-center bg-red-700 text-white px-2 py-1 text-lg hover:bg-red-800 focus:bg-red-800 transition-colors rounded-sm">
				<FaAngleDoubleRight />
				Read full article
			</button>
		</div>
	);
};

export default PostHeader;
