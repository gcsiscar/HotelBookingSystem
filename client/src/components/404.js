import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
	return (
		<div className="d-flex align-items-center justify-content-center custom-center">
			<div className="text-center mb-5">
				<div className="error m-auto">404</div>
				<p className="lead text-gray-800 mb-5">Page Not Found</p>
				<p className="text-gray-500 mb-0">
					It looks like you found a glitch in the matrix...
				</p>
				<Link className="text-decoration-none" to="/">
					&larr; Back to Home
				</Link>
			</div>
		</div>
	);
}
