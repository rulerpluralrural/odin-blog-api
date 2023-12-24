import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const response = await fetch("http://localhost:8000/api/blog/posts");
				setPosts( await response.json());
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		fetchData();
	}, []);
	console.log(posts);

	return <div>Home</div>;
}
