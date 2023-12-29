import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch(
					`http://localhost:8000/api/blog/posts/${id}`
				).then((res) => res.json());
				setPost(data.post);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchData();
	}, []);
	console.log(post);

	if (loading || post === null) {
		return (
			<div className="flex h-full flex-col justify-center items-center">
				<h1 className="font-bold font-serif text-xl">
					Fetching data please wait...
				</h1>
				<PuffLoader size={125} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<h1>{post.title}</h1>
				<div>
					<img src={post.imgURL} alt={`${post.title} image`} />
					<div>
						<div>
							<p>@{post.author.username}</p>
							<p>{post.date_formatted}</p>
						</div>
						<p>{post.content}</p>
					</div>
				</div>
			</div>
			<div>
				<form>
                    <label htmlFor="comment">Leave a comment</label>
					<input type="text" name="comment" id="comment"/>
                    <button type="submit">Submit</button>
				</form>
			</div>
            <div>
                {post.comments.map((comment, index) => {
                    return <div key={index}>
                        <p>{comment.user.username}</p>
                        <p>{comment.date_formatted}</p>
                        <p>{comment.comment}</p>
                    </div>
                })}
            </div>
		</div>
	);
};

export default Post;
