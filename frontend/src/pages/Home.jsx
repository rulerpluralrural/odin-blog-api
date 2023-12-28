import { React, useEffect, useState } from "react";
import Posts from "../components/Posts";
import Post from "../components/PostHeader";
import PuffLoader from "react-spinners/PuffLoader";
import PostsFilter from "../components/PostsNav";

export default function Home({ isLoggedIn }) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch("http://localhost:8000/api/blog/posts").then(
					(res) => res.json()
				);
				setPosts(data.posts);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading || posts === null) {
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
		<div className="flex flex-col h-full">
			<Post post={posts[0]} isLoggedIn={isLoggedIn} />
			<div className="px-52 flex flex-col gap-10 mt-20">
				<PostsFilter />
				<div className="grid grid-cols-3">
					<Posts posts={posts} isLoggedIn={isLoggedIn} />
				</div>
			</div>
		</div>
	);
}
