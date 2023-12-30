import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import PuffLoader from "react-spinners/PuffLoader";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({setMessage, setUser}) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const { username, password } = formData;
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await fetch("http://localhost:8000/api/blog/login", {
				method: "POST",
				body: JSON.stringify(formData),
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => {
				return res.json();
			});
			setLoading(false);
			setMessage(true);

			if (data.token) {
				setUser(data.user)
				navigate("/blog");
				toast.success("Successfully logged in!");
			} else {
				toast.error(data.message);
			}

			setTimeout(() => {
				setMessage(false);
			}, 8000);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const revealPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div className="flex flex-col items-center gap-2 flex-1 font-serif">
			<div className=" flex gap-2 text-4xl mt-28 mb-2">
				<FaBlog></FaBlog>
				<h1 className="font-bold">BLOG API</h1>
			</div>
			{loading ? (
				<PuffLoader />
			) : (
				<LoginForm
					username={username}
					password={password}
					showPassword={showPassword}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					revealPassword={revealPassword}
				></LoginForm>
			)}
		</div>
	);
}
