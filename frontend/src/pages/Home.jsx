import { React, useEffect, useState } from "react";
import Posts from "../components/HomePage/Posts";
import HomeHeader from "../components/HomePage/HomeHeader";
import PuffLoader from "react-spinners/PuffLoader";
import PostsNav from "../components/HomePage/PostsNav";

export default function Home({ user }) {
	const [posts, setPosts] = useState(null);
	const [featuredPost, setFeaturedPost] = useState(null)
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch(`${import.meta.env.SERVER_URL}/api/blog/posts`).then(
					(res) => res.json()
				);
				setPosts(data.posts.filter((post) => post.published));
				setFeaturedPost(data.posts.find((post) => post.featured))
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// console.log(posts);

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
			<HomeHeader post={featuredPost} user={user} />
			<div className="px-52 flex flex-col gap-10 mt-20">
				<PostsNav posts={posts} setPosts={setPosts} />
				<div className="grid grid-cols-3 gap-20 pb-20">
					<Posts posts={posts} user={user} />
				</div>
			</div>
		</div>
	);
}
