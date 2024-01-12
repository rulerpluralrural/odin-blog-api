import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import PostContent from "../components/PostPage/PostContent";

const Post = ({ user }) => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch(
					`${import.meta.env.SERVER_URL}/api/blog/posts/${id}`
				).then((res) => res.json());
				setPost(data.post);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		fetchData();
	}, [refreshKey]);

	// console.log(post);

	if (loading || post === null) {
		return (
			<div className="flex h-full flex-col justify-center items-center">
				<h1 className="font-bold font-serif text-xl">
					Fetching data please wait...
				</h1>
				<PuffLoader size={150} color="#36d6b0" />
			</div>
		);
	}

	if (post === undefined) {
		return (
			<div className="flex flex-col py-10 items-center text-center">
				<h1 className="text-3xl font-serif font-semibold mt-24">
					PAGE NOT FOUND
				</h1>
				<Link
					to="/"
					className="text-blue-600 hover-text-blue-700 focus:text-blue-700 hover:underline focus:underline"
				>
					{" "}
					Go back to home page...
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<PostContent
				post={post}
				user={user}
				id={id}
				setRefreshKey={setRefreshKey}
			/>
		</div>
	);
};

export default Post;
