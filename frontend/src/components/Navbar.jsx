import { FaBlog, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className=" flex justify-between items-center bg-slate-950 text-slate-200 font-serif">
			<div className=" flex justify-between gap-2 px-10 py-8 text-2xl">
				<FaBlog></FaBlog>
				<Link to="/" className=" font-bold">BLOG API</Link>
			</div>
			<nav className="px-10 py-8">
				<ul className="flex justify-between items-center gap-10 font-bold text-xl">
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
				</ul>
			</nav>
		</div>
	);
}
