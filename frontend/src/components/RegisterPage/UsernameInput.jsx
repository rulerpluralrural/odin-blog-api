import React from "react";

const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

const UsernameInput = ({ username, handleChange }) => {
	return (
		<div className="w-full">
			<input
				type="text"
				name="username"
				id="username"
				value={username}
				placeholder="Enter your username"
				className={formControl}
				onChange={handleChange}
				required
			/>
		</div>
	);
};

export default UsernameInput;
