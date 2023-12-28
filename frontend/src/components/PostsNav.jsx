import React, { useState } from "react";

const PostNav = () => {
	const [activeButton, setActiveButton] = useState("All");
	const buttons = ["All", "Newest", "Oldest", "Most Commented"];
	return (
		<div className="flex w-full gap-5 border-b-2 border-slate-300">
			{buttons.map((button, index) => {
				return (
					<button
						type="button"
						key={index}
						value={button}
						className={`${
							activeButton === button
								? "text-black font-medium"
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
