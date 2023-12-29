import { React, useEffect, useState } from "react";
import Posts from "../components/Posts";
import PostHeader from "../components/PostHeader";
import PuffLoader from "react-spinners/PuffLoader";
import PostsNav from "../components/PostsNav";

export default function Home({ user }) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch("http://localhost:8000/api/blog/posts").then(
					(res) => res.json()
				);
				setPosts(data.posts.filter((post) => post.published));
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	
	console.log(posts);

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
			<PostHeader post={posts[0]} user={user} />
			<div className="px-52 flex flex-col gap-10 mt-20">
				<PostsNav posts={posts} setPosts={setPosts} />
				<div className="grid grid-cols-3 gap-20 pb-20">
					<Posts posts={posts} user={user} />
				</div>
			</div>
		</div>
	);
}
