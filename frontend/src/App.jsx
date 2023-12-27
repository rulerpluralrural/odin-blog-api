import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function App() {
	const [message, setMessage] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			const response = await fetch(
				"http://localhost:8000/api/blog/auth/session",
				{
					credentials: "include",
				}
			).then((res) => res.json());
			setIsLoggedIn(response.isLoggedIn);
		};
		getSession();
	});

	return (
		<div className="flex flex-col h-screen">
			<Navbar isLoggedIn={isLoggedIn} setLoading={setLoading} />
			{loading ? (
				<div  className="flex flex-1 items-center justify-center">
					<PuffLoader size={150} />
				</div>
			) : (
				<Routes>
					<Route path="/" element={<Home isLoggedIn={isLoggedIn} />}></Route>
					<Route
						path="/blog/login"
						element={<Login setMessage={setMessage} />}
					></Route>
					<Route
						path="/blog/sign-up"
						element={<Register setMessage={setMessage} />}
					></Route>
				</Routes>
			)}
			{message && (
				<ToastContainer
					position="bottom-left"
					newestOnTop={true}
					closeOnClick={true}
					pauseOnHover={true}
					draggable={false}
					theme="colored"
				/>
			)}
		</div>
	);
}
