import { useEffect, useState } from "react";

export default function Home({ isLoggedIn }) {
	const [posts, setPosts] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch("http://localhost:8000/api/blog/posts", {
					credentials: "include",
				});
				setPosts(await response.json());
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return isLoggedIn && <div>Home</div>;
}
