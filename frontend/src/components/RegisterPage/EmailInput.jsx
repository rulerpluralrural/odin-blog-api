import React from "react";

const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

const EmailInput = ({ email, handleChange }) => {
	return (
		<div className="w-full">
			<input
				type="text"
				name="email"
				id="email"
				value={email}
				placeholder="Enter your email address"
				className={formControl}
				onChange={handleChange}
				required
			/>
		</div>
	);
};

export default EmailInput;
