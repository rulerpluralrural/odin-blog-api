import { FaBlog, FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ isLoggedIn, setLoading }) {
	const navigate = useNavigate();
	const logOut = async () => {
		setLoading(true);
		await fetch("http://localhost:8000/api/blog/logout", {
			method: "POST",
			credentials: "include",
		});
			setLoading(false);
			toast.success("You have logged out!");
			navigate("/");
	};

	return (
		<div className=" flex justify-between items-center bg-slate-100 text-slate-950 font-serif">
			<div className=" flex justify-between gap-2 px-10 py-8 text-2xl">
				<FaBlog></FaBlog>
				<Link to="/" className=" font-bold">
					BLOG API
				</Link>
			</div>
			<nav className="px-10 py-8">
				<ul className="flex justify-between items-center gap-10 font-bold text-xl">
					{isLoggedIn ? (
						<li>
							<button className="flex items-center gap-2" onClick={logOut}>
								<FaSignOutAlt></FaSignOutAlt>Logout
							</button>
						</li>
					) : (
						<>
							<li>
								<Link to="/blog/login" className="flex items-center gap-2">
									<FaSignInAlt></FaSignInAlt>LOGIN
								</Link>
							</li>
							<li>
								<Link to="/blog/sign-up" className="flex items-center gap-2">
									<FaUserAlt></FaUserAlt>REGISTER
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
}
