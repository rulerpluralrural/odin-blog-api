import {
	FaBlog,
	FaSignInAlt,
	FaUserAlt,
	FaSignOutAlt,
	FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ user, setLoading, setUser }) {
	const navigate = useNavigate();
	const logOut = async () => {
		setLoading(true);
		await fetch("http://localhost:8000/api/blog/logout", {
			method: "POST",
			credentials: "include",
		});
		setLoading(false);
		setUser(null);
		toast.success("You have logged out!");
		navigate("/");
	};

	return (
		<div className=" flex justify-between items-center bg-slate-100 text-slate-950 font-serif">
			<div className=" flex justify-between gap-2 px-10 py-8 text-2xl">
				<FaBlog></FaBlog>
				<Link to="/blog" className=" font-bold">
					BLOG API
				</Link>
			</div>
			<NavLinks user={user} logOut={logOut} />
		</div>
	);
}

const NavLinks = ({ user, logOut }) => {
	return (
		<nav className="px-10 py-8">
			<div className="flex justify-between items-center gap-10 font-bold text-xl">
				{user ? (
					<>
						<button
							type="button"
							className="flex items-center gap-2"
							onClick={logOut}
						>
							<FaSignOutAlt></FaSignOutAlt>Logout
						</button>
						<Link
							to={`/author/${user.id}`}
							className="flex items-center gap-2"
						>
							<FaUserCircle></FaUserCircle>
							{user.username}
						</Link>
					</>
				) : (
					<>
						<div>
							<Link to="/blog/login" className="flex items-center gap-2">
								<FaSignInAlt></FaSignInAlt>LOGIN
							</Link>
						</div>
						<div>
							<Link to="/blog/sign-up" className="flex items-center gap-2">
								<FaUserAlt></FaUserAlt>REGISTER
							</Link>
						</div>
					</>
				)}
			</div>
		</nav>
	);
};
