import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand navbar-dark bg-primary justify-content-around">
			<div>
				<NavLink className="navbar-brand" to="/">
					Logo
				</NavLink>
			</div>

			<div className="navbar-nav">
				<NavLink className="nav-link" exact to="/">
					Home
				</NavLink>
				<NavLink className="nav-link" to="/dashboard">
					Dashboard
				</NavLink>
			</div>
			<div>
				<NavLink to="/sign-in" className="btn btn-sm btn-outline-light mr-2">
					Sign In
				</NavLink>
				<NavLink
					to="/sign-up" className="btn btn-sm btn-outline-light"
				>
					Sign Up
				</NavLink>
			</div>
		</nav>
	);
}
