import React from "react";
import { Link } from "react-router-dom";

const LoggedIn = () => {
	return (
		<div className="py-10 text-center flex flex-col items-center h-full">
			<h1 className="font-serif text-4xl mt-20">You are already logged in!</h1>
			<Link
				to="/"
				className="p-3 text-blue-600 hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline"
			>
				Go back to home page...
			</Link>
		</div>
	);
};

export default LoggedIn;
