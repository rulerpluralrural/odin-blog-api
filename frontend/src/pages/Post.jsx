import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import PostContent from "../components/PostPage/PostContent";

const Post = ({ user }) => {
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
		<div className="flex flex-col">
			<PostContent post={post} user={user} />
		</div>
	);
};

export default Post;
