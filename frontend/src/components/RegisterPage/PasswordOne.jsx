import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

const PasswordOne = ({
	password,
	showPassword1,
	revealPassword1,
	handleChange,
}) => {
	return (
		<div className="w-full relative">
			<input
				type={showPassword1 ? "text" : "password"}
				name="password"
				id="password"
				value={password}
				placeholder="Enter your password"
				className={formControl}
				onChange={handleChange}
				required
			/>
			{showPassword1 ? (
				<FaEye
					className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
					onClick={revealPassword1}
				></FaEye>
			) : (
				<FaEyeSlash
					className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
					onClick={revealPassword1}
				></FaEyeSlash>
			)}
		</div>
	);
};

export default PasswordOne;
