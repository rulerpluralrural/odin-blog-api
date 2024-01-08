import React from "react";
import PasswordTwo from "./PasswordTwo";
import PasswordOne from "./PasswordOne";
import EmailInput from "./EmailInput";
import UsernameInput from "./UsernameInput"

const RegisterForm = ({
	username,
	email,
	password,
	password2,
	handleChange,
	handleSubmit,
	showPassword1,
	showPassword2,
	revealPassword1,
	revealPassword2,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 w-[500px] font-sans"
		>
			<div className="w-full text-center ">
				<h1 className="text-3xl font-bold text-slate-700 py-2 font-serif">
					Register an account
				</h1>
			</div>
			<UsernameInput username={username} handleChange={handleChange} />
			<EmailInput email={email} handleChange={handleChange} />
			<PasswordOne
				password={password}
				showPassword1={showPassword1}
				revealPassword1={revealPassword1}
				handleChange={handleChange}
			/>
			<PasswordTwo
				password2={password2}
				showPassword2={showPassword2}
				revealPassword2={revealPassword2}
				handleChange={handleChange}
			/>
			<button
				type="submit"
				className="border-[1px] bg-slate-950 text-slate-200 p-2 font-bold text-xl transition-colors hover:bg-slate-900 text-center"
			>
				Submit
			</button>
		</form>
	);
};

export default RegisterForm;
