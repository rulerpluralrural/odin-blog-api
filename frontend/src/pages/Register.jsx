import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import RegisterForm from "../components/RegisterForm";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setMessage }) {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
	});
	const { username, email, password, password2 } = formData;
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
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
			const data = await fetch("http://localhost:8000/api/blog/sign-up", {
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
				navigate("/");
				toast.success("Successfully registered!");
			} else {
				if (data.messages) {
					data.messages.forEach((message) => {
						toast.error(message.msg);
					});
				} else {
					toast.error(data.message);
				}
			}
			// console.log(data);
			setTimeout(() => {
				setMessage(false);
			}, 5000);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const revealPassword1 = () => {
		setShowPassword1((prevState) => !prevState);
	};

	const revealPassword2 = () => {
		setShowPassword2((prevState) => !prevState);
	};

	return (
		<div className="flex flex-col items-center gap-2 flex-1 font-serif">
			<div className=" flex center gap-2 text-4xl mt-28 mb-2">
				<FaBlog></FaBlog>
				<h1 className="font-bold">BLOG API</h1>
			</div>
			{loading ? (
				<PuffLoader />
			) : (
				<RegisterForm
					username={username}
					email={email}
					password={password}
					password2={password2}
					showPassword1={showPassword1}
					showPassword2={showPassword2}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					revealPassword1={revealPassword1}
					revealPassword2={revealPassword2}
				/>
			)}
		</div>
	);
}
