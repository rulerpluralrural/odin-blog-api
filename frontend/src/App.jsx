import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="/localhost:8000/api/blog/login"
					element={<Login />}
				></Route>
				<Route
					path="/localhost:8000/api/blog/sign-up"
					element={<Register />}
				></Route>
			</Routes>
		</div>
	);
}
