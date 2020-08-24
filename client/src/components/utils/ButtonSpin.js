import React from "react";

export default function ButtonSpin(props) {
	const { spinner, name } = props;
	return (
		<button
			type="submit"
			className="btn btn-primary btn-block custom-btn"
			disabled={spinner}
		>
			{spinner && (
				<span
					className="spinner-border spinner-border-sm mr-1"
					role="status"
				></span>
			)}
			{spinner ? "Loading..." : name}
		</button>
	);
}
