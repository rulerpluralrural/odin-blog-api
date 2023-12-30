import React from "react";
import { Link } from "react-router-dom";
import {
	FaAngleDoubleRight,
	FaRegComment,
	FaRegThumbsUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Posts = ({ posts, user }) => {
	return (
		<>
			{posts.map((post, index) => {
				return (
					<div key={index} className="flex flex-col">
						<PostCardHeader post={post} user={user} />
						<PostCardContent post={post} />
					</div>
				);
			})}
		</>
	);
};

const PostCardHeader = ({ post, user }) => {
	return (
		<>
			<div>
				<img
					src={post.imgURL}
					alt={`${post.title} image`}
					className="rounded-md object-cover"
				/>
			</div>
			<div className="py-1 flex justify-between border-b-[1px] border-slate-400">
				<div>
					<p className="font-semibold">
						@{post.author.username}
					</p>
				</div>
				<div>
					<p className="italic text-sm">Date Posted: {post.date_formatted}</p>
				</div>
			</div>
		</>
	);
};

const PostCardContent = ({ post }) => {
	const navigate = useNavigate();

	const redirectToPost = () => {
		return navigate(`/blog/posts/${post._id}`);
	};

	return (
		<div className="flex flex-col gap-1 py-3">
			<div className="flex justify-between items-center text-lg pr-3">
				<Link
					to={`/blog/posts/${post._id}`}
					className="font-bold font-serif text-lg hover:animate-pulse focus:animate-pulse"
				>
					{post.title}
				</Link>
				<div className="flex gap-3 items-center">
					<div className="flex items-center gap-1">
						<FaRegThumbsUp></FaRegThumbsUp>
						<p>{post.likes.length}</p>
					</div>
					<div className="flex items-center gap-1">
						<FaRegComment></FaRegComment>
						<p className="mb-[1px]">{post.comments.length}</p>
					</div>
				</div>
			</div>
			<p className="text-justify">
				{post.content.length > 200
					? post.content.substring(0, 200) + "..."
					: post.content}
			</p>
			<button
				type="button"
				className="flex items-center justify-center gap-1 bg-red-700 text-white px-3 py-1 w-full rounded-sm hover:bg-red-800 focus:bg-red-800 transition-colors mt-2"
				onClick={redirectToPost}
			>
				<FaAngleDoubleRight /> Read Full Article
			</button>
		</div>
	);
};

export default Posts;
