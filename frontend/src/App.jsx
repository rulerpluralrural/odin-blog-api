import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function App() {
	const [message, setMessage] = useState(false);
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="/blog/login"
					element={<Login setMessage={setMessage} />}
				></Route>
				<Route path="/blog/sign-up" element={<Register />}></Route>
			</Routes>
			{message && (
				<ToastContainer
					position="bottom-left"
					autoClose="3000"
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
