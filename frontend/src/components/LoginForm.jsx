import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

const LoginForm = ({username, password, showPassword, handleForm, handleChange, revealPassword}) => {
	return (
		<form
			onSubmit={handleForm}
			className="flex flex-col gap-2 w-[500px] font-sans"
		>
			<div className="w-full text-center ">
				<h1 className="text-3xl font-bold text-slate-700 py-2 font-serif">
					Login your account
				</h1>
			</div>
			<div className="w-full">
				<input
					type="text"
					name="username"
					id="username"
					value={username}
					placeholder="Enter your username"
					className={formControl}
					onChange={handleChange}
				/>
			</div>
			<div className="w-full relative">
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					id="password"
					value={password}
					placeholder="Enter your password"
					className={formControl}
					onChange={handleChange}
				/>
				{showPassword ? (
					<FaEye
						className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
						onClick={revealPassword}
					></FaEye>
				) : (
					<FaEyeSlash
						className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
						onClick={revealPassword}
					></FaEyeSlash>
				)}
			</div>
			<button
				type="submit"
				className="border-[1px] bg-slate-950 text-slate-200 p-2 font-bold text-xl transition-colors hover:bg-slate-900 text-center"
			>
				Submit
			</button>
		</form>
	);
};

export default LoginForm;
