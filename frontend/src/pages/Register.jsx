import { useState } from "react";
import { FaBlog, FaEye } from "react-icons/fa";

const formControl = "border-slate-400 border-[1px] rounded-sm w-full p-2";

export default function Login() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});
	const { username, email, password, password2 } = formData;
	const [showPassword, setShowPassword] = useState(false);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const revealPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div className="flex flex-col items-center gap-2 flex-1 font-serif">
			<div className=" flex center gap-2 text-4xl mt-28 mb-2">
				<FaBlog></FaBlog>
				<h1 className="font-bold">BLOG API</h1>
			</div>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-2 w-[500px] font-sans"
			>
				<div className="w-full text-center ">
					<h1 className="text-3xl font-bold text-slate-700 py-2 font-serif">
						Register an account
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
						onChange={onChange}
					/>
				</div>
				<div className="w-full">
					<input
						type="text"
						name="email"
						id="email"
						value={email}
						placeholder="Enter your email address"
						className={formControl}
						onChange={onChange}
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
						onChange={onChange}
					/>
					<FaEye
						className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
						onClick={revealPassword}
					></FaEye>
				</div>
				<div className="w-full relative">
					<input
						type={showPassword ? "text" : "password"}
						name="password2"
						id="password2"
						value={password2}
						placeholder="Confirm your password"
						className={formControl}
						onChange={onChange}
					/>
					<FaEye
						className="absolute top-3 right-3 cursor-pointer text-slate-700 text-xl  transition-opacity hover:opacity-90"
						onClick={revealPassword}
					></FaEye>
				</div>
				<button
					type="submit"
					onClick={onSubmit}
					className="border-[1px] bg-slate-950 text-slate-200 p-2 font-bold text-xl transition-colors hover:bg-slate-900 text-center"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
