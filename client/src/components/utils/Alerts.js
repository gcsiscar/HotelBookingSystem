import React from "react";

export default function Alerts(props) {
	const { message, setAlert, status, color } = props;
	const className = status
		? `alert alert-${color} alert-dismissible fade show mt-3`
		: "display-none";

	return (
		<div className={className}>
			{message}
			<button
				type="button"
				className="close"
				onClick={() =>
					setAlert({ status: false, message: "", color: "" })
				}
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
}
