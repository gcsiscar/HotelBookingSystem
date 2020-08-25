import React from "react";
import { NavLink, Route, Switch, useParams } from "react-router-dom";

export default function Dashboard(props) {
	return (
		<div>
			<nav className="nav nav-tabs">
				<NavLink className="nav-link" aria-current="page" to="/test/Home">
					Active
				</NavLink>
				<NavLink className="nav-link" to="/test/AnotherHome">
					Link
				</NavLink>
				<NavLink className="nav-link" to="/test/AlsoHome">
					Link
				</NavLink>
			</nav>
			<Switch>
				<Route exact path="/test/:slug">
					<BlogPost />
				</Route>
			</Switch>
		</div>
	);
}

function BlogPost() {
	let { slug } = useParams();
	return <div>Now showing post {slug}</div>;
}
