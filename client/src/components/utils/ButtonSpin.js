import React from "react";

export default function ButtonSpin({ spinner, name }) {
	const className = spinner
		? "spinner-border spinner-border-sm mr-1"
		: "display-none";
	const buttonName = spinner ? "Loading...." : name;
	return (
		<button
			type="submit"
			className="btn btn-primary btn-block custom-btn"
			disabled={spinner}
		>
			<span className={className}></span>
			{buttonName}
		</button>
	);
}
