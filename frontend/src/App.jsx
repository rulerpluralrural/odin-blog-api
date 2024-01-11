import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function App() {
	const [user, setUser] = useState(null);
	const [loadingSession, setLoadingSession] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			setLoadingSession(true);
			try {
				const response = await fetch(
					"http://localhost:8000/api/blog/auth/session",
					{
						credentials: "include",
					}
				).then((res) => res.json());
				setUser(response.user);
				setLoadingSession(false);
			} catch (error) {
				console.log(error)
				setLoadingSession(false)
			}
		};
		getSession();
	}, []);

	// console.log(user)

	return (
		<div className="flex flex-col h-screen">
			<Navbar
				user={user}
				setLoadingSession={setLoadingSession}
				setUser={setUser}
				loadingSession={loadingSession}
			/>
			{loadingSession ? (
				<div className="flex flex-1 items-center justify-center">
					<PuffLoader size={150} color="#36d6b0" />
				</div>
			) : (
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/blog" replace={true} />}
					></Route>
					<Route path="/blog" element={<Home user={user} />}></Route>
					<Route path="/blog/posts/:id" element={<Post user={user} />}></Route>
					<Route
						path="/blog/login"
						element={<Login setUser={setUser} user={user} />}
					></Route>
					<Route path="/blog/sign-up" element={<Register />}></Route>
				</Routes>
			)}
			<ToastContainer
				position="bottom-left"
				newestOnTop={true}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={false}
				theme="colored"
			/>
		</div>
	);
}
