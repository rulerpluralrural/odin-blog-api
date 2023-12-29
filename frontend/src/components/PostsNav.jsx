import React, { useEffect, useState } from "react";

const PostNav = ({ posts, setPosts }) => {
	const [activeButton, setActiveButton] = useState("All");
	const buttons = ["All", "Newest", "Oldest", "Most Commented", "Most Liked"];

	useEffect(() => {
		switch (activeButton) {
			case "All":
				setPosts([...posts.sort((postA, postB) => postA.title > postB.title)]);
				break;
			case "Newest":
				setPosts([
					...posts.sort(
						(postA, postB) =>
							new Date(postB.createdAt).getTime() -
							new Date(postA.createdAt).getTime()
					),
				]);
				break;
			case "Oldest":
				setPosts([
					...posts.sort(
						(postA, postB) =>
							new Date(postA.createdAt).getTime() -
							new Date(postB.createdAt).getTime()
					),
				]);
				break;
			case "Most Commented":
				setPosts([
					...posts.sort(
						(postA, postB) => postB.comments.length - postA.comments.length
					),
				]);
				break;
			case "Most Liked":
				setPosts([
					...posts.sort(
						(postA, postB) => postB.likes.length - postA.likes.length
					),
				]);
		}
		if (activeButton === "Newest") {
		}
	}, [activeButton]);

	return (
		<div className="flex w-full gap-7 border-b-2 border-slate-200">
			{buttons.map((button, index) => {
				return (
					<button
						type="button"
						key={index}
						value={button}
						className={`${
							activeButton === button
								? "text-black font-medium underline"
								: "text-slate-600"
						} font-sans text-xl tracking-tight py-2 `}
						onClick={() => setActiveButton(button)}
					>
						{button}
					</button>
				);
			})}
		</div>
	);
};

export default PostNav;
