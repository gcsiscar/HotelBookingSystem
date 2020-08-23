import React from "react";

export default function Alerts(props) {
	const { message, setAlert, status, color } = props;
	const className = `alert alert-${color} alert-dismissible fade show mt-3`;

	if (status) {
		return (
			<div className={className}>
				{message}
				<button
					type="button"
					className="close"
					onClick={() =>
						setAlert({ status: null, message: "", color: "" })
					}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);
	} else {
		return null;
	}
}
