import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts, isLoggedIn }) => {
	return (
		<>
			{posts.map((post, index) => {
				return (
					post.published && (
						<div key={index}>
							<Link to={`/posts/${post._id}`}>{post.title}</Link>
							<br />
							{isLoggedIn ? (
								<Link to={`/author/${post.author._id}`}>
									@{post.author.username}
								</Link>
							) : (
								<small>Login to view the author of this post!</small>
							)}
							<p>{post.content}</p>
							{isLoggedIn ? (
								<p>{post.date_formatted}</p>
							) : (
								<small>Login to view timestamp!</small>
							)}
						</div>
					)
				);
			})}
		</>
	);
};

export default Posts;
