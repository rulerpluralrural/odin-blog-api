import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

const PasswordTwo = ({
	password2,
	showPassword2,
	revealPassword2,
	handleChange,
}) => {
	return (
		<div className="w-full relative">
			<input
				type={showPassword2 ? "text" : "password"}
				name="password2"
				id="password2"
				value={password2}
				placeholder="Confirm your password"
				className={formControl}
				onChange={handleChange}
				required
			/>
			{showPassword2 ? (
				<FaEye
					className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
					onClick={revealPassword2}
				></FaEye>
			) : (
				<FaEyeSlash
					className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
					onClick={revealPassword2}
				></FaEyeSlash>
			)}
		</div>
	);
};

export default PasswordTwo;
